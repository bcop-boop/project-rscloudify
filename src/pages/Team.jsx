import PageTransition from '../animations/PageTransition'
import PageHero from '../components/PageHero'
import TeamGrid from '../sections/TeamGrid'
import CTASection from '../sections/CTASection'
import { teamIntro } from '../data/site'

export default function Team() {
  return (
    <PageTransition>
      <PageHero
        eyebrow={teamIntro.eyebrow}
        title={teamIntro.title}
        text={teamIntro.text}
        crumbs={[{ label: 'Team Grid' }]}
      />
      <TeamGrid heading={false} />
      <CTASection />
    </PageTransition>
  )
}
