import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faqs, faqIntro } from '../data/site'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import Reveal from '../animations/Reveal'
import { easeOutExpo } from '../animations/easing'

export default function FAQ({ heading = true, limit }) {
  const [open, setOpen] = useState(0)
  const items = limit ? faqs.slice(0, limit) : faqs
  return (
    <section className="section bg-ink-2">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          {heading && <SectionHeading eyebrow={faqIntro.eyebrow} title={faqIntro.title} text={faqIntro.text} />}
          <Reveal delay={0.2} className="mt-10"><Button to="/contact">Ask a question</Button></Reveal>
        </div>
        <div className="lg:col-span-7">
          {items.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal key={f.q} delay={i * 0.04} className="border-b border-line">
                <button
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className={`font-display text-lg font-medium transition-colors md:text-xl ${isOpen ? 'text-accent' : ''}`}>{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors ${isOpen ? 'border-accent bg-accent text-ink' : 'border-line'}`}
                  >
                    <Plus className="size-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: easeOutExpo }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 leading-relaxed text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
