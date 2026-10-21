// Infinite CSS marquee: content is rendered twice and the track slides by -50%.
export default function Marquee({ children, duration = 30, reverse = false, className = '', pauseOnHover = true }) {
  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <div
        className={`flex w-max shrink-0 animate-marquee ${pauseOnHover ? 'marquee-track' : ''}`}
        style={{ '--marquee-duration': `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}
