import { THREE, createRenderer, createChromeKit, buildWireObject, buildStackObject, disposeTree } from './chrome'

// A single 3D object inside a section. Its rotation is tied to how far the
// section has scrolled through the viewport, plus a slow idle spin and mouse tilt.
export function createObjectScene(canvas, { shape = 'star', active = 0 } = {}) {
  const renderer = createRenderer(canvas)
  const scene = new THREE.Scene()
  const isStack = shape === 'stack'
  const isWire = shape === 'wirecube' || shape === 'wiresphere'
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
  camera.position.z = isWire ? 8.6 : isStack ? 11 : 8

  const kit = isWire ? null : createChromeKit(renderer, scene)
  const object = isWire
    ? buildWireObject(shape === 'wiresphere' ? 'sphere' : 'cube')
    : isStack ? buildStackObject() : kit.build(shape)
  object.userData.setActive?.(active)
  scene.add(object)

  const host = canvas.parentElement
  const resize = () => {
    const { width, height } = host.getBoundingClientRect()
    if (!width || !height) return
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(host)
  resize()

  let visible = false
  const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
  io.observe(host)

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
  const onMouse = (e) => {
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1
    mouse.ty = (e.clientY / window.innerHeight) * 2 - 1
  }
  window.addEventListener('mousemove', onMouse)

  const clock = new THREE.Clock()
  let progress = 0
  let spin = 0
  let raf = 0

  const tick = () => {
    raf = requestAnimationFrame(tick)
    const dt = Math.min(clock.getDelta(), 0.05)
    if (!visible || document.hidden) return

    const rect = host.getBoundingClientRect()
    const vh = window.innerHeight
    const target = THREE.MathUtils.clamp((vh - rect.top) / (vh + rect.height), 0, 1)
    progress += (target - progress) * 0.08
    mouse.x += (mouse.tx - mouse.x) * 0.05
    mouse.y += (mouse.ty - mouse.y) * 0.05

    const t = clock.elapsedTime
    const idle = t * 0.12
    // the active step nudges the cube a further eighth-turn
    const step = (object.userData.activeIndex ?? 0) * (Math.PI / 4)
    spin += ((isWire ? step : 0) - spin) * 0.05
    object.rotation.y = progress * Math.PI * 2.2 + idle + spin + mouse.x * 0.3
    object.rotation.x = progress * Math.PI * (isWire ? 0.55 : isStack ? 0.12 : 0.3) + mouse.y * 0.2 + (isStack ? 0.32 : 0)

    // the ring inside the cube turns on its own axis
    if (object.userData.inner) {
      object.userData.inner.rotation.x += dt * 0.7
      object.userData.inner.rotation.z += dt * 0.3
    }
    object.userData.rings?.forEach((r, i) => {
      r.rotation.x += dt * (i ? -0.5 : 0.8)
      r.rotation.z += dt * (i ? 0.35 : -0.25)
    })
    if (object.userData.nodes) {
      const pulse = 1 + Math.sin(t * 2.2) * 0.22
      object.userData.nodes.scale.setScalar(pulse)
    }

    // stacked plates ease toward their active/inactive offsets
    if (isStack) {
      object.userData.plates.forEach((m) => {
        m.position.x += ((m.userData.targetX ?? 0) - m.position.x) * 0.08
        const target = m.userData.targetScale ?? 1
        const sc = m.scale.x + (target - m.scale.x) * 0.08
        m.scale.setScalar(sc)
      })
    }
    renderer.render(scene, camera)
  }
  tick()

  return {
    setActive(i) { object.userData.setActive?.(i) },
    dispose() {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('mousemove', onMouse)
      disposeTree(object)
      kit?.dispose()
      renderer.dispose()
    },
  }
}
