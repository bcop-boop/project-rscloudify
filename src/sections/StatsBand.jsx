import { Asterisk } from 'lucide-react'
import { capabilities, stats } from '../data/site'
import Counter from '../components/Counter'
import Marquee from '../components/Marquee'
import Reveal from '../animations/Reveal'

// NOTE: the figures in `stats` are placeholders — see the comment in data/site.js.
export default function StatsBand() {
  return (
    <section className="overflow-hidden bg-accent text-ink">
      <div className="-rotate-2 scale-105 border-y border-ink/10 bg-ink py-5 text-white">
        <Marquee duration={28} reverse>
          {capabilities.map((w) => (
            <span key={w} className="flex items-center gap-6 pr-6 font-display text-3xl font-semibold md:text-5xl">
              {w} <Asterisk className="size-8 text-accent" />
            </span>
          ))}
        </Marquee>
      </div>
      <div className="container-x grid grid-cols-2 gap-10 py-20 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <div className="font-display text-6xl font-bold md:text-8xl">
              <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
            </div>
            <p className="mt-2 font-medium text-ink/70">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
