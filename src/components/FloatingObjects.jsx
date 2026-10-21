import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// Fixed transparent WebGL layer with chrome objects drifting along the page edges.
// three.js is loaded lazily so it never blocks the first paint.
export default function FloatingObjects() {
  const canvas = useRef(null)
  const api = useRef(null)
  const { pathname } = useLocation()
  const path = useRef(pathname)
  path.current = pathname

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(min-width: 768px)').matches) return
    let cancelled = false
    import('../lib/floatingScene').then(({ createScene }) => {
      if (cancelled || !canvas.current) return
      api.current = createScene(canvas.current)
      api.current.setLayout(path.current)
    })
    return () => {
      cancelled = true
      api.current?.dispose()
      api.current = null
    }
  }, [])

  useEffect(() => { api.current?.setLayout(pathname) }, [pathname])

  return <canvas ref={canvas} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[6] hidden h-full w-full md:block" />
}
