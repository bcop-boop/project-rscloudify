import { motion } from 'framer-motion'
import { easeOutExpo } from './easing'

// Splits a heading into words that slide up from a mask.
// Words wrapped in *asterisks* render in the italic serif accent.
// `play`: undefined = animate when scrolled into view, boolean = controlled.
export default function SplitText({ text, as = 'h2', className = '', delay = 0, stagger = 0.05, play }) {
  const M = motion[as]
  const tokens = text.split(' ').map((raw) => {
    const accent = raw.startsWith('*') || raw.endsWith('*')
    return { word: raw.replaceAll('*', ''), accent }
  })
  const trigger =
    play === undefined
      ? { whileInView: 'show', viewport: { once: true, margin: '-40px' } }
      : { animate: play ? 'show' : 'hidden' }

  return (
    <M
      className={className}
      aria-label={text.replaceAll('*', '')}
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {tokens.map(({ word, accent }, i) => (
        <span key={i} aria-hidden="true">
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className={`inline-block ${accent ? 'accent pr-[0.06em]' : ''}`}
              variants={{ hidden: { y: '115%', rotate: 4 }, show: { y: 0, rotate: 0, transition: { duration: 1, ease: easeOutExpo } } }}
            >
              {word}
            </motion.span>
          </span>
          {i < tokens.length - 1 && ' '}
        </span>
      ))}
    </M>
  )
}
