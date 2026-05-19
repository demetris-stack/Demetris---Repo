import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './DemoLibraryPage.module.css'

type Tab = 'my-demos' | 'demo-library' | 'favorites' | 'promoted'

const TABS: { id: Tab; label: string }[] = [
  { id: 'my-demos', label: 'My Demos' },
  { id: 'demo-library', label: 'Demo Library' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'promoted', label: 'Promoted Content' },
]

interface Video {
  id: string
  title: string
  duration: string
  date: string
  thumb: string
}

const MY_DEMOS_VIDEOS: Video[] = [
  { id: 'v1', title: 'Onboarding Flow Walkthrough', duration: '3:42', date: 'May 18', thumb: '#6366f1' },
  { id: 'v2', title: 'Dashboard Overview', duration: '5:10', date: 'May 15', thumb: '#8b5cf6' },
  { id: 'v3', title: 'Analytics Deep Dive', duration: '7:23', date: 'May 12', thumb: '#ec4899' },
  { id: 'v4', title: 'Settings & Permissions', duration: '2:55', date: 'May 10', thumb: '#f59e0b' },
  { id: 'v5', title: 'Integrations Setup', duration: '4:18', date: 'May 7', thumb: '#10b981' },
  { id: 'v6', title: 'Reporting Basics', duration: '6:04', date: 'May 3', thumb: '#0ea5e9' },
]

const DEMO_LIBRARY_VIDEOS: Video[] = [
  { id: 'l1', title: 'Product Tour 2026', duration: '8:30', date: 'May 19', thumb: '#14b8a6' },
  { id: 'l2', title: 'Security & Compliance', duration: '4:45', date: 'May 17', thumb: '#ef4444' },
  { id: 'l3', title: 'API Walkthrough', duration: '6:12', date: 'May 14', thumb: '#f97316' },
  { id: 'l4', title: 'Mobile App Demo', duration: '3:58', date: 'May 11', thumb: '#a855f7' },
  { id: 'l5', title: 'Enterprise Features', duration: '9:01', date: 'May 9', thumb: '#6366f1' },
  { id: 'l6', title: 'Admin Console', duration: '5:33', date: 'May 5', thumb: '#84cc16' },
]

export default function DemoLibraryPage() {
  const [activeTab, setActiveTab] = useState<Tab>('my-demos')

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <Link to="/menu" className={styles.backLink}>← Back to Menu</Link>
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
    return <VideoCarousel title="Recent" videos={MY_DEMOS_VIDEOS} />
  }
  if (tab === 'demo-library') {
    return <VideoCarousel title="Recent" videos={DEMO_LIBRARY_VIDEOS} />
  }
  if (tab === 'favorites') {
    return <div className={styles.empty}><p>No favorites yet.</p></div>
  }
  return <div className={styles.empty}><p>No promoted content.</p></div>
}

function VideoCarousel({ title, videos }: { title: string; videos: Video[] }) {
  const trackRef = useRef<HTMLDivElement>(null)

  function scroll(dir: 'left' | 'right') {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'right' ? 280 : -280, behavior: 'smooth' })
  }

  return (
    <section className={styles.carousel}>
      <div className={styles.carouselHeader}>
        <h2 className={styles.carouselTitle}>{title}</h2>
        <div className={styles.carouselControls}>
          <button className={styles.arrowBtn} onClick={() => scroll('left')} aria-label="Scroll left">‹</button>
          <button className={styles.arrowBtn} onClick={() => scroll('right')} aria-label="Scroll right">›</button>
        </div>
      </div>
      <div className={styles.carouselTrack} ref={trackRef}>
        {videos.map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
    </section>
  )
}

function VideoCard({ video }: { video: Video }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardThumb} style={{ background: video.thumb }}>
        <div className={styles.playBtn}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="9" fill="rgba(0,0,0,0.45)" />
            <polygon points="7,5.5 7,12.5 13,9" fill="#fff" />
          </svg>
        </div>
        <div className={styles.duration}>{video.duration}</div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardTitle}>{video.title}</div>
        <div className={styles.cardDate}>{video.date}</div>
      </div>
    </div>
  )
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
