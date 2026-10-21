import { useState } from 'react'
import { motion } from 'framer-motion'
import { process, processIntro } from '../data/site'
import SectionHeading from '../components/SectionHeading'
import ObjectCanvas from '../components/ObjectCanvas'
import { easeOutExpo } from '../animations/easing'

// Left: sticky heading + chrome object. Right: steps; whichever step crosses the
// middle of the viewport becomes active.
export default function ProcessSteps() {
  const [active, setActive] = useState(0)

  return (
    <section className="section relative">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 bottom-0 size-[600px] rounded-full bg-glow/[0.08] blur-[140px]" />
      <div className="container-x relative grid gap-16 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow={processIntro.eyebrow} title={processIntro.title} text={processIntro.text} />
          <ObjectCanvas shape="wirecube" active={active} className="relative mx-auto mt-2 aspect-square w-full max-w-[460px] lg:mx-0" />
        </div>

        <ol className="lg:pt-10">
          {process.map((p, i) => {
            const on = i === active
            return (
              <motion.li
                key={p.step}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, ease: easeOutExpo }}
              >
                <motion.div
                  className="flex gap-6 py-7 md:gap-8"
                  onViewportEnter={() => setActive(i)}
                  viewport={{ margin: '-48% 0px -48% 0px' }}
                >
                  <div className={`flex w-14 shrink-0 items-center justify-center rounded-2xl py-7 transition-colors duration-500 ${on ? 'bg-accent text-ink' : 'bg-ink-3 text-white'}`}>
                    <span className="rotate-180 text-xs font-semibold tracking-[0.15em] [writing-mode:vertical-rl]">STEP {p.step}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-semibold transition-colors duration-500 md:text-3xl ${on ? 'text-white' : 'text-white/60'}`}>{p.title}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-muted">{p.text}</p>
                    <div className="relative mt-6 h-px bg-line">
                      <motion.span
                        className="absolute inset-0 origin-left bg-accent"
                        animate={{ scaleX: on ? 1 : 0 }}
                        transition={{ duration: 0.8, ease: easeOutExpo }}
                      />
                      <span className={`absolute -right-1 -top-1 size-2.5 rounded-full transition-all duration-500 ${on ? 'scale-125 bg-accent shadow-[0_0_14px_var(--color-accent)]' : 'bg-white/40'}`} />
                    </div>
                  </div>
                </motion.div>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
