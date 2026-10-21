import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react'
import { testimonials, testimonialsIntro } from '../data/site'
import SectionHeading from '../components/SectionHeading'
import { easeOutExpo } from '../animations/easing'
import { initials } from '../lib/text'

const AUTOPLAY = 7000

// The quotes and the people they are attributed to are placeholders — see the
// note above `testimonials` in src/data/site.js.
export default function Testimonials({ heading = true }) {
  const [[index, dir], setState] = useState([0, 1])
  const t = testimonials[index]
  const go = (d) => setState(([i]) => [(i + d + testimonials.length) % testimonials.length, d])

  useEffect(() => {
    const id = setTimeout(() => go(1), AUTOPLAY)
    return () => clearTimeout(id)
  }, [index])

  return (
    <section className="section relative overflow-hidden">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow/10 blur-[150px]" />
      <div className="container-x relative">
        {heading && <SectionHeading eyebrow={testimonialsIntro.eyebrow} title={testimonialsIntro.title} text={testimonialsIntro.text} align="center" />}

        <div className="beam relative mx-auto mt-16 max-w-4xl rounded-[2rem] border border-line bg-ink-2/80 p-8 md:p-16">
          <Quote className="absolute -top-7 left-8 size-14 rounded-full bg-accent p-3.5 text-ink md:left-16" />
          <div className="relative min-h-[360px] sm:min-h-[300px] md:min-h-[260px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: dir * -60, filter: 'blur(8px)' }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-accent">{t.tag}</p>
                  {t.rating > 0 && (
                    <span className="flex gap-0.5" aria-label={`${t.rating} out of 5`}>
                      {Array.from({ length: t.rating }, (_, i) => (
                        <Star key={i} className="size-3.5 fill-accent text-accent" />
                      ))}
                    </span>
                  )}
                </div>
                <p className="mt-6 font-display text-2xl font-medium leading-snug md:text-4xl">“{t.quote}”</p>
                <div className="mt-10 flex items-center gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-line text-sm font-semibold text-accent">
                    {initials(t.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-muted">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-8">
            <div className="flex min-w-0 flex-1 gap-1.5 md:gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  aria-label={`Show testimonial ${i + 1}`}
                  className="relative h-1 w-full max-w-12 shrink overflow-hidden rounded-full bg-white/10"
                >
                  {i === index && (
                    <motion.span
                      key={index}
                      className="absolute inset-0 origin-left bg-accent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTOPLAY / 1000, ease: 'linear' }}
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="flex shrink-0 gap-3">
              <button onClick={() => go(-1)} aria-label="Previous" className="flex size-12 items-center justify-center rounded-full border border-line transition-colors hover:border-accent hover:bg-accent hover:text-ink">
                <ArrowLeft className="size-5" />
              </button>
              <button onClick={() => go(1)} aria-label="Next" className="flex size-12 items-center justify-center rounded-full border border-line transition-colors hover:border-accent hover:bg-accent hover:text-ink">
                <ArrowRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
