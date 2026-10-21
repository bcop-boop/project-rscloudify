import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

// Shared renderer setup, chrome materials and procedural shapes for every 3D canvas on the site.

export const SHAPES = ['knot', 'star', 'cubes', 'blob', 'ring', 'gem', 'twist', 'capsule', 'octa']

export function createRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.outputColorSpace = THREE.SRGBColorSpace
  return renderer
}

function starGeometry(points = 8, outer = 1.4, inner = 0.62) {
  const shape = new THREE.Shape()
  for (let i = 0; i <= points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner
    const a = (i / (points * 2)) * Math.PI * 2
    i === 0 ? shape.moveTo(Math.cos(a) * r, Math.sin(a) * r) : shape.lineTo(Math.cos(a) * r, Math.sin(a) * r)
  }
  const g = new THREE.ExtrudeGeometry(shape, { depth: 0.35, bevelEnabled: true, bevelThickness: 0.3, bevelSize: 0.22, bevelSegments: 10, curveSegments: 4 })
  g.center()
  return g
}

function blobGeometry() {
  let g = new THREE.IcosahedronGeometry(1.25, 24)
  g.deleteAttribute('normal')
  g.deleteAttribute('uv')
  g = mergeVertices(g)
  const pos = g.attributes.position
  const v = new THREE.Vector3()
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i)
    const n = v.clone().normalize()
    v.addScaledVector(n, 0.22 * Math.sin(n.x * 4 + 1) * Math.sin(n.y * 5) * Math.sin(n.z * 3 + 2))
    pos.setXYZ(i, v.x, v.y, v.z)
  }
  g.computeVertexNormals()
  return g
}

// Adds environment reflections + brand-colored key lights to a scene and returns a shape builder.
export function createChromeKit(renderer, scene) {
  const pmrem = new THREE.PMREMGenerator(renderer)
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = envTexture

  const accent = new THREE.DirectionalLight(0xffc21a, 2.4)
  accent.position.set(-6, 5, 6)
  const glow = new THREE.DirectionalLight(0xff8a1e, 2.6)
  glow.position.set(7, -4, 4)
  scene.add(accent, glow, new THREE.AmbientLight(0xffffff, 0.2))

  const chrome = new THREE.MeshPhysicalMaterial({ color: 0xe4e6ea, metalness: 1, roughness: 0.14, clearcoat: 1, clearcoatRoughness: 0.08, envMapIntensity: 1.25 })
  const chromeFlat = chrome.clone()
  chromeFlat.flatShading = true

  const build = (type) => {
    switch (type) {
      case 'knot': return new THREE.Mesh(new THREE.TorusKnotGeometry(0.95, 0.34, 220, 32), chrome)
      case 'twist': return new THREE.Mesh(new THREE.TorusKnotGeometry(0.9, 0.24, 260, 24, 3, 4), chrome)
      case 'ring': return new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.42, 48, 120), chrome)
      case 'gem': return new THREE.Mesh(new THREE.IcosahedronGeometry(1.4, 0), chromeFlat)
      case 'octa': return new THREE.Mesh(new THREE.OctahedronGeometry(1.45, 0), chromeFlat)
      case 'capsule': return new THREE.Mesh(new THREE.CapsuleGeometry(0.55, 1.5, 12, 32), chrome)
      case 'star': return new THREE.Mesh(starGeometry(), chrome)
      case 'blob': return new THREE.Mesh(blobGeometry(), chrome)
      case 'cubes': {
        const group = new THREE.Group()
        const geo = new RoundedBoxGeometry(0.72, 0.72, 0.72, 4, 0.08)
        const offsets = [[0, 0, 0], [0.78, 0, 0], [0, 0.78, 0], [0, 0, 0.78], [-0.78, 0, 0], [0.78, 0.78, 0], [0, -0.78, 0.78], [-0.78, 0.78, 0.78]]
        offsets.forEach(([x, y, z]) => {
          const m = new THREE.Mesh(geo, chrome)
          m.position.set(x, y, z)
          group.add(m)
        })
        return group
      }
      default: return new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 0), chromeFlat)
    }
  }

  return {
    build,
    dispose() {
      chrome.dispose()
      chromeFlat.dispose()
      envTexture.dispose()
      pmrem.dispose()
    },
  }
}

// Wire objects built from solid tubes rather than 1px lines (GPUs ignore
// LineBasicMaterial.linewidth). Two variants:
//   'cube'   — cube frame + glowing corner nodes + two counter-rotating accent rings
//   'sphere' — geodesic network sphere with glowing nodes
export function buildWireObject(variant = 'cube') {
  const group = new THREE.Group()
  // unlit: these scenes carry no lights, so flat colours keep the frame crisp
  const edgeMat = new THREE.MeshBasicMaterial({ color: 0x9aa3ad, transparent: true, opacity: 0.85 })
  const accentMat = new THREE.MeshBasicMaterial({ color: 0xffc21a })
  const nodeGeo = new THREE.SphereGeometry(0.062, 16, 16)

  const tube = (a, b, radius, material) => {
    const dir = new THREE.Vector3().subVectors(b, a)
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, dir.length(), 10), material)
    mesh.position.copy(a).add(b).multiplyScalar(0.5)
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize())
    return mesh
  }

  if (variant === 'sphere') {
    const geo = new THREE.IcosahedronGeometry(1.5, 1)
    const edges = new THREE.EdgesGeometry(geo, 1)
    const pos = edges.attributes.position
    const frame = new THREE.Group()
    for (let i = 0; i < pos.count; i += 2) {
      frame.add(tube(
        new THREE.Vector3().fromBufferAttribute(pos, i),
        new THREE.Vector3().fromBufferAttribute(pos, i + 1),
        0.012, edgeMat,
      ))
    }
    const nodes = new THREE.Group()
    const seen = new Set()
    const vpos = geo.attributes.position
    for (let i = 0; i < vpos.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(vpos, i)
      const key = `${v.x.toFixed(2)}|${v.y.toFixed(2)}|${v.z.toFixed(2)}`
      if (seen.has(key)) continue
      seen.add(key)
      const n = new THREE.Mesh(nodeGeo, accentMat)
      n.position.copy(v)
      nodes.add(n)
    }
    group.add(frame, nodes)
    group.userData.nodes = nodes
    group.userData.materials = { edgeMat, accentMat }
    return group
  }

  // The original dense-wireframe cube the client asked to keep: a rounded box
  // drawn as a full triangulated wireframe, glowing vertex points, and a
  // wireframe ring turning inside it.
  let base = new RoundedBoxGeometry(2.6, 2.6, 2.6, 3, 0.5)
  const lines = new THREE.LineSegments(
    new THREE.WireframeGeometry(base),
    new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 }),
  )
  base.deleteAttribute('normal')
  base.deleteAttribute('uv')
  base = mergeVertices(base)
  const points = new THREE.Points(base, new THREE.PointsMaterial({ color: 0xffffff, size: 0.05, transparent: true, opacity: 0.8 }))
  const inner = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.TorusGeometry(0.85, 0.3, 10, 32)),
    new THREE.LineBasicMaterial({ color: 0xffc21a, transparent: true, opacity: 0.55 }),
  )

  group.add(lines, points, inner)
  group.userData.inner = inner
  group.userData.materials = { edgeMat, accentMat, lineMat: lines.material, pointMat: points.material, innerMat: inner.material }
  group.userData.setActive = (index) => { group.userData.activeIndex = index }
  return group
}

// Six stacked plates — one per process stage. The active plate lifts out and lights
// up in the accent colour, so the object tracks the step you are reading.
export function buildStackObject(count = 6) {
  const group = new THREE.Group()
  const geo = new RoundedBoxGeometry(2.4, 0.2, 2.4, 4, 0.07)
  const base = new THREE.MeshPhysicalMaterial({ color: 0xc9ced6, metalness: 1, roughness: 0.2, clearcoat: 1, envMapIntensity: 1.1 })
  const activeMat = new THREE.MeshPhysicalMaterial({ color: 0xffc21a, metalness: 0.75, roughness: 0.22, clearcoat: 1, emissive: 0xffc21a, emissiveIntensity: 0.35 })

  const plates = []
  for (let i = 0; i < count; i++) {
    const m = new THREE.Mesh(geo, base)
    m.position.y = (count / 2 - 0.5 - i) * 0.46
    m.userData.baseY = m.position.y
    group.add(m)
    plates.push(m)
  }

  group.userData.plates = plates
  group.userData.materials = { base, activeMat }
  group.userData.setActive = (index) => {
    plates.forEach((m, i) => {
      m.material = i === index ? activeMat : base
      m.userData.targetX = i === index ? 0.34 : 0
      m.userData.targetScale = i === index ? 1.06 : 1
    })
  }
  group.userData.setActive(0)
  return group
}

export function disposeTree(obj) {
  obj.traverse((c) => {
    c.geometry?.dispose()
    // shared chrome materials belong to the kit, which disposes them itself
    if (c.material && c.material.type !== 'MeshPhysicalMaterial') c.material.dispose()
  })
  const mats = obj.userData?.materials
  if (mats) Object.values(mats).forEach((m) => m.dispose())
}

export { THREE }
