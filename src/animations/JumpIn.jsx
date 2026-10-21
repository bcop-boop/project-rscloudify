import { forwardRef } from 'react'
import { motion } from 'framer-motion'

// Slow "jump in" used for every image on the site: rises from below with a light blur,
// then settles with a soft spring bounce. Blur/opacity use a plain tween so they never overshoot.
export const jumpInitial = { opacity: 0, y: 90, scale: 0.94, filter: 'blur(6px)' }
export const jumpShow = { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
export const jumpTransition = (delay = 0) => ({
  y: { type: 'spring', duration: 2, bounce: 0.4, delay },
  scale: { type: 'spring', duration: 2, bounce: 0.3, delay },
  opacity: { duration: 1, delay, ease: 'easeOut' },
  filter: { duration: 1.3, delay, ease: 'easeOut' },
})

const JumpIn = forwardRef(function JumpIn({ children, className = '', delay = 0, ...rest }, ref) {
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={jumpInitial}
      whileInView={jumpShow}
      viewport={{ once: true, margin: '-60px' }}
      transition={jumpTransition(delay)}
      {...rest}
    >
      {children}
    </motion.div>
  )
})

export default JumpIn
