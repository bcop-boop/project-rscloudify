import { Link } from 'react-router-dom'
import { brand } from '../data/site'

// Client logo, recoloured to the site theme (design unchanged).
export default function Logo({ className = 'h-9', to = '/' }) {
  return (
    <Link to={to} aria-label={`${brand.fullName} — home`} className="inline-flex items-center">
      <img src="/logo.png" alt={brand.fullName} className={`${className} w-auto`} />
    </Link>
  )
}
