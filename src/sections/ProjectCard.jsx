import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import JumpIn from '../animations/JumpIn'
import { useImageMotion } from '../lib/imageMotion'

export default function ProjectCard({ project, className = '', aspect = 'aspect-[4/3]' }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const pan = useImageMotion()
  const sx = useSpring(x, { stiffness: 260, damping: 24 })
  const sy = useSpring(y, { stiffness: 260, damping: 24 })

  const place = (e, jump = false) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - r.left)
    y.set(e.clientY - r.top)
    if (jump) { sx.jump(x.get()); sy.jump(y.get()) }
  }

  return (
    <Link to={`/projects/${project.slug}`} className={`focus-item group block ${className}`}>
      <JumpIn
        className={`relative overflow-hidden rounded-3xl ${aspect}`}
        onMouseEnter={(e) => place(e, true)}
        onMouseMove={place}
      >
        <div className="focus-img absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
          <img src={project.image} alt={project.title} loading="lazy" className="img-motion h-full w-full object-cover" style={pan} />
        </div>
        <span aria-hidden="true" className="img-sheen" />
        <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/20" />
        <span className="glass absolute left-5 top-5 rounded-full border border-white/10 px-3 py-1.5 text-xs">{project.category}</span>
        <motion.span className="pointer-events-none absolute left-0 top-0 hidden md:block" style={{ x: sx, y: sy }}>
          <span className="flex size-24 -translate-x-1/2 -translate-y-1/2 scale-0 items-center justify-center rounded-full bg-accent text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100">
            <ArrowUpRight className="size-8 transition-transform duration-500 group-hover:rotate-45" />
          </span>
        </motion.span>
      </JumpIn>
      <div className="focus-dim mt-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold transition-colors group-hover:text-accent md:text-3xl">{project.title}</h3>
          <p className="mt-1 text-muted">{project.subtitle}</p>
        </div>
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
          <ArrowUpRight className="size-5" />
        </span>
      </div>
    </Link>
  )
}
