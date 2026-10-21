import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUp, ArrowUpRight, MessageCircle, Phone } from 'lucide-react'
import { brand, services } from '../data/site'
import Reveal from '../animations/Reveal'
import FooterWordmark from './FooterWordmark'
import { whatsappHref } from './WhatsAppButton'
import { getLenis, scrollToTop } from '../lib/scroll'

const company = [
  { label: 'Home', to: '/' },
  { label: 'About us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Team', to: '/team' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

export default function Footer() {
  const toTop = () => {
    const lenis = getLenis()
    lenis ? lenis.scrollTo(0, { duration: 1.6 }) : scrollToTop({ immediate: false })
  }

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-2">
      <div className="container-x grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <img src="/logo.png" alt={brand.fullName} className="h-14 w-auto md:h-16" />
          <p className="mt-6 max-w-sm text-muted">{brand.tagline}</p>
          <p className="mt-4 font-display text-2xl font-semibold">{brand.motto}</p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-3">
          <h4 className="text-sm uppercase tracking-[0.2em] text-muted">Company</h4>
          <ul className="mt-6 grid grid-cols-2 gap-3">
            {company.map((l) => (
              <li key={l.to}><Link to={l.to} className="text-white/80 transition-colors hover:text-accent">{l.label}</Link></li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.2} className="lg:col-span-2">
          <h4 className="text-sm uppercase tracking-[0.2em] text-muted">Services</h4>
          <ul className="mt-6 space-y-3">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}><Link to={`/services/${s.slug}`} className="text-sm text-white/80 transition-colors hover:text-accent">{s.title}</Link></li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.3} className="lg:col-span-2">
          <h4 className="text-sm uppercase tracking-[0.2em] text-muted">Get in touch</h4>
          <div className="mt-6 space-y-4">
            <a href={`tel:${brand.phoneIntl.replace(/\s/g, '')}`} className="group flex items-center gap-3 text-white">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                <Phone className="size-4" />
              </span>
              {brand.phone}
            </a>
            <a href={whatsappHref} target="_blank" rel="noreferrer noopener" className="group flex items-center gap-3 text-white">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                <MessageCircle className="size-4" />
              </span>
              WhatsApp
            </a>
            <p className="text-sm text-muted">{brand.address}</p>
            <a href={`mailto:${brand.email}`} className="break-words text-sm text-white transition-colors hover:text-accent">{brand.email}</a>
            <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-accent">
              Start a Project <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="container-x flex flex-col items-center justify-between gap-4 border-t border-line py-7 text-sm text-muted md:flex-row">
        <p>© {new Date().getFullYear()} {brand.fullName}. All rights reserved.</p>
        <motion.button onClick={toTop} className="group flex items-center gap-2 text-white" aria-label="Back to top" whileHover={{ y: -2 }}>
          Back to top
          <span className="flex size-9 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-accent group-hover:text-ink">
            <ArrowUp className="size-4" />
          </span>
        </motion.button>
      </div>

      <FooterWordmark />
    </footer>
  )
}
