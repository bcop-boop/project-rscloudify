import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

// Soft follower ring. Elements can set data-cursor="view" and data-cursor-label="View"
// to morph it into a labelled bubble.
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState('default')
  const [label, setLabel] = useState('')
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 350, damping: 32, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 350, damping: 32, mass: 0.5 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    const over = (e) => {
      const target = e.target.closest?.('[data-cursor]')
      if (target) {
        setMode(target.dataset.cursor)
        setLabel(target.dataset.cursorLabel || '')
      } else if (e.target.closest?.('a, button, input, textarea, [role="button"]')) {
        setMode('link'); setLabel('')
      } else {
        setMode('default'); setLabel('')
      }
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [x, y])

  if (!enabled) return null
  const size = mode === 'view' ? 96 : mode === 'link' ? 56 : 28

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[130] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${
          mode === 'view' ? 'bg-accent text-ink' : 'border border-white/40 mix-blend-difference'
        } ${mode === 'link' ? 'bg-white/90' : ''}`}
        animate={{ width: size, height: size }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              className="text-[13px] font-semibold"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
