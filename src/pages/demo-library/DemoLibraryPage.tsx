import { useState, useRef, useEffect } from 'react'
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
  { id: 'v1', title: 'Onboarding Flow Walkthrough', duration: '3:42', date: 'May 18', thumb: '#d1d5db' },
  { id: 'v2', title: 'Dashboard Overview', duration: '5:10', date: 'May 15', thumb: '#c4c9d4' },
  { id: 'v3', title: 'Analytics Deep Dive', duration: '7:23', date: 'May 12', thumb: '#d1d5db' },
  { id: 'v4', title: 'Settings & Permissions', duration: '2:55', date: 'May 10', thumb: '#c4c9d4' },
  { id: 'v5', title: 'Integrations Setup', duration: '4:18', date: 'May 7', thumb: '#d1d5db' },
  { id: 'v6', title: 'Reporting Basics', duration: '6:04', date: 'May 3', thumb: '#c4c9d4' },
]

const DEMO_LIBRARY_VIDEOS: Video[] = [
  { id: 'l1', title: 'Product Tour 2026', duration: '8:30', date: 'May 19', thumb: '#d1d5db' },
  { id: 'l2', title: 'Security & Compliance', duration: '4:45', date: 'May 17', thumb: '#c4c9d4' },
  { id: 'l3', title: 'API Walkthrough', duration: '6:12', date: 'May 14', thumb: '#d1d5db' },
  { id: 'l4', title: 'Mobile App Demo', duration: '3:58', date: 'May 11', thumb: '#c4c9d4' },
  { id: 'l5', title: 'Enterprise Features', duration: '9:01', date: 'May 9', thumb: '#d1d5db' },
  { id: 'l6', title: 'Admin Console', duration: '5:33', date: 'May 5', thumb: '#c4c9d4' },
]

const TYPE_OPTIONS = ['Demo', 'Walkthrough', 'Tutorial', 'Presentation', 'Webinar']
const CREATOR_OPTIONS = ['Alex Morgan', 'Jamie Lee', 'Sam Rivera', 'Taylor Kim', 'Jordan Park']
const TAG_OPTIONS = ['Onboarding', 'Product', 'Sales', 'API', 'Security', 'Mobile', 'Enterprise', 'Admin']

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
    return <>
      <VideoCarousel title="Recent" videos={MY_DEMOS_VIDEOS} />
      <FilterBar />
    </>
  }
  if (tab === 'demo-library') {
    return <>
      <VideoCarousel title="Recent" videos={DEMO_LIBRARY_VIDEOS} />
      <FilterBar />
    </>
  }
  if (tab === 'favorites') {
    return <div className={styles.empty}><p>No favorites yet.</p></div>
  }
  return <div className={styles.empty}><p>No promoted content.</p></div>
}

function FilterBar() {
  const [types, setTypes] = useState<string[]>([])
  const [creators, setCreators] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])

  const totalApplied = types.length + creators.length + tags.length

  function clearAll() {
    setTypes([])
    setCreators([])
    setTags([])
  }

  function toggle(list: string[], setList: (v: string[]) => void, val: string) {
    setList(list.includes(val) ? list.filter((x) => x !== val) : [...list, val])
  }

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterLeft}>
        <button
          className={`${styles.filterBtn} ${totalApplied > 0 ? styles.filterBtnActive : ''}`}
          onClick={clearAll}
          title="Clear all filters"
        >
          Applied Filters
          {totalApplied > 0 && <span className={styles.filterCount}>{totalApplied}</span>}
        </button>

        <FilterDropdown
          label="Type"
          icon={<CircleIcon />}
          options={TYPE_OPTIONS}
          selected={types}
          onToggle={(v) => toggle(types, setTypes, v)}
        />

        <FilterDropdown
          label="Creator"
          icon={<PersonIcon />}
          options={CREATOR_OPTIONS}
          selected={creators}
          onToggle={(v) => toggle(creators, setCreators, v)}
        />

        <FilterDropdown
          label="Tags"
          icon={<TagIcon />}
          options={TAG_OPTIONS}
          selected={tags}
          onToggle={(v) => toggle(tags, setTags, v)}
        />

        <button className={styles.filterBtn}>
          <FunnelIcon />
          All Filters
        </button>
      </div>

      <div className={styles.filterRight}>
        <div className={styles.comboPill}>
          <div className={styles.comboSearch}>
            <input className={styles.searchInput} type="text" placeholder="" />
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className={styles.comboChevron}>
              <path d="M3 5l4 4 4-4" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.comboDivider} />
          <button className={styles.comboEvery}>
            Everywhere
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M3 5l4 4 4-4" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

interface FilterDropdownProps {
  label: string
  icon: React.ReactNode
  options: string[]
  selected: string[]
  onToggle: (val: string) => void
}

function FilterDropdown({ label, icon, options, selected, onToggle }: FilterDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className={styles.dropdownWrap} ref={ref}>
      <button
        className={`${styles.filterBtn} ${selected.length > 0 ? styles.filterBtnActive : ''}`}
        onClick={() => setOpen((o) => !o)}
      >
        {icon}
        {label}
        {selected.length > 0 && <span className={styles.filterCount}>{selected.length}</span>}
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 2 }}>
          <path d={open ? 'M2 8l4-4 4 4' : 'M2 4l4 4 4-4'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div className={styles.dropdown}>
          {options.map((opt) => (
            <label key={opt} className={styles.dropdownItem}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={selected.includes(opt)}
                onChange={() => onToggle(opt)}
              />
              <span className={styles.dropdownLabel}>{opt}</span>
            </label>
          ))}
          {selected.length > 0 && (
            <button className={styles.clearBtn} onClick={() => selected.forEach(onToggle)}>
              Clear
            </button>
          )}
        </div>
      )}
    </div>
  )
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

function CircleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="7" cy="7" r="2.5" fill="currentColor"/>
    </svg>
  )
}

function PersonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M2 12c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

function TagIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <path d="M1 1h6l6 6-6 6-6-6V1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <circle cx="4.5" cy="4.5" r="1" fill="currentColor"/>
    </svg>
  )
}

function FunnelIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}
