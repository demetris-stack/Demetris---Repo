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

interface DemoRow {
  id: string
  title: string
  type: string
  creator: string
  tags: string[]
  duration: string
  date: string
  views: number
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

const MY_DEMOS_ROWS: DemoRow[] = [
  { id: 'r1', title: 'Onboarding Flow Walkthrough', type: 'Walkthrough', creator: 'Alex Morgan', tags: ['Onboarding', 'Product'], duration: '3:42', date: 'May 18, 2026', views: 142 },
  { id: 'r2', title: 'Dashboard Overview', type: 'Demo', creator: 'Jamie Lee', tags: ['Product', 'Sales'], duration: '5:10', date: 'May 15, 2026', views: 98 },
  { id: 'r3', title: 'Analytics Deep Dive', type: 'Tutorial', creator: 'Alex Morgan', tags: ['Product', 'Admin'], duration: '7:23', date: 'May 12, 2026', views: 211 },
  { id: 'r4', title: 'Settings & Permissions', type: 'Demo', creator: 'Sam Rivera', tags: ['Admin', 'Security'], duration: '2:55', date: 'May 10, 2026', views: 57 },
  { id: 'r5', title: 'Integrations Setup', type: 'Walkthrough', creator: 'Taylor Kim', tags: ['API', 'Onboarding'], duration: '4:18', date: 'May 7, 2026', views: 176 },
  { id: 'r6', title: 'Reporting Basics', type: 'Tutorial', creator: 'Jordan Park', tags: ['Sales', 'Product'], duration: '6:04', date: 'May 3, 2026', views: 89 },
  { id: 'r7', title: 'Mobile Walkthrough', type: 'Walkthrough', creator: 'Jamie Lee', tags: ['Mobile', 'Onboarding'], duration: '3:15', date: 'Apr 28, 2026', views: 64 },
  { id: 'r8', title: 'Enterprise Admin Tour', type: 'Presentation', creator: 'Sam Rivera', tags: ['Enterprise', 'Admin'], duration: '9:45', date: 'Apr 22, 2026', views: 130 },
]

const DEMO_LIBRARY_ROWS: DemoRow[] = [
  { id: 'l1', title: 'Product Tour 2026', type: 'Demo', creator: 'Alex Morgan', tags: ['Product', 'Sales'], duration: '8:30', date: 'May 19, 2026', views: 304 },
  { id: 'l2', title: 'Security & Compliance', type: 'Presentation', creator: 'Taylor Kim', tags: ['Security', 'Enterprise'], duration: '4:45', date: 'May 17, 2026', views: 187 },
  { id: 'l3', title: 'API Walkthrough', type: 'Walkthrough', creator: 'Jordan Park', tags: ['API'], duration: '6:12', date: 'May 14, 2026', views: 256 },
  { id: 'l4', title: 'Mobile App Demo', type: 'Demo', creator: 'Jamie Lee', tags: ['Mobile', 'Product'], duration: '3:58', date: 'May 11, 2026', views: 143 },
  { id: 'l5', title: 'Enterprise Features', type: 'Presentation', creator: 'Sam Rivera', tags: ['Enterprise', 'Admin'], duration: '9:01', date: 'May 9, 2026', views: 412 },
  { id: 'l6', title: 'Admin Console', type: 'Tutorial', creator: 'Alex Morgan', tags: ['Admin'], duration: '5:33', date: 'May 5, 2026', views: 99 },
  { id: 'l7', title: 'Onboarding Series Pt.1', type: 'Walkthrough', creator: 'Taylor Kim', tags: ['Onboarding', 'Product'], duration: '7:20', date: 'Apr 30, 2026', views: 338 },
  { id: 'l8', title: 'Sales Enablement Kit', type: 'Webinar', creator: 'Jordan Park', tags: ['Sales'], duration: '12:05', date: 'Apr 25, 2026', views: 275 },
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
  const [types, setTypes] = useState<string[]>([])
  const [creators, setCreators] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])

  function toggle(list: string[], setList: (v: string[]) => void, val: string) {
    setList(list.includes(val) ? list.filter((x) => x !== val) : [...list, val])
  }

  function clearAll() { setTypes([]); setCreators([]); setTags([]) }

  const filters = { types, creators, tags }
  const filterActions = {
    toggleType: (v: string) => toggle(types, setTypes, v),
    toggleCreator: (v: string) => toggle(creators, setCreators, v),
    toggleTag: (v: string) => toggle(tags, setTags, v),
    clearAll,
  }

  if (tab === 'my-demos') return (
    <>
      <VideoCarousel title="Recent" videos={MY_DEMOS_VIDEOS} />
      <FilterBar filters={filters} actions={filterActions} />
      <DemoTable rows={MY_DEMOS_ROWS} filters={filters} />
    </>
  )
  if (tab === 'demo-library') return (
    <>
      <VideoCarousel title="Recent" videos={DEMO_LIBRARY_VIDEOS} />
      <FilterBar filters={filters} actions={filterActions} />
      <DemoTable rows={DEMO_LIBRARY_ROWS} filters={filters} />
    </>
  )
  if (tab === 'favorites') return <div className={styles.empty}><p>No favorites yet.</p></div>
  return <div className={styles.empty}><p>No promoted content.</p></div>
}

interface Filters { types: string[]; creators: string[]; tags: string[] }
interface FilterActions {
  toggleType: (v: string) => void
  toggleCreator: (v: string) => void
  toggleTag: (v: string) => void
  clearAll: () => void
}

function FilterBar({ filters, actions }: { filters: Filters; actions: FilterActions }) {
  const { types, creators, tags } = filters
  const totalApplied = types.length + creators.length + tags.length

  const appliedGroups = [
    { label: 'Type', values: types, onToggle: actions.toggleType },
    { label: 'Creator', values: creators, onToggle: actions.toggleCreator },
    { label: 'Tags', values: tags, onToggle: actions.toggleTag },
  ]

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterLeft}>
        <AppliedFiltersDropdown totalApplied={totalApplied} groups={appliedGroups} onClearAll={actions.clearAll} />
        <FilterDropdown label="Type" icon={<CircleIcon />} options={TYPE_OPTIONS} selected={types} onToggle={actions.toggleType} />
        <FilterDropdown label="Creator" icon={<PersonIcon />} options={CREATOR_OPTIONS} selected={creators} onToggle={actions.toggleCreator} />
        <FilterDropdown label="Tags" icon={<TagIcon />} options={TAG_OPTIONS} selected={tags} onToggle={actions.toggleTag} />
        <button className={styles.filterBtn}><FunnelIcon />All Filters</button>
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

function DemoTable({ rows, filters }: { rows: DemoRow[]; filters: Filters }) {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = rows.filter((r) => {
    if (filters.types.length > 0 && !filters.types.includes(r.type)) return false
    if (filters.creators.length > 0 && !filters.creators.includes(r.creator)) return false
    if (filters.tags.length > 0 && !filters.tags.some((t) => r.tags.includes(t))) return false
    return true
  })

  const allSelected = filtered.length > 0 && filtered.every((r) => selected.has(r.id))
  const someSelected = filtered.some((r) => selected.has(r.id))

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function toggleAll() {
    if (allSelected) {
      setSelected((prev) => {
        const next = new Set(prev)
        filtered.forEach((r) => next.delete(r.id))
        return next
      })
    } else {
      setSelected((prev) => {
        const next = new Set(prev)
        filtered.forEach((r) => next.add(r.id))
        return next
      })
    }
  }

  const selectedCount = filtered.filter((r) => selected.has(r.id)).length

  return (
    <div className={styles.tableSection}>
      {selectedCount > 0 && (
        <div className={styles.selectionBar}>
          <span className={styles.selectionCount}>{selectedCount} selected</span>
          <button className={styles.selectionAction}>Share</button>
          <button className={styles.selectionAction}>Download</button>
          <button className={`${styles.selectionAction} ${styles.selectionDanger}`}
            onClick={() => setSelected(new Set())}>
            Deselect all
          </button>
        </div>
      )}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thCheck}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={allSelected}
                  ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected }}
                  onChange={toggleAll}
                />
              </th>
              <th className={styles.th}>Title</th>
              <th className={styles.th}>Type</th>
              <th className={styles.th}>Creator</th>
              <th className={styles.th}>Tags</th>
              <th className={styles.th}>Duration</th>
              <th className={styles.th}>Views</th>
              <th className={styles.th}>Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className={styles.tableEmpty}>No results match the selected filters.</td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr
                  key={row.id}
                  className={`${styles.tr} ${selected.has(row.id) ? styles.trSelected : ''}`}
                  onClick={() => toggleRow(row.id)}
                >
                  <td className={styles.tdCheck} onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selected.has(row.id)}
                      onChange={() => toggleRow(row.id)}
                    />
                  </td>
                  <td className={styles.td}>
                    <span className={styles.rowTitle}>{row.title}</span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.typeBadge}>{row.type}</span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.creatorName}>{row.creator}</span>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.tagList}>
                      {row.tags.map((t) => (
                        <span key={t} className={styles.tag}>{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className={styles.tdMeta}>{row.duration}</td>
                  <td className={styles.tdMeta}>{row.views.toLocaleString()}</td>
                  <td className={styles.tdMeta}>{row.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

interface AppliedGroup { label: string; values: string[]; onToggle: (v: string) => void }

function AppliedFiltersDropdown({ totalApplied, groups, onClearAll }: { totalApplied: number; groups: AppliedGroup[]; onClearAll: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  const hasAny = totalApplied > 0
  return (
    <div className={styles.dropdownWrap} ref={ref}>
      <button className={`${styles.filterBtn} ${hasAny ? styles.filterBtnActive : ''}`} onClick={() => setOpen((o) => !o)}>
        Applied Filters
        {hasAny && <span className={styles.filterCount}>{totalApplied}</span>}
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 2 }}>
          <path d={open ? 'M2 8l4-4 4 4' : 'M2 4l4 4 4-4'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div className={styles.dropdown} style={{ minWidth: 240 }}>
          {!hasAny ? (
            <p className={styles.appliedEmpty}>No filters applied</p>
          ) : (
            <>
              {groups.map((group) => group.values.length > 0 ? (
                <div key={group.label} className={styles.appliedGroup}>
                  <div className={styles.appliedGroupLabel}>{group.label}</div>
                  {group.values.map((val) => (
                    <div key={val} className={styles.appliedChip}>
                      <span className={styles.appliedChipText}>{val}</span>
                      <button className={styles.appliedChipRemove} onClick={() => group.onToggle(val)}>×</button>
                    </div>
                  ))}
                </div>
              ) : null)}
              <div className={styles.appliedFooter}>
                <button className={styles.clearBtn} onClick={() => { onClearAll(); setOpen(false) }}>Clear all filters</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

interface FilterDropdownProps { label: string; icon: React.ReactNode; options: string[]; selected: string[]; onToggle: (val: string) => void }

function FilterDropdown({ label, icon, options, selected, onToggle }: FilterDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  return (
    <div className={styles.dropdownWrap} ref={ref}>
      <button className={`${styles.filterBtn} ${selected.length > 0 ? styles.filterBtnActive : ''}`} onClick={() => setOpen((o) => !o)}>
        {icon}{label}
        {selected.length > 0 && <span className={styles.filterCount}>{selected.length}</span>}
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 2 }}>
          <path d={open ? 'M2 8l4-4 4 4' : 'M2 4l4 4 4-4'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div className={styles.dropdown}>
          {options.map((opt) => (
            <label key={opt} className={styles.dropdownItem}>
              <input type="checkbox" className={styles.checkbox} checked={selected.includes(opt)} onChange={() => onToggle(opt)} />
              <span className={styles.dropdownLabel}>{opt}</span>
            </label>
          ))}
          {selected.length > 0 && <button className={styles.clearBtn} onClick={() => selected.forEach(onToggle)}>Clear</button>}
        </div>
      )}
    </div>
  )
}

function VideoCarousel({ title, videos }: { title: string; videos: Video[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  function scroll(dir: 'left' | 'right') {
    trackRef.current?.scrollBy({ left: dir === 'right' ? 280 : -280, behavior: 'smooth' })
  }
  return (
    <section className={styles.carousel}>
      <div className={styles.carouselHeader}>
        <h2 className={styles.carouselTitle}>{title}</h2>
        <div className={styles.carouselControls}>
          <button className={styles.arrowBtn} onClick={() => scroll('left')}>‹</button>
          <button className={styles.arrowBtn} onClick={() => scroll('right')}>›</button>
        </div>
      </div>
      <div className={styles.carouselTrack} ref={trackRef}>
        {videos.map((v) => <VideoCard key={v.id} video={v} />)}
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
          {[...Array(5)].map((_, i) => <div key={i} className={styles.navItem} />)}
        </nav>
      </div>
      <div className={styles.sidebarBottom}>
        {[...Array(3)].map((_, i) => <div key={i} className={styles.navItem} />)}
      </div>
    </aside>
  )
}

function CircleIcon() {
  return <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4"/><circle cx="7" cy="7" r="2.5" fill="currentColor"/></svg>
}
function PersonIcon() {
  return <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M2 12c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
}
function TagIcon() {
  return <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M1 1h6l6 6-6 6-6-6V1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><circle cx="4.5" cy="4.5" r="1" fill="currentColor"/></svg>
}
function FunnelIcon() {
  return <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
}
