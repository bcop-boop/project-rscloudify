import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import { brand, nav } from '../data/site'
import { lockScroll } from '../lib/scroll'
import { whatsappHref } from './WhatsAppButton'
import { easeInOutQuart, easeOutExpo } from '../animations/easing'

const links = nav.flatMap((i) => (i.to ? [{ label: i.label, to: i.to }] : i.children.flatMap((c) => (c.children ? c.children : [c]))))

export default function MobileMenu({ open, onClose }) {
  useEffect(() => {
    lockScroll(open)
    return () => lockScroll(false)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[79] flex flex-col bg-ink-2 px-6 pb-10 pt-28 lg:hidden"
          initial={{ clipPath: 'circle(0% at calc(100% - 52px) 52px)' }}
          animate={{ clipPath: 'circle(150% at calc(100% - 52px) 52px)' }}
          exit={{ clipPath: 'circle(0% at calc(100% - 52px) 52px)' }}
          transition={{ duration: 0.8, ease: easeInOutQuart }}
        >
          <nav className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Mobile" data-lenis-prevent>
            <ul>
              {links.map((l, i) => (
                <li key={l.to} className="overflow-hidden border-b border-line">
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.7, delay: 0.2 + i * 0.04, ease: easeOutExpo }}
                  >
                    <Link to={l.to} onClick={onClose} className="flex items-center gap-4 py-3.5 font-display text-2xl font-medium text-white">
                      {l.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>
          <motion.div
            className="mt-8 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.6 } }}
            exit={{ opacity: 0 }}
          >
            <a href={`tel:${brand.phoneIntl.replace(/\s/g, '')}`} className="flex items-center gap-3 text-lg text-white">
              <Phone className="size-5 text-accent" /> {brand.phone}
            </a>
            <a href={whatsappHref} target="_blank" rel="noreferrer noopener" className="flex items-center gap-3 text-lg text-white">
              <MessageCircle className="size-5 text-accent" /> WhatsApp
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
