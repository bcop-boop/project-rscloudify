import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { brand } from '../data/site'

export const whatsappHref = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(brand.whatsappMessage)}`

// Floating WhatsApp contact button (Changes.txt: "integrate a contact number system, WhatsApp Number")
export default function WhatsAppButton() {
  return (
    <motion.a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`Chat with ${brand.fullName} on WhatsApp`}
      className="group fixed bottom-6 right-6 z-[95] flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-accent to-glow text-ink shadow-[0_10px_30px_-8px_rgba(255,138,30,0.75)] md:bottom-8 md:right-8"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-glow/40" />
      <MessageCircle className="relative size-6 fill-ink" />
    </motion.a>
  )
}
