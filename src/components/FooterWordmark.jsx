import { useEffect, useRef } from 'react'
import { brand } from '../data/site'

// Footer background: the company name sits almost invisible in the dark and a soft
// "torch" following the cursor reveals it — as in the reference video the client sent.
// On touch devices (no pointer) the torch sweeps slowly on its own so it still reads.
export default function FooterWordmark() {
  const host = useRef(null)
  const lit = useRef(null)
  const glow = useRef(null)

  useEffect(() => {
    const el = host.current
    if (!el) return
    const footer = el.closest('footer') ?? el
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches

    // torch position (px, relative to the wordmark box) + intensity 0–1
    let tx = el.clientWidth / 2
    let ty = el.clientHeight / 2
    let x = tx
    let y = ty
    let usingPointer = false
    let target = reduce || !finePointer ? 1 : 0
    let amount = target
    let raf = 0

    const write = () => {
      el.style.setProperty('--tx', `${x}px`)
      el.style.setProperty('--ty', `${y}px`)
      if (lit.current) lit.current.style.opacity = amount
      if (glow.current) glow.current.style.opacity = amount * 0.9
    }

    if (reduce) {
      // no animation: light the middle of the word and stop
      write()
      return
    }

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      tx = e.clientX - r.left
      ty = e.clientY - r.top
      usingPointer = true // a real pointer took over from the auto sweep
      target = 1
    }
    const onLeave = () => { if (usingPointer) target = 0 }

    // attached regardless of the media query: some desktops report a coarse pointer
    footer.addEventListener('pointermove', onMove)
    footer.addEventListener('pointerleave', onLeave)

    const start = performance.now()
    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      if (!usingPointer) {
        // slow automatic sweep across the word on touch devices
        const t = (now - start) / 1000
        tx = el.clientWidth * (0.5 + 0.42 * Math.sin(t * 0.35))
        ty = el.clientHeight * 0.55
      }
      x += (tx - x) * 0.12 // trailing torch
      y += (ty - y) * 0.12
      amount += (target - amount) * 0.08
      write()
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      footer.removeEventListener('pointermove', onMove)
      footer.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={host} aria-hidden="true" className="torch pointer-events-none relative mb-10 mt-4 h-[21vw] min-h-[128px] select-none overflow-hidden md:mb-14">
      {/* barely-there letters in the dark */}
      <span className="footer-wordmark footer-wordmark--dim">{brand.name}</span>
      {/* the same letters, revealed only inside the torch beam */}
      <span ref={lit} className="footer-wordmark footer-wordmark--lit">{brand.name}</span>
      {/* warm spill of light around the beam */}
      <span ref={glow} className="torch-glow" />
    </div>
  )
}
