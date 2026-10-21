import PageTransition from '../animations/PageTransition'
import Hero from '../sections/Hero'
import Capabilities from '../sections/Capabilities'
import Intro from '../sections/Intro'
import ServicesList from '../sections/ServicesList'
import ProjectsGrid from '../sections/ProjectsGrid'
import StatsBand from '../sections/StatsBand'
import TechApproach from '../sections/TechApproach'
import ProcessSteps from '../sections/ProcessSteps'
import WhyUs from '../sections/WhyUs'
import Testimonials from '../sections/Testimonials'
import VideoStories from '../sections/VideoStories'
import FAQ from '../sections/FAQ'
import CTASection from '../sections/CTASection'

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Capabilities />
      <Intro />
      <ServicesList />
      <ProjectsGrid limit={4} />
      <StatsBand />
      <TechApproach />
      <ProcessSteps />
      <WhyUs />
      <Testimonials />
      <VideoStories />
      <FAQ limit={5} />
      <CTASection />
    </PageTransition>
  )
}
