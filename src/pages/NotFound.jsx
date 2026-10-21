import { motion } from 'framer-motion'
import PageTransition from '../animations/PageTransition'
import Button from '../components/Button'
import { easeOutExpo } from '../animations/easing'

export default function NotFound() {
  return (
    <PageTransition>
      <section className="relative flex min-h-screen items-center overflow-hidden pt-32">
        <div className="grid-lines absolute inset-0" aria-hidden="true" />
        <div aria-hidden="true" className="absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 animate-float rounded-full bg-glow/20 blur-[150px]" />
        <div className="container-x relative text-center">
          <div className="flex items-center justify-center font-display text-[32vw] font-bold leading-none md:text-[18rem]">
            {['4', '0', '4'].map((d, i) => (
              <motion.span
                key={i}
                className={i === 1 ? 'accent' : ''}
                initial={{ y: 120, opacity: 0, rotate: i === 1 ? -20 : 0 }}
                animate={{ y: [0, -18, 0], opacity: 1, rotate: 0 }}
                transition={{
                  opacity: { duration: 0.8, delay: 0.5 + i * 0.1 },
                  rotate: { duration: 1, delay: 0.5 + i * 0.1, ease: easeOutExpo },
                  y: { duration: 4, delay: 0.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                {d}
              </motion.span>
            ))}
          </div>
          <h1 className="text-3xl font-semibold md:text-5xl">This page could not be found</h1>
          <p className="mx-auto mt-5 max-w-md text-lg text-muted">The page you are looking for does not exist or has been moved.</p>
          <div className="mt-10 flex justify-center"><Button to="/">Back to home</Button></div>
        </div>
      </section>
    </PageTransition>
  )
}
