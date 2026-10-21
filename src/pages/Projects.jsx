import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../animations/PageTransition'
import PageHero from '../components/PageHero'
import ProjectCard from '../sections/ProjectCard'
import CTASection from '../sections/CTASection'
import Capabilities from '../sections/Capabilities'
import { projects, projectsIntro } from '../data/site'

// Filters are built from the categories the content file actually provides
const filters = ['All', ...new Set(projects.flatMap((p) => p.category.split(' / ').map((c) => c.trim())))]

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const items = filter === 'All' ? projects : projects.filter((p) => p.category.includes(filter))

  return (
    <PageTransition>
      <PageHero
        eyebrow={projectsIntro.eyebrow}
        title={projectsIntro.title}
        text={projectsIntro.text}
        crumbs={[{ label: 'Projects' }]}
      />
      <section className="pb-24 md:pb-36">
        <div className="container-x">
          <div className="flex flex-wrap gap-3">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${filter === f ? 'border-accent text-ink' : 'border-line text-white/70 hover:text-white'}`}
              >
                {filter === f && <motion.span layoutId="work-filter" className="absolute inset-0 rounded-full bg-accent" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="relative">{f}</span>
              </button>
            ))}
          </div>

          <motion.div layout className="focus-grid mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {items.map((p) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectCard project={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      <Capabilities />
      <CTASection />
    </PageTransition>
  )
}
