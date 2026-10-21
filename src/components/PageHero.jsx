import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import SplitText from '../animations/SplitText'
import { easeOutExpo } from '../animations/easing'

// Banner used at the top of every inner page
export default function PageHero({ eyebrow, title, text, crumbs = [], children }) {
  return (
    <section className="relative overflow-hidden pb-20 pt-44 md:pb-28 md:pt-56">
      <div className="grid-lines absolute inset-0" aria-hidden="true" />
      <div aria-hidden="true" className="absolute -right-40 -top-40 size-[520px] animate-float rounded-full bg-glow/25 blur-[140px]" />
      <div aria-hidden="true" className="absolute -left-20 bottom-0 size-[380px] animate-float rounded-full bg-accent/10 blur-[120px] [animation-delay:-3s]" />

      <div className="container-x relative">
        <motion.nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-sm text-muted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: easeOutExpo }}
        >
          <Link to="/" className="hover:text-accent">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-2">
              <ChevronRight className="size-3.5" />
              {c.to ? <Link to={c.to} className="hover:text-accent">{c.label}</Link> : <span className="text-white">{c.label}</span>}
            </span>
          ))}
        </motion.nav>

        {eyebrow && (
          <motion.span
            className="eyebrow mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {eyebrow}
          </motion.span>
        )}
        <SplitText as="h1" text={title} play delay={0.6} className="mt-6 max-w-5xl text-5xl font-semibold md:text-8xl" />
        {text && (
          <motion.p
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: easeOutExpo }}
          >
            {text}
          </motion.p>
        )}
        {children}
      </div>
    </section>
  )
}
