import { useState } from 'react'
import styles from './DemoLibraryPage.module.css'

type Tab = 'my-demos' | 'demo-library' | 'favorites' | 'promoted'

const TABS: { id: Tab; label: string }[] = [
  { id: 'my-demos', label: 'My Demos' },
  { id: 'demo-library', label: 'Demo Library' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'promoted', label: 'Promoted Content' },
]

export default function DemoLibraryPage() {
  const [activeTab, setActiveTab] = useState<Tab>('my-demos')

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.breadcrumb}>My Demos</div>

        <div className={styles.topBar}>
          <h1 className={styles.title}>Demo Library</h1>
          <button className={styles.createBtn}>
            Create Demo
            <span className={styles.createPlus}>+</span>
          </button>
        </div>

        <nav className={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className={styles.content}>
          <TabContent tab={activeTab} />
        </div>
      </main>
    </div>
  )
}

function TabContent({ tab }: { tab: Tab }) {
  if (tab === 'my-demos') {
    return (
      <div className={styles.empty}>
        <p>No demos yet.</p>
      </div>
    )
  }
  if (tab === 'demo-library') {
    return <div className={styles.empty}><p>Demo library is empty.</p></div>
  }
  if (tab === 'favorites') {
    return <div className={styles.empty}><p>No favorites yet.</p></div>
  }
  return <div className={styles.empty}><p>No promoted content.</p></div>
}

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarTop}>
        <div className={styles.logo}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 2L26 8.5V19.5L14 26L2 19.5V8.5L14 2Z" stroke="#333" strokeWidth="1.5" fill="none" />
            <path d="M14 2L14 26M2 8.5L26 8.5M2 19.5L26 19.5" stroke="#333" strokeWidth="1" opacity="0.4" />
          </svg>
        </div>
        <nav className={styles.sidebarNav}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className={styles.navItem} />
          ))}
        </nav>
      </div>
      <div className={styles.sidebarBottom}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className={styles.navItem} />
        ))}
      </div>
    </aside>
  )
}
