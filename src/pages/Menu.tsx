import { Link } from 'react-router-dom'
import styles from './Menu.module.css'

interface Project {
  slug: string
  title: string
  description: string
  accent: string
}

const PROJECTS: Project[] = [
  {
    slug: 'analytics',
    title: 'Analytics',
    description: 'Browse and filter a table of accounts with industry, ARR, headcount, and status.',
    accent: '#6366f1',
  },
  {
    slug: 'demo-library',
    title: 'Demo Library Filtering',
    description: 'Coming soon.',
    accent: '#10b981',
  },
]

export default function Menu() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.subtitle}>Select a prototype to open it</p>
      </header>

      <div className={styles.grid}>
        {PROJECTS.map((project) => (
          <Link
            key={project.slug}
            to={`/menu/${project.slug}`}
            className={styles.card}
          >
            <div className={styles.cardAccent} style={{ background: project.accent }} />
            <div className={styles.cardBody}>
              <div className={styles.cardIcon} style={{ background: `${project.accent}18`, color: project.accent }}>
                {project.title[0]}
              </div>
              <div>
                <div className={styles.cardTitle}>{project.title}</div>
                <div className={styles.cardDesc}>{project.description}</div>
              </div>
            </div>
            <div className={styles.cardArrow}>→</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
