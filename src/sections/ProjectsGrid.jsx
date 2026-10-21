import { projects, projectsIntro } from '../data/site'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import Reveal from '../animations/Reveal'
import ProjectCard from './ProjectCard'

// Two-column staggered grid; the right column sits lower for rhythm
export default function ProjectsGrid({ limit, heading = true, showCta = true, exclude }) {
  const items = projects.filter((p) => p.slug !== exclude).slice(0, limit ?? projects.length)
  return (
    <section className="section">
      <div className="container-x">
        {heading && (
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow={projectsIntro.eyebrow} title={projectsIntro.title} text={projectsIntro.text} />
            {showCta && <Reveal><Button to="/projects" variant="outline">View all projects</Button></Reveal>}
          </div>
        )}
        <div className="focus-grid mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {items.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.12} className={i % 2 === 1 ? 'md:mt-28' : ''}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
