import { Asterisk } from 'lucide-react'
import { capabilities } from '../data/site'
import Marquee from '../components/Marquee'

// Capability strip (no invented client logos — the content file supplies none)
export default function Capabilities() {
  return (
    <section className="border-y border-line py-10">
      <div className="[mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <Marquee duration={38}>
          {capabilities.map((name) => (
            <span key={name} className="flex items-center gap-6 px-8 font-display text-2xl font-medium text-white/50 transition-colors duration-300 hover:text-white md:px-10 md:text-3xl">
              {name}
              <Asterisk className="size-5 text-accent" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
