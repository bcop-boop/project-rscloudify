import { motion } from 'framer-motion'
import { hero } from '../data/site'
import SplitText from '../animations/SplitText'
import Button from '../components/Button'
import RotatingBadge from '../components/RotatingBadge'
import HeroShowreel from './HeroShowreel'
import { useReady } from '../lib/ready'
import { easeOutExpo } from '../animations/easing'

export default function Hero() {
  const ready = useReady()
  const fade = (delay) => ({
    initial: { opacity: 0, y: 30 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 1, delay, ease: easeOutExpo },
  })

  return (
    <section className="relative overflow-hidden pt-40 md:pt-52">
      <div className="grid-lines absolute inset-0" aria-hidden="true" />
      <div aria-hidden="true" className="absolute left-1/2 top-10 size-[700px] -translate-x-1/2 animate-float rounded-full bg-glow/20 blur-[160px]" />
      <div aria-hidden="true" className="absolute -right-32 top-1/3 size-[420px] animate-float rounded-full bg-accent/10 blur-[130px] [animation-delay:-4s]" />

      <div className="container-x relative">
        <motion.p {...fade(0.1)} className="text-xs font-medium tracking-[0.3em] text-accent md:text-sm">
          {hero.label}
        </motion.p>

        <SplitText
          as="h1"
          text={hero.title}
          play={ready}
          delay={0.2}
          stagger={0.06}
          className="mt-8 max-w-6xl text-[11vw] font-semibold leading-[0.98] md:text-[5.5rem] lg:text-[6.5rem]"
        />

        <div className="mt-12 grid items-end gap-10 md:grid-cols-12">
          <motion.div {...fade(0.7)} className="md:col-span-6 lg:col-span-5">
            <p className="text-lg leading-relaxed text-muted">{hero.text}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to={hero.primaryCta.to}>{hero.primaryCta.label}</Button>
              <Button to={hero.secondaryCta.to} variant="outline">{hero.secondaryCta.label}</Button>
            </div>
          </motion.div>

          <motion.div {...fade(1)} className="hidden justify-end md:col-span-6 md:flex lg:col-span-7">
            <RotatingBadge />
          </motion.div>
        </div>
      </div>

      <HeroShowreel />
    </section>
  )
}
