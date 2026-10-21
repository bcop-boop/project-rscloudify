import { useLayoutEffect, useRef } from 'react'
import { intro } from '../data/site'
import { gsap } from '../lib/scroll'
import Reveal from '../animations/Reveal'
import ParallaxImage from '../components/ParallaxImage'
import Button from '../components/Button'
import SplitText from '../animations/SplitText'

// Statement paragraph whose words light up one by one as you scroll
function ScrollHighlight({ text }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // On phones the whole paragraph is on screen at once, so a 0.15 start
      // would leave half of it unreadable — start brighter and finish sooner.
      const small = window.matchMedia('(max-width: 1023px)').matches
      gsap.fromTo(
        '.hl-word',
        { opacity: small ? 0.45 : 0.15 },
        {
          opacity: 1,
          stagger: small ? 0.03 : 0.06,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: small ? 'top 95%' : 'top 80%', end: small ? 'bottom 75%' : 'bottom 45%', scrub: true },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [text])

  return (
    <p ref={ref} className="font-display text-2xl font-medium leading-[1.25] tracking-tight md:text-4xl">
      {text.split(' ').map((w, i) => (
        <span key={i} className="hl-word">{w} </span>
      ))}
    </p>
  )
}

export default function Intro({ showCta = true }) {
  return (
    <section className="section">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <span className="eyebrow">{intro.eyebrow}</span>
            <SplitText text={intro.title} className="mt-5 text-3xl font-semibold md:text-4xl" />
          </Reveal>
          <div className="lg:col-span-9">
            <ScrollHighlight text={intro.statement} />
            {showCta && (
              <Reveal delay={0.1} className="mt-10"><Button to="/about" variant="outline">More about us</Button></Reveal>
            )}
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-12">
          <ParallaxImage src={intro.images[0]} alt="" className="aspect-[4/5] rounded-3xl md:col-span-5" />
          <div className="flex flex-col justify-between gap-6 md:col-span-7">
            <ParallaxImage src={intro.images[1]} alt="" className="aspect-[16/10] rounded-3xl" speed={8} delay={0.15} />
            <Reveal delay={0.1} className="rounded-3xl border border-line bg-ink-2 p-8 md:p-10">
              <h3 className="font-display text-2xl font-semibold text-accent">{intro.beliefTitle}</h3>
              <p className="mt-4 text-lg leading-relaxed text-white/80">{intro.belief}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
