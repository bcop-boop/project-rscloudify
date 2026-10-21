import { THREE, SHAPES, createRenderer, createChromeKit, disposeTree } from './chrome'

// Chrome "landmarks" anchored to fixed points on the page (document coordinates),
// alternating left/right edges roughly every viewport of scroll. They don't follow the
// screen: you scroll past them like objects along a pathway, and each one simply
// rotates in place. A new set morphs in on every route change.

const SPACING = 1.8 // viewports between landmarks — roughly one every other screen
const FIRST = 1.05 // start below the hero headline so it never overlaps the h1
const MAX_LANDMARKS = 16 // enough for very long pages; off-screen ones are hidden

function hashString(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619)
  return h >>> 0
}

export function createScene(canvas) {
  const renderer = createRenderer(canvas)
  const scene = new THREE.Scene()
  const kit = createChromeKit(renderer, scene)
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
  camera.position.z = 20

  // one prototype per shape; landmarks are cheap clones that share geometry + material
  const prototypes = new Map()
  const cloneOf = (type) => {
    if (!prototypes.has(type)) prototypes.set(type, kit.build(type))
    return prototypes.get(type).clone()
  }

  let landmarks = []
  let scrollY = window.scrollY
  let lastScroll = scrollY
  let view = {}

  const resize = () => {
    const w = window.innerWidth
    const h = window.innerHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    const visH = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
    view = { h, visH, visW: visH * camera.aspect, unit: visH / h, scale: THREE.MathUtils.clamp(w / 1600, 0.55, 1) }
  }

  const setLayout = (key) => {
    landmarks.forEach((l) => { l.target = 0; l.dying = true })
    const seed = hashString(key)
    const delay = landmarks.length ? 0.9 : 0
    for (let k = 0; k < MAX_LANDMARKS; k++) {
      const mesh = cloneOf(SHAPES[(seed + k * 4) % SHAPES.length])
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
      mesh.scale.setScalar(0.001)
      mesh.visible = false
      scene.add(mesh)
      landmarks.push({
        mesh,
        side: k % 2 === 0 ? -1 : 1,
        anchor: FIRST + k * SPACING, // position on the page, in viewport heights
        size: 0.85 + ((seed >> (k % 16)) % 4) * 0.1,
        dir: k % 3 === 0 ? -1 : 1,
        target: 1,
        scale: 0,
        delay: delay + Math.min(k, 2) * 0.15,
        dying: false,
      })
    }
  }

  const onScroll = () => { scrollY = window.scrollY }
  window.addEventListener('resize', resize)
  window.addEventListener('scroll', onScroll, { passive: true })
  resize()

  const clock = new THREE.Clock()
  let raf = 0

  const tick = () => {
    raf = requestAnimationFrame(tick)
    if (document.hidden) return
    const dt = Math.min(clock.getDelta(), 0.05)
    const scrollDelta = THREE.MathUtils.clamp(scrollY - lastScroll, -120, 120)
    lastScroll = scrollY
    const pageHeight = document.documentElement.scrollHeight

    landmarks = landmarks.filter((l) => {
      if (l.delay > 0) { l.delay -= dt; return true }
      l.scale += (l.target - l.scale) * (l.dying ? 0.12 : 0.06)
      if (l.dying && l.scale < 0.01) { scene.remove(l.mesh); return false }

      // fixed point on the page → screen position = page position − scroll
      const pageY = l.anchor * view.h
      const screenY = pageY - scrollY
      const onScreen = pageY < pageHeight - view.h * 0.25 && screenY > -view.h * 0.4 && screenY < view.h * 1.4
      l.mesh.visible = onScreen
      if (!onScreen) return true

      l.mesh.position.x = l.side * (view.visW / 2 - 0.35 * view.scale)
      l.mesh.position.y = view.visH / 2 - screenY * view.unit
      // rotate in place: steady spin, a little extra while scrolling
      l.mesh.rotation.y += (dt * 0.4 + scrollDelta * 0.004) * l.dir
      l.mesh.rotation.x += dt * 0.15
      l.mesh.scale.setScalar(Math.max(l.scale, 0.001) * l.size * view.scale)
      return true
    })

    renderer.render(scene, camera)
  }
  tick()

  return {
    setLayout,
    dispose() {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      landmarks.forEach((l) => scene.remove(l.mesh))
      prototypes.forEach(disposeTree)
      kit.dispose()
      renderer.dispose()
    },
  }
}
