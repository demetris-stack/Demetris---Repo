import { Link } from 'react-router-dom'
import styles from './AnalyticsPage.module.css'

export default function AnalyticsPage() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.breadcrumb}>
          <Link to="/menu" className={styles.breadcrumbLink}>Summary</Link>
        </div>
        <h1 className={styles.title}>Analytics</h1>
        <div className={styles.content} />
      </main>
    </div>
  )
}

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarTop}>
        <div className={styles.logo}>
          <svg width="30" height="30" viewBox="0 0 28 28" fill="none">
            <path d="M14 2L26 8.5V19.5L14 26L2 19.5V8.5L14 2Z" stroke="#333" strokeWidth="1.5" fill="none" />
            <path d="M14 2L14 26M2 8.5L26 8.5M2 19.5L26 19.5" stroke="#333" strokeWidth="1" opacity="0.4" />
          </svg>
        </div>
        <nav className={styles.sidebarNav}>
          {[...Array(5)].map((_, i) => <div key={i} className={styles.navItem} />)}
        </nav>
      </div>
      <div className={styles.sidebarBottom}>
        {[...Array(3)].map((_, i) => <div key={i} className={styles.navItem} />)}
      </div>
    </aside>
  )
}
