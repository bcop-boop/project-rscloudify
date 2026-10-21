import { motion } from 'framer-motion'
import { easeInOutQuart, easeOutExpo } from './easing'
import { ScrollTrigger } from '../lib/scroll'
import Footer from '../components/Footer'
import { brand } from '../data/site'

// Wraps every page: a accent curtain sweeps up to cover the old page,
// then lifts away to reveal the new one while its content rises in.
export default function PageTransition({ children }) {
  return (
    <>
      <motion.main
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.45, ease: easeOutExpo } }}
        exit={{ opacity: 0, y: -40, transition: { duration: 0.5, ease: easeInOutQuart } }}
        onAnimationComplete={() => ScrollTrigger.refresh()}
      >
        {children}
        <Footer />
      </motion.main>

      {/* cover: grows from the bottom on exit */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] flex origin-bottom items-center justify-center bg-accent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.7, ease: easeInOutQuart }}
      />
      {/* reveal: shrinks toward the top on enter */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] flex origin-top items-center justify-center bg-accent"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: easeInOutQuart }}
      >
        <motion.span
          className="font-display text-5xl font-bold tracking-tight text-ink md:text-7xl"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {brand.name}.
        </motion.span>
      </motion.div>
    </>
  )
}
