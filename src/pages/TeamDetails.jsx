import { Navigate, useParams } from 'react-router-dom'
import PageTransition from '../animations/PageTransition'
import PageHero from '../components/PageHero'
import ParallaxImage from '../components/ParallaxImage'
import Reveal from '../animations/Reveal'
import TeamGrid from '../sections/TeamGrid'
import CTASection from '../sections/CTASection'
import Button from '../components/Button'
import { brand, team } from '../data/site'
import { whatsappHref } from '../components/WhatsAppButton'

export default function TeamDetails() {
  const { slug } = useParams()
  const member = team.find((m) => m.slug === slug)
  if (!member) return <Navigate to="/404" replace />

  return (
    <PageTransition>
      <PageHero
        eyebrow="Team Details"
        title={member.name}
        text={member.role}
        crumbs={[{ label: 'Team', to: '/team' }, { label: member.name }]}
      />
      <section className="pb-24 md:pb-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <ParallaxImage src={member.image} alt={member.name} className="aspect-[4/5] rounded-[2rem] lg:col-span-5" />
          <div className="lg:col-span-7">
            <Reveal><span className="eyebrow">Focus</span></Reveal>
            <Reveal delay={0.1}><p className="mt-6 font-display text-2xl leading-snug md:text-4xl">{member.bio}</p></Reveal>
            <Reveal delay={0.2} className="mt-10 rounded-3xl border border-line bg-ink-2 p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-muted">Role</p>
              <p className="mt-2 text-xl text-accent">{member.role}</p>
              <p className="mt-6 text-sm uppercase tracking-[0.2em] text-muted">Company</p>
              <p className="mt-2 text-xl">{brand.fullName}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/contact">Work with our team</Button>
                <Button href={whatsappHref} target="_blank" rel="noreferrer noopener" variant="outline">WhatsApp</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <TeamGrid heading={false} exclude={member.slug} limit={3} />
      <CTASection />
    </PageTransition>
  )
}
