import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const variants = {
  primary: 'bg-accent text-ink hover:bg-white',
  outline: 'border border-white/20 text-white hover:border-accent hover:text-accent',
  dark: 'bg-ink text-white hover:bg-ink-3',
  light: 'bg-white text-ink hover:bg-accent',
}

// Magnetic pill button with rolling-text hover. Renders a Link, <a> or <button>.
export default function Button({ to, href, children, variant = 'primary', icon = true, className = '', magnetic = true, ...rest }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.4 })

  const onMove = (e) => {
    if (!magnetic || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35)
  }
  const reset = () => { x.set(0); y.set(0) }

  const cls = `group relative inline-flex items-center gap-3 rounded-full px-7 py-4 text-[15px] font-medium transition-colors duration-500 ${variants[variant]} ${className}`
  const inner = (
    <>
      <span className="relative block overflow-hidden leading-none">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">{children}</span>
        <span className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" aria-hidden="true">{children}</span>
      </span>
      {icon && <ArrowUpRight className="size-[18px] transition-transform duration-500 group-hover:rotate-45" />}
    </>
  )

  let el
  if (to) el = <Link to={to} className={cls} {...rest}>{inner}</Link>
  else if (href) el = <a href={href} className={cls} {...rest}>{inner}</a>
  else el = <button className={cls} {...rest}>{inner}</button>

  return (
    <motion.div ref={ref} className="inline-block" style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={reset}>
      {el}
    </motion.div>
  )
}
