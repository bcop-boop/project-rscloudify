import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import PageTransition from '../animations/PageTransition'
import PageHero from '../components/PageHero'
import ParallaxImage from '../components/ParallaxImage'
import Reveal from '../animations/Reveal'
import SplitText from '../animations/SplitText'
import CTASection from '../sections/CTASection'
import { projects } from '../data/site'
import { easeOutExpo } from '../animations/easing'

export default function ProjectDetails() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) return <Navigate to="/404" replace />
  const project = projects[index]
  const next = projects[(index + 1) % projects.length]

  const meta = [
    { label: 'Project', value: project.title },
    { label: 'Type', value: project.subtitle },
    { label: 'Category', value: project.category },
  ]

  return (
    <PageTransition>
      <PageHero
        eyebrow={`Project ${project.number}`}
        title={project.title}
        text={project.subtitle}
        crumbs={[{ label: 'Projects', to: '/projects' }, { label: project.title }]}
      >
        <motion.dl
          className="mt-14 grid grid-cols-1 gap-8 border-t border-line pt-10 sm:grid-cols-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05, ease: easeOutExpo }}
        >
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="text-sm uppercase tracking-[0.2em] text-muted">{m.label}</dt>
              <dd className="mt-2 text-lg">{m.value}</dd>
            </div>
          ))}
        </motion.dl>
      </PageHero>

      <div className="container-x">
        <ParallaxImage src={project.image} alt={project.title} className="aspect-[16/9] rounded-[2rem]" />
      </div>

      <section className="section">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SplitText text="Overview" className="text-3xl font-semibold md:text-5xl" />
            <Reveal><p className="mt-6 text-xl leading-relaxed text-white/80">{project.summary}</p></Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal><h3 className="text-2xl font-semibold">Capabilities</h3></Reveal>
            <ul className="mt-6 space-y-3">
              {project.capabilities.map((c, i) => (
                <Reveal as="li" key={c} delay={i * 0.05} className="flex items-center gap-4 border-b border-line pb-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent"><Check className="size-3.5" strokeWidth={3} /></span>
                  {c}
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="container-x grid gap-6 md:grid-cols-2">
        <ParallaxImage src={project.gallery[0]} alt="" className="aspect-[16/9] rounded-[2rem] md:col-span-2" />
        <ParallaxImage src={project.gallery[1]} alt="" className="aspect-[4/5] rounded-[2rem]" speed={8} />
        <Reveal className="flex items-center rounded-[2rem] border border-line bg-ink-2 p-10 md:p-14">
          <div>
            <p className="eyebrow">Interface preview</p>
            <p className="mt-6 font-display text-2xl leading-snug md:text-3xl">{project.subtitle}</p>
            <p className="mt-4 text-muted">{project.category}</p>
          </div>
        </Reveal>
      </div>

      <Link to={`/projects/${next.slug}`} className="group relative mt-24 block overflow-hidden border-t border-line" data-cursor="view" data-cursor-label="Next">
        <img src={next.image} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition-all duration-1000 group-hover:scale-100 group-hover:opacity-30" />
        <div className="container-x relative flex flex-col items-start justify-between gap-6 py-24 md:flex-row md:items-end md:py-32">
          <div>
            <span className="eyebrow">Next project</span>
            <h2 className="mt-6 text-5xl font-semibold transition-transform duration-700 group-hover:translate-x-6 md:text-8xl">{next.title}</h2>
          </div>
          <span className="flex size-24 items-center justify-center rounded-full bg-accent text-ink transition-transform duration-700 group-hover:rotate-45 md:size-32">
            <ArrowUpRight className="size-10" />
          </span>
        </div>
      </Link>
      <CTASection />
    </PageTransition>
  )
}
