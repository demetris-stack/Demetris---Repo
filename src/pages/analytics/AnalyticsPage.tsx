import { Link } from 'react-router-dom'
import styles from './AnalyticsPage.module.css'

export default function AnalyticsPage() {
  return (
    <div className={styles.page}>
      <Link to="/menu" className={styles.back}>← Back to Menu</Link>
      <header className={styles.header}>
        <h1 className={styles.title}>Analytics</h1>
      </header>
    </div>
  )
}
