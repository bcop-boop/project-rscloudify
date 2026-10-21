import PageTransition from '../animations/PageTransition'
import PageHero from '../components/PageHero'
import FAQ from '../sections/FAQ'
import CTASection from '../sections/CTASection'
import { faqIntro } from '../data/site'

export default function FaqPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow={faqIntro.eyebrow}
        title={faqIntro.title}
        text={faqIntro.text}
        crumbs={[{ label: 'FAQ' }]}
      />
      <FAQ heading={false} />
      <CTASection />
    </PageTransition>
  )
}
