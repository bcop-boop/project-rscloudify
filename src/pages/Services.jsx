import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import PageTransition from '../animations/PageTransition'
import PageHero from '../components/PageHero'
import Icon from '../components/Icon'
import ProcessSteps from '../sections/ProcessSteps'
import FAQ from '../sections/FAQ'
import CTASection from '../sections/CTASection'
import { services, servicesIntro } from '../data/site'
import { fadeUpItem, staggerParent } from '../animations/Reveal'

export default function Services() {
  return (
    <PageTransition>
      <PageHero
        eyebrow={servicesIntro.eyebrow}
        title="What We *Build*"
        text={servicesIntro.text}
        crumbs={[{ label: 'Services' }]}
      />
      <section className="pb-24 md:pb-36">
        <motion.div
          className="focus-grid container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerParent(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {services.map((s) => (
            <motion.div key={s.slug} variants={fadeUpItem} className="focus-item">
              <Link
                to={`/services/${s.slug}`}
                style={{ '--i': s.number }}
                className="beam group relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-[2rem] border border-line bg-ink-2 p-8 md:p-9"
              >
                <img src={s.image} alt="" loading="lazy" className="focus-img absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/40 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <div className="relative flex items-start justify-between">
                  <span className="flex size-16 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-ink">
                    <Icon name={s.icon} className="size-7" strokeWidth={1.5} />
                  </span>
                  <span className="text-sm text-muted">{s.number}</span>
                </div>
                <div className="relative mt-auto pt-14">
                  <h3 className="text-2xl font-semibold md:text-3xl">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted transition-colors group-hover:text-white/80">{s.short}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-medium text-accent">
                    Learn more <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
      <ProcessSteps />
      <FAQ limit={5} />
      <CTASection />
    </PageTransition>
  )
}
