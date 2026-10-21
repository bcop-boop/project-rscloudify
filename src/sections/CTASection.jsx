import { cta, brand } from '../data/site'
import SplitText from '../animations/SplitText'
import Reveal from '../animations/Reveal'
import Button from '../components/Button'
import { whatsappHref } from '../components/WhatsAppButton'

export default function CTASection() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-accent p-10 text-ink md:p-20">
          <div aria-hidden="true" className="absolute -right-24 -top-24 size-80 rounded-full bg-glow/40 blur-3xl" />
          <div className="relative grid items-end gap-10 md:grid-cols-2">
            <SplitText text={cta.title} className="text-4xl font-semibold md:text-6xl [&_.accent]:text-ink" />
            <Reveal className="md:justify-self-end">
              <p className="max-w-sm text-lg text-ink/70">{cta.text}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button to="/contact" variant="dark">{cta.button}</Button>
                <Button href={whatsappHref} target="_blank" rel="noreferrer noopener" variant="light" className="!border !border-ink/20">
                  WhatsApp {brand.phone}
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
