import { useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { hero } from '../data/site'
import { gsap } from '../lib/scroll'

// Full-bleed hero showreel. The clip loops muted in the background; pressing play
// unmutes and restarts it IN PLACE — no modal, no second smaller player.
export default function HeroShowreel() {
  const wrap = useRef(null)
  const frame = useRef(null)
  const video = useRef(null)
  const [playing, setPlaying] = useState(false) // "playing" = playing with sound
  const [failed, setFailed] = useState(false)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        frame.current,
        { clipPath: 'inset(0% 8% 0% 8% round 32px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: wrap.current, start: 'top 85%', end: 'top 10%', scrub: true } },
      )
      gsap.fromTo(
        frame.current.querySelector('.reel-media'),
        { scale: 1.22 },
        { scale: 1, ease: 'none', scrollTrigger: { trigger: wrap.current, start: 'top bottom', end: 'bottom top', scrub: true } },
      )
    }, wrap)
    return () => ctx.revert()
  }, [])

  const toggle = () => {
    const el = video.current
    if (!el) return
    if (playing) {
      el.muted = true // back to the silent background loop, same frame
      el.play().catch(() => {})
      setPlaying(false)
    } else {
      el.muted = false
      el.currentTime = 0
      el.play().catch(() => {})
      setPlaying(true)
    }
  }

  return (
    <div ref={wrap} className="relative mt-20 md:mt-28">
      <div ref={frame} className="relative h-[60vh] overflow-hidden md:h-[88vh]">
        {failed ? (
          <img src={hero.showreel} alt="" className="reel-media absolute inset-0 h-full w-full object-cover" />
        ) : (
          <video
            ref={video}
            className="reel-media absolute inset-0 h-full w-full object-cover"
            src={hero.video}
            poster={hero.videoPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setFailed(true)}
          />
        )}

        {/* Only a soft bottom fade, so the light-blue sky actually reads and the
            band still blends into the dark page. It lifts further while playing. */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-transparent"
          animate={{ opacity: playing ? 0.45 : 1 }}
          transition={{ duration: 0.6 }}
        />

        {!failed && (
          <button
            onClick={toggle}
            aria-label={playing ? 'Mute showreel' : 'Play showreel with sound'}
            className={`group absolute inset-0 m-auto flex size-24 items-center justify-center rounded-full bg-accent text-ink shadow-[0_18px_50px_-12px_rgba(8,9,11,0.7)] ring-1 ring-ink/10 transition-opacity duration-500 md:size-32 ${
              playing ? 'opacity-0 hover:opacity-100 focus-visible:opacity-100' : 'opacity-100'
            }`}
          >
            {!playing && <span className="absolute inset-0 animate-ping rounded-full bg-accent/30" />}
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={playing ? 'pause' : 'play'}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.25 }}
                className="relative"
              >
                {playing ? <Pause className="size-8 fill-current md:size-10" /> : <Play className="size-8 fill-current md:size-10" />}
              </motion.span>
            </AnimatePresence>
          </button>
        )}

        <span className="pointer-events-none absolute bottom-6 left-6 flex items-center gap-3 font-display text-2xl font-semibold [text-shadow:0_2px_18px_rgba(8,9,11,0.55)] md:bottom-10 md:left-10 md:text-4xl">
          Build. Scale. <span className="accent">Evolve.</span>
          <span className="text-white/45">{playing ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}</span>
        </span>
      </div>
    </div>
  )
}
