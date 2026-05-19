import { Link } from 'react-router-dom'
import styles from './DemoLibraryPage.module.css'

export default function DemoLibraryPage() {
  return (
    <div className={styles.page}>
      <Link to="/menu" className={styles.back}>← Back to Menu</Link>
      <h1 className={styles.title}>Demo Library Filtering</h1>
      <p className={styles.subtitle}>Coming soon</p>
    </div>
  )
}
