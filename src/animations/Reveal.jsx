import { motion } from 'framer-motion'
import { easeOutExpo } from './easing'

export default function Reveal({ children, as = 'div', delay = 0, y = 40, x = 0, className = '', once = true }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 1, delay, ease: easeOutExpo }}
    >
      {children}
    </M>
  )
}

// Stagger container + item pair for grids and lists
export const staggerParent = (stagger = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

export const fadeUpItem = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOutExpo } },
}
