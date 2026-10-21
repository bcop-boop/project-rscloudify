import SplitText from '../animations/SplitText'
import Reveal from '../animations/Reveal'

export default function SectionHeading({ eyebrow, title, text, align = 'left', className = '', titleClass = '' }) {
  const center = align === 'center'
  return (
    <div className={`${center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}>
      {eyebrow && <Reveal><span className="eyebrow">{eyebrow}</span></Reveal>}
      <SplitText text={title} className={`mt-5 text-4xl font-semibold md:text-6xl ${titleClass}`} />
      {text && (
        <Reveal delay={0.15}>
          <p className={`mt-6 text-lg leading-relaxed text-muted ${center ? 'mx-auto' : ''} max-w-xl`}>{text}</p>
        </Reveal>
      )}
    </div>
  )
}
