import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'
import JumpIn from '../animations/JumpIn'
import { useImageMotion } from '../lib/imageMotion'

// Image frame that jumps in softly on first view (JumpIn), pans and zooms slowly
// for as long as it is on screen (.img-motion), catches a sweep of light on hover
// (.img-sheen) and drifts with smoothed scroll parallax (GSAP scrub with lag).
export default function ParallaxImage({ src, alt = '', className = '', speed = 10, delay = 0 }) {
  const wrap = useRef(null)
  const image = useRef(null)
  const motion = useImageMotion()

  useLayoutEffect(() => {
    // travel exactly the extra overflow: speed% of the frame = this % of the taller image
    const travel = (speed * 100) / (100 + speed * 2)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        image.current,
        { yPercent: -travel },
        {
          yPercent: travel,
          ease: 'none',
          force3D: true,
          scrollTrigger: { trigger: wrap.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        },
      )
    }, wrap)
    return () => ctx.revert()
  }, [speed])

  return (
    <JumpIn ref={wrap} delay={delay} className={`group relative overflow-hidden ${className}`}>
      <div className="relative h-full w-full transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
        <div
          ref={image}
          // taller than the frame so the parallax drift never reveals an edge
          className="absolute left-0 w-full will-change-transform"
          style={{ top: `-${speed}%`, height: `${100 + speed * 2}%` }}
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="img-motion absolute inset-0 h-full w-full object-cover"
            style={motion}
          />
        </div>
      </div>
      <span aria-hidden="true" className="img-sheen" />
    </JumpIn>
  )
}
