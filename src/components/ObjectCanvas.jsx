import { useEffect, useRef } from 'react'

// Lazy-loaded three.js canvas that fills its container. See lib/objectScene.js.
export default function ObjectCanvas({ shape = 'star', active = 0, className = 'relative' }) {
  const canvas = useRef(null)
  const api = useRef(null)

  useEffect(() => {
    let cancelled = false
    import('../lib/objectScene').then(({ createObjectScene }) => {
      if (cancelled || !canvas.current) return
      api.current = createObjectScene(canvas.current, { shape, active })
    })
    return () => {
      cancelled = true
      api.current?.dispose()
      api.current = null
    }
    // `active` is pushed imperatively below so the scene is never rebuilt for it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shape])

  useEffect(() => { api.current?.setActive?.(active) }, [active])

  return (
    <div className={className} aria-hidden="true">
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
