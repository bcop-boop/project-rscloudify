import { Link, Navigate, useParams } from 'react-router-dom'
import { Check, ArrowUpRight, MessageCircle } from 'lucide-react'
import PageTransition from '../animations/PageTransition'
import PageHero from '../components/PageHero'
import ParallaxImage from '../components/ParallaxImage'
import Button from '../components/Button'
import Reveal from '../animations/Reveal'
import SplitText from '../animations/SplitText'
import ProcessSteps from '../sections/ProcessSteps'
import ProjectsGrid from '../sections/ProjectsGrid'
import CTASection from '../sections/CTASection'
import { brand, services } from '../data/site'
import { whatsappHref } from '../components/WhatsAppButton'

export default function ServiceDetails() {
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)
  if (!service) return <Navigate to="/404" replace />

  return (
    <PageTransition>
      <PageHero
        eyebrow={`Service ${service.number}`}
        title={service.title}
        text={service.short}
        crumbs={[{ label: 'Services', to: '/services' }, { label: service.title }]}
      />
      <div className="container-x">
        <ParallaxImage src={service.image} alt={service.title} className="aspect-[16/8] rounded-[2rem]" />
      </div>

      <section className="section">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SplitText text="Overview" className="text-3xl font-semibold md:text-5xl" />
            <Reveal><p className="mt-6 text-xl leading-relaxed text-white/80">{service.description}</p></Reveal>
            {service.note && (
              <Reveal delay={0.1}>
                <p className="mt-6 rounded-2xl border border-accent/30 bg-accent/5 p-6 text-accent">{service.note}</p>
              </Reveal>
            )}

            <Reveal delay={0.1}><h3 className="mt-14 text-2xl font-semibold md:text-3xl">Includes</h3></Reveal>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {service.features.map((f, i) => (
                <Reveal as="li" key={f} delay={i * 0.05} className="beam flex items-center gap-4 rounded-2xl border border-line bg-ink-2 p-5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-ink"><Check className="size-4" strokeWidth={3} /></span>
                  {f}
                </Reveal>
              ))}
            </ul>
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <Reveal className="beam rounded-[2rem] border border-line bg-ink-2 p-3 lg:sticky lg:top-28">
              <p className="px-5 pb-2 pt-4 text-sm uppercase tracking-[0.2em] text-muted">All services</p>
              <ul>
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/services/${s.slug}`}
                      className={`group flex items-center justify-between gap-3 rounded-2xl px-5 py-3.5 text-sm transition-colors ${
                        s.slug === slug ? 'bg-accent text-ink' : 'hover:bg-white/5'
                      }`}
                    >
                      {s.title}
                      <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:rotate-45" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-3 rounded-2xl bg-glow p-7 text-ink">
                <MessageCircle className="size-8" />
                <h4 className="mt-6 text-2xl font-semibold">Have a project in mind?</h4>
                <p className="mt-2 font-medium">{brand.phone}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button to="/contact" variant="dark" className="!px-5 !py-3 text-sm">Start a Project</Button>
                  <Button href={whatsappHref} target="_blank" rel="noreferrer noopener" variant="light" className="!px-5 !py-3 text-sm">WhatsApp</Button>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
      <ProcessSteps />
      <ProjectsGrid limit={2} showCta={false} />
      <CTASection />
    </PageTransition>
  )
}
