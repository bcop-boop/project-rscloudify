import PageTransition from '../animations/PageTransition'
import PageHero from '../components/PageHero'
import Intro from '../sections/Intro'
import WhyUs from '../sections/WhyUs'
import TechApproach from '../sections/TechApproach'
import StatsBand from '../sections/StatsBand'
import ProcessSteps from '../sections/ProcessSteps'
import TeamGrid from '../sections/TeamGrid'
import Testimonials from '../sections/Testimonials'
import CTASection from '../sections/CTASection'
import Capabilities from '../sections/Capabilities'
import { positioning } from '../data/site'

export default function About() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="About us"
        title="A technology and product *engineering* company"
        text={positioning}
        crumbs={[{ label: 'About us' }]}
      />
      <Capabilities />
      <Intro showCta={false} />
      <StatsBand />
      <WhyUs />
      <TechApproach />
      <ProcessSteps />
      <TeamGrid limit={3} />
      <Testimonials />
      <CTASection />
    </PageTransition>
  )
}
