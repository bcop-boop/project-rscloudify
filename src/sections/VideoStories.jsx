import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { videoStories, videoStoriesIntro } from '../data/site'
import SectionHeading from '../components/SectionHeading'
import { fadeUpItem, staggerParent } from '../animations/Reveal'
import { initials } from '../lib/text'

// One story card. The clip is silent ambience behind a written quote — it is
// never presented as recorded speech — so there is no sound control to offer.
function StoryCard({ story, index }) {
  const video = useRef(null)

  // Only play while the card is actually on screen: three looping clips running
  // the length of the page is wasted battery on a laptop and worse on a phone.
  useEffect(() => {
    const el = video.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <motion.article
      variants={fadeUpItem}
      style={{ '--i': index }}
      className="beam focus-item group relative aspect-[3/4] overflow-hidden rounded-3xl border border-line bg-ink-3"
    >
      <video
        ref={video}
        src={story.video}
        poster={story.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        className="focus-img absolute inset-0 h-full w-full object-cover group-hover:scale-[1.04]"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/5" />
      <span aria-hidden="true" className="img-sheen" />

      <div className="focus-dim absolute inset-x-0 bottom-0 p-6 md:p-7">
        <span className="glass inline-flex rounded-full border border-white/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-white/80">
          {story.tag}
        </span>
        <p className="mt-5 font-display text-xl font-medium leading-snug md:text-2xl">“{story.quote}”</p>
        <div className="mt-5 flex items-center gap-3 border-t border-white/15 pt-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-ink">
            {initials(story.name)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{story.name}</p>
            <p className="truncate text-xs text-muted">{story.role}</p>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function VideoStories({ heading = true }) {
  return (
    <section className="section">
      <div className="container-x">
        {heading && (
          <SectionHeading eyebrow={videoStoriesIntro.eyebrow} title={videoStoriesIntro.title} text={videoStoriesIntro.text} />
        )}
        <motion.div
          className="focus-grid mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {videoStories.map((story, i) => (
            <StoryCard key={story.id} story={story} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
