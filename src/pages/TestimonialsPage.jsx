import PageTransition from '../animations/PageTransition'
import PageHero from '../components/PageHero'
import Testimonials from '../sections/Testimonials'
import VideoStories from '../sections/VideoStories'
import Reveal from '../animations/Reveal'
import CTASection from '../sections/CTASection'
import { testimonials, testimonialsIntro } from '../data/site'
import { initials } from '../lib/text'

export default function TestimonialsPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow={testimonialsIntro.eyebrow}
        title={testimonialsIntro.title}
        text={testimonialsIntro.text}
        crumbs={[{ label: 'Testimonials' }]}
      />
      <Testimonials heading={false} />
      <VideoStories />
      <section className="pb-24 md:pb-32">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.1} style={{ '--i': i }} className="beam flex h-full flex-col rounded-3xl border border-line bg-ink-2 p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">{t.tag}</p>
              <p className="mt-6 flex-1 text-lg leading-relaxed text-white/85">“{t.quote}”</p>
              <div className="mt-8 flex items-center gap-3 border-t border-line pt-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent">
                  {initials(t.name)}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold">{t.name}</p>
                  <p className="truncate text-sm text-muted">{t.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </PageTransition>
  )
}
