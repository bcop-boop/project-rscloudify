import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { brand, techApproach } from '../data/site'
import SectionHeading from '../components/SectionHeading'
import ObjectCanvas from '../components/ObjectCanvas'
import { fadeUpItem, staggerParent } from '../animations/Reveal'

// OUR TECHNOLOGY APPROACH — capability groups, no invented numbers
export default function TechApproach() {
  return (
    <section className="section relative overflow-hidden bg-ink-2">
      <div aria-hidden="true" className="absolute -left-40 top-1/3 size-[520px] rounded-full bg-accent/[0.06] blur-[140px]" />
      <div className="container-x relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={techApproach.eyebrow} title={techApproach.title} text={techApproach.text} />
          <ObjectCanvas shape="wiresphere" className="relative mx-auto mt-6 aspect-square w-full max-w-[380px] lg:mx-0" />
        </div>

        <motion.div
          className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:col-span-7 lg:self-start"
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {techApproach.groups.map((g) => (
            <motion.div key={g.name} variants={fadeUpItem} className="group bg-ink-2 p-8 transition-colors duration-500 hover:bg-ink">
              <h3 className="font-display text-xl font-semibold text-accent">{g.name}</h3>
              <ul className="mt-5 space-y-2.5">
                {g.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/80">
                    <span className="size-1.5 shrink-0 rounded-full bg-accent/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* sixth cell: the grid is 5 groups in a 2-column layout, so this fills the gap */}
          <motion.div variants={fadeUpItem} className="flex flex-col justify-between bg-accent p-8 text-ink">
            <div>
              <h3 className="font-display text-xl font-semibold">{brand.motto}</h3>
              <p className="mt-4 leading-relaxed text-ink/75">{brand.tagline}</p>
            </div>
            <Link to="/contact" className="group mt-8 inline-flex items-center gap-2 font-semibold">
              Start a Project
              <span className="flex size-9 items-center justify-center rounded-full bg-ink text-accent transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="size-4" />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
