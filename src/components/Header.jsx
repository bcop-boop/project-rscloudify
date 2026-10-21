import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { nav } from '../data/site'
import Button from './Button'
import Logo from './Logo'
import MobileMenu from './MobileMenu'
import { useReady } from '../lib/ready'
import { easeOutExpo } from '../animations/easing'

function RollingLabel({ children }) {
  return (
    <span className="relative block overflow-hidden leading-tight">
      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">{children}</span>
      <span className="absolute inset-0 block translate-y-full text-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" aria-hidden="true">{children}</span>
    </span>
  )
}


// A dropdown row that can itself open a submenu to the side on hover.
function SubItem({ item, onNavigate }) {
  const [open, setOpen] = useState(false)
  if (!item.children) {
    return (
      <li>
        <Link
          to={item.to}
          onClick={onNavigate}
          className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-accent"
        >
          {item.label}
        </Link>
      </li>
    )
  }
  return (
    <li className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <Link
        to={item.to}
        onClick={(e) => {
          // first tap on a touch device opens the submenu instead of navigating
          if (!window.matchMedia('(pointer: fine)').matches && !open) {
            e.preventDefault()
            setOpen(true)
            return
          }
          onNavigate()
        }}
        className="flex items-center justify-between gap-2 rounded-xl px-4 py-3 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-accent"
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown className={`size-4 -rotate-90 transition-transform duration-300 ${open ? 'text-accent' : ''}`} />
      </Link>
      <AnimatePresence>
        {open && (
          // the wrapper's left padding bridges the gap so the pointer never
          // leaves the hoverable area on its way to the submenu
          <motion.div
            className="absolute left-full top-0 pl-2"
            initial={{ opacity: 0, x: -8, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -8, filter: 'blur(6px)' }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
          >
            <ul className="glass-panel-sub w-52 rounded-2xl border border-white/10 p-2">
              {item.children.map((c) => (
                <li key={c.to}>
                  <Link
                    to={c.to}
                    onClick={onNavigate}
                    className="block rounded-xl px-4 py-3 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-accent"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

// Supports both a plain dropdown ("Pages") and a link that also opens a
// dropdown of its children ("Services", "Projects").
function Dropdown({ item }) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const active = item.to ? pathname.startsWith(item.to) : item.children.some((c) => c.to === pathname)
  return (
    <li className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {item.to ? (
        <Link
          to={item.to}
          className={`group flex items-center gap-1 px-4 py-2 text-[15px] ${active ? 'text-accent' : 'text-white/80'}`}
          aria-expanded={open}
        >
          <RollingLabel>{item.label}</RollingLabel>
          <ChevronDown className={`size-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
          {active && <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-accent" />}
        </Link>
      ) : (
        <button
          className={`group flex items-center gap-1 px-4 py-2 text-[15px] ${active ? 'text-accent' : 'text-white/80'}`}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <RollingLabel>{item.label}</RollingLabel>
          <ChevronDown className={`size-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </button>
      )}
      <AnimatePresence>
        {open && (
          <motion.ul
            className="glass-panel absolute left-1/2 top-full w-64 -translate-x-1/2 overflow-visible rounded-2xl border border-white/10 p-2"
            initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 4, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
          >
            {item.children.map((c) => (
              <SubItem key={c.label} item={c} onNavigate={() => setOpen(false)} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  )
}

export default function Header() {
  const ready = useReady()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > last && y > 240)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[80]"
        initial={{ y: -120 }}
        animate={{ y: !ready || (hidden && !menuOpen) ? -120 : 0 }}
        transition={{ duration: 0.8, ease: easeOutExpo }}
      >
        <div className={`container-x transition-all duration-500 ${scrolled ? 'pt-3' : 'pt-6'}`}>
          <div className="relative flex items-center justify-between rounded-full px-5 py-3 md:px-6">
            {/* The glass is a sibling layer, not the bar itself: backdrop-filter on
                the bar would make it the backdrop root for the dropdowns inside it,
                and they would end up blurring the bar instead of the page. */}
            <span aria-hidden="true" data-solid={String(scrolled)} className="glass-nav absolute inset-0 rounded-full" />

            <Logo className="relative h-10 md:h-12" />

            <nav className="relative hidden lg:block" aria-label="Main">
              <ul className="flex items-center">
                {nav.map((item) =>
                  item.children ? (
                    <Dropdown key={item.label} item={item} />
                  ) : (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        end={item.to === '/'}
                        className={({ isActive }) => `group relative block px-4 py-2 text-[15px] ${isActive ? 'text-accent' : 'text-white/80'}`}
                      >
                        {({ isActive }) => (
                          <>
                            <RollingLabel>{item.label}</RollingLabel>
                            {isActive && (
                              <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-accent" />
                            )}
                          </>
                        )}
                      </NavLink>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div className="relative flex items-center gap-3">
              <div className="hidden md:block">
                <Button to="/contact" className="!px-5 !py-3 text-sm">Start a Project</Button>
              </div>
              <button
                className="relative z-[95] flex size-12 flex-col items-center justify-center gap-1.5 rounded-full bg-white/5 lg:hidden"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                <motion.span className="h-0.5 w-5 bg-white" animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} />
                <motion.span className="h-0.5 w-5 bg-white" animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
