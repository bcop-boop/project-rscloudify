import { ArrowDown } from 'lucide-react'

// Circular text that spins slowly around an icon
export default function RotatingBadge({ text = 'Scroll to explore • Scroll down • ', className = '', icon: IconCmp = ArrowDown }) {
  return (
    <div className={`relative size-32 md:size-36 ${className}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-spin-slow">
        <defs>
          <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-white text-[9.5px] uppercase tracking-[0.3em]">
          <textPath href="#badge-circle" textLength="236" lengthAdjust="spacing">{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto flex size-12 items-center justify-center rounded-full bg-accent text-ink">
        <IconCmp className="size-5" />
      </span>
    </div>
  )
}
