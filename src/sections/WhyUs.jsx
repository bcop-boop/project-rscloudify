import { motion } from 'framer-motion'
import { whyUs } from '../data/site'
import Icon from '../components/Icon'
import SectionHeading from '../components/SectionHeading'
import { fadeUpItem, staggerParent } from '../animations/Reveal'

// WHY RS CLOUDIFY SOLUTIONS
export default function WhyUs() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow={whyUs.eyebrow} title={whyUs.title} />
        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {whyUs.items.map((v, i) => (
            <motion.article
              key={v.title}
              variants={fadeUpItem}
              style={{ '--i': i }}
              className="beam group relative overflow-hidden rounded-3xl border border-line bg-ink-2 p-8"
            >
              {/* background image fades in on hover */}
              <img
                src={v.image}
                alt=""
                loading="lazy"
                className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100 group-hover:opacity-70"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/25 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              <span className="relative flex size-14 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-ink">
                <Icon name={v.icon} className="size-6" strokeWidth={1.5} />
              </span>
              <h3 className="relative mt-10 text-2xl font-semibold">{v.title}</h3>
              <p className="relative mt-3 leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/85">{v.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
