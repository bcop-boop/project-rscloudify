import { useEffect, useState } from 'react'
import { motion, animate } from 'framer-motion'
import { brand } from '../data/site'
import { easeInOutQuart } from '../animations/easing'

export default function Preloader({ onDone }) {
  const [n, setN] = useState(0)

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2.2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => setTimeout(onDone, 250),
    })
    return () => controls.stop()
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex flex-col justify-between bg-ink p-6 md:p-10"
      exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 1, ease: easeInOutQuart } }}
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      {/* Changes.txt: "on Loading Page show RS Cloudify" */}
      <div className="flex items-center justify-between gap-6 text-sm text-muted">
        <img src="/logo.png" alt={brand.name} className="h-11 w-auto md:h-14" />
        <span className="hidden text-right text-xs uppercase tracking-[0.2em] sm:block">{brand.tagline}</span>
      </div>

      <div className="overflow-hidden">
        <motion.p
          className="max-w-3xl font-display text-3xl font-medium leading-tight md:text-5xl"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="accent">{brand.name}</span> — building the digital products that move businesses forward.
        </motion.p>
      </div>

      <div>
        <div className="flex items-end justify-between">
          <span className="text-sm uppercase tracking-[0.2em] text-muted">{brand.motto}</span>
          <span className="font-display text-7xl font-bold tabular-nums leading-none md:text-[10rem]">
            {n}<span className="text-accent">%</span>
          </span>
        </div>
        <div className="mt-6 h-px w-full bg-line">
          <div className="h-full bg-accent" style={{ width: `${n}%` }} />
        </div>
      </div>
    </motion.div>
  )
}
