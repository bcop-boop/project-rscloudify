import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { services, servicesIntro } from '../data/site'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import Reveal from '../animations/Reveal'

// Service rows; on desktop, hovering a row shows its image floating with the cursor
export default function ServicesList({ limit, showCta = true }) {
  const items = limit ? services.slice(0, limit) : services
  const [active, setActive] = useState(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 20 })
  const sy = useSpring(y, { stiffness: 150, damping: 20 })

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - r.left)
    y.set(e.clientY - r.top)
  }

  return (
    <section className="section bg-ink-2">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow={servicesIntro.eyebrow} title={servicesIntro.title} text={servicesIntro.text} />
          {showCta && <Reveal><Button to="/services" variant="outline">All services</Button></Reveal>}
        </div>

        <div className="relative mt-16" onMouseMove={onMove} onMouseLeave={() => setActive(null)}>
          <AnimatePresence>
            {active !== null && (
              <motion.div
                key="float"
                className="pointer-events-none absolute left-0 top-0 z-10 hidden h-64 w-80 overflow-hidden rounded-2xl lg:block"
                style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
                initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6, rotate: 8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={active}
                    src={items[active].image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {items.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.04}>
              <Link
                to={`/services/${s.slug}`}
                onMouseEnter={() => setActive(i)}
                className="group relative grid grid-cols-12 items-center gap-4 border-t border-line py-7 last:border-b md:py-9"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                <span className="relative col-span-2 text-sm text-muted transition-colors group-hover:text-ink md:col-span-1 md:pl-4">{s.number}</span>
                <h3 className="relative col-span-10 text-2xl font-semibold transition-all duration-500 group-hover:text-ink md:col-span-5 md:text-4xl md:group-hover:translate-x-4">
                  {s.title}
                </h3>
                <p className="relative col-span-12 text-sm text-muted transition-colors group-hover:text-ink/70 md:col-span-5 md:text-base">{s.short}</p>
                <span className="relative col-span-1 hidden justify-end pr-4 md:flex">
                  <span className="flex size-12 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-accent">
                    <ArrowUpRight className="size-5" />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
