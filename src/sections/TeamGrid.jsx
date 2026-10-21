import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { team, teamIntro } from '../data/site'
import SectionHeading from '../components/SectionHeading'
import JumpIn from '../animations/JumpIn'
import { fadeUpItem, staggerParent } from '../animations/Reveal'

export default function TeamGrid({ limit, heading = true, exclude }) {
  const members = team.filter((m) => m.slug !== exclude).slice(0, limit ?? team.length)
  return (
    <section className="section">
      <div className="container-x">
        {heading && <SectionHeading eyebrow={teamIntro.eyebrow} title={teamIntro.title} />}
        <motion.div
          className="focus-grid mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {members.map((m) => (
            <motion.article key={m.slug} variants={fadeUpItem} className="focus-item group">
              <Link to={`/team/${m.slug}`} className="block">
                <JumpIn className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink-3">
                  <img
                    src={m.image}
                    alt={m.name}
                    loading="lazy"
                    className="focus-img absolute inset-0 h-full w-full object-cover grayscale group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <span aria-hidden="true" className="img-sheen" />
                  <span className="absolute bottom-4 right-4 flex size-11 translate-y-4 items-center justify-center rounded-full bg-accent text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="size-5" />
                  </span>
                </JumpIn>
                <div className="focus-dim mt-5">
                  <h3 className="text-2xl font-semibold transition-colors group-hover:text-accent">{m.name}</h3>
                  <p className="mt-1 text-muted">{m.role}</p>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
