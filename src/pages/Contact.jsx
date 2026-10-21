import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Phone, Check, Send } from 'lucide-react'
import PageTransition from '../animations/PageTransition'
import PageHero from '../components/PageHero'
import Button from '../components/Button'
import Reveal from '../animations/Reveal'
import FAQ from '../sections/FAQ'
import { brand, contact, services } from '../data/site'
import { whatsappHref } from '../components/WhatsAppButton'

function Field({ label, as = 'input', ...props }) {
  const Tag = as
  return (
    <label className="group relative block">
      <Tag
        {...props}
        placeholder=" "
        className={`peer w-full border-b border-line bg-transparent pb-3 pt-7 text-lg outline-none transition-colors focus:border-accent ${as === 'textarea' ? 'min-h-36 resize-none' : ''}`}
      />
      <span className="pointer-events-none absolute left-0 top-7 text-lg text-muted transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.2em]">
        {label}
      </span>
    </label>
  )
}

export default function Contact() {
  const [projectType, setProjectType] = useState('')
  const [status, setStatus] = useState('idle')

  // Posts to Netlify Forms (the matching static form lives in index.html).
  // Submissions appear under Forms in the Netlify dashboard.
  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    const data = new FormData(form)
    data.append('form-name', 'contact')
    data.set('projectType', projectType)
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      })
      if (!res.ok) throw new Error(`Form POST failed: ${res.status}`)
      setStatus('sent')
    } catch (err) {
      console.error(err)
      setStatus('error') // the dev server has no form handler, so this is expected locally
    }
  }

  const info = [
    { icon: Phone, label: 'Call us', value: brand.phone, href: `tel:${brand.phoneIntl.replace(/\s/g, '')}` },
    { icon: MessageCircle, label: 'WhatsApp', value: brand.phone, href: whatsappHref, external: true },
  ]

  return (
    <PageTransition>
      <PageHero
        eyebrow={contact.eyebrow}
        title={contact.title}
        text={contact.text}
        crumbs={[{ label: 'Contact' }]}
      />

      <section className="pb-24 md:pb-36">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="beam flex min-h-[520px] flex-col items-start justify-center rounded-[2rem] border border-accent/40 bg-ink-2 p-10"
                >
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }} className="flex size-20 items-center justify-center rounded-full bg-accent text-ink">
                    <Check className="size-10" strokeWidth={3} />
                  </motion.span>
                  <h2 className="mt-8 text-4xl font-semibold md:text-5xl">Message received</h2>
                  <p className="mt-4 text-lg text-muted">Thanks for reaching out. Our team will get back to you shortly.</p>
                  <div className="mt-8">
                    <Button href={whatsappHref} target="_blank" rel="noreferrer noopener" variant="outline">Continue on WhatsApp</Button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={submit}
                  className="space-y-10"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>Leave this empty: <input name="bot-field" /></label>
                  </p>
                  <div className="grid gap-10 md:grid-cols-2">
                    <Field label={contact.fields.name} name="name" required />
                    <Field label={contact.fields.email} name="email" type="email" required />
                    <Field label={contact.fields.company} name="company" />
                    <Field label="Phone (optional)" name="phone" type="tel" />
                  </div>

                  <div>
                    <p className="mb-5 text-sm uppercase tracking-[0.2em] text-muted">{contact.fields.projectType}</p>
                    <div className="flex flex-wrap gap-3">
                      {services.map((s) => {
                        const on = projectType === s.title
                        return (
                          <button
                            type="button"
                            key={s.slug}
                            onClick={() => setProjectType(on ? '' : s.title)}
                            className={`rounded-full border px-5 py-2.5 text-sm transition-all duration-300 ${on ? 'border-accent bg-accent text-ink' : 'border-line hover:border-white/40'}`}
                          >
                            {s.title}
                          </button>
                        )
                      })}
                    </div>
                    <input type="hidden" name="projectType" value={projectType} />
                  </div>

                  <Field as="textarea" label={contact.fields.message} name="message" required />
                  <div className="flex flex-wrap items-center gap-4">
                    <Button type="submit" disabled={status === 'sending'} icon={false}>
                      <span className="inline-flex items-center gap-2">
                        {status === 'sending' ? 'Sending…' : contact.submit}
                        <Send className="size-4" />
                      </span>
                    </Button>
                    {status === 'error' && (
                      <p className="text-sm text-accent">
                        Could not send just now — please{' '}
                        <a href={whatsappHref} target="_blank" rel="noreferrer noopener" className="underline">message us on WhatsApp</a>.
                      </p>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>

          <div className="space-y-4 lg:col-span-5">
            {info.map(({ icon: IconCmp, label, value, href, external }, i) => (
              <Reveal key={label} delay={i * 0.08}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                  style={{ '--i': i }}
                  className="beam group flex items-center gap-5 rounded-3xl border border-line bg-ink-2 p-6 transition-colors duration-500 hover:border-accent/50"
                >
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-ink">
                    <IconCmp className="size-6" />
                  </span>
                  <span>
                    <span className="block text-sm text-muted">{label}</span>
                    <span className="mt-1 block text-lg">{value}</span>
                  </span>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.2} className="rounded-3xl border border-line bg-ink-2 p-8">
              <h3 className="font-display text-xl font-semibold">{brand.fullName}</h3>
              <p className="mt-3 text-muted">{brand.tagline}</p>
              <p className="mt-4 text-muted">{brand.address}</p>
              <a href={`mailto:${brand.email}`} className="mt-3 inline-block text-white transition-colors hover:text-accent">{brand.email}</a>
              <p className="mt-6 font-display text-2xl text-accent">{brand.motto}</p>
            </Reveal>
          </div>
        </div>
      </section>
      <FAQ limit={5} />
    </PageTransition>
  )
}
