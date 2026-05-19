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
  theme: string
  published: string
  creator: string
  creatorInitials: string
  creatorColor: string
  tags: string[]
  freshness: number
  usage: number
  created: string
  modified: string
  duration: string
  folder: string
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
  { id: 'r1', title: 'Onboarding Flow Walkthrough', type: 'Sim', theme: '', published: '', creator: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['onboarding', 'product', 'getting-started'], freshness: 6, usage: 142, created: '04/18/26', modified: '05/10/26', duration: '3:42', folder: 'Onboarding' },
  { id: 'r2', title: 'Dashboard Overview', type: 'Video', theme: '', published: '', creator: 'Jamie', creatorInitials: 'JL', creatorColor: '#1d4ed8', tags: ['product', 'sales'], freshness: 4, usage: 98, created: '03/22/26', modified: '04/30/26', duration: '5:10', folder: 'Product' },
  { id: 'r3', title: 'Analytics Deep Dive', type: 'Sim', theme: '', published: '', creator: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['product', 'admin', 'reporting'], freshness: 3, usage: 211, created: '03/14/26', modified: '05/01/26', duration: '7:23', folder: 'Product' },
  { id: 'r4', title: 'Settings & Permissions', type: 'Tour', theme: '', published: '', creator: 'Sam', creatorInitials: 'SR', creatorColor: '#7c3aed', tags: ['admin', 'security'], freshness: 8, usage: 57, created: '04/05/26', modified: '05/08/26', duration: '2:55', folder: 'Engineering' },
  { id: 'r5', title: 'Integrations Setup', type: 'Sim', theme: '', published: '', creator: 'Taylor', creatorInitials: 'TK', creatorColor: '#0369a1', tags: ['api', 'onboarding'], freshness: 12, usage: 176, created: '02/28/26', modified: '04/15/26', duration: '4:18', folder: 'Engineering' },
  { id: 'r6', title: 'Reporting Basics', type: 'Video', theme: '', published: '', creator: 'Jordan', creatorInitials: 'JP', creatorColor: '#b45309', tags: ['sales', 'product'], freshness: 5, usage: 89, created: '03/10/26', modified: '04/22/26', duration: '6:04', folder: 'Sales Enablement' },
  { id: 'r7', title: 'Mobile Walkthrough', type: 'Tour', theme: '', published: '', creator: 'Jamie', creatorInitials: 'JL', creatorColor: '#1d4ed8', tags: ['mobile', 'onboarding'], freshness: 9, usage: 64, created: '02/14/26', modified: '03/30/26', duration: '3:15', folder: 'Onboarding' },
  { id: 'r8', title: 'Enterprise Admin Tour', type: 'Presentation', theme: '', published: '', creator: 'Sam', creatorInitials: 'SR', creatorColor: '#7c3aed', tags: ['enterprise', 'admin'], freshness: 2, usage: 130, created: '01/20/26', modified: '03/15/26', duration: '9:45', folder: 'Sales Enablement' },
]

const DEMO_LIBRARY_ROWS: DemoRow[] = [
  { id: 'l1', title: 'Product Tour 2026', type: 'Demo', theme: '', published: '', creator: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['product', 'sales'], freshness: 7, usage: 304, created: '05/01/26', modified: '05/18/26', duration: '8:30', folder: 'Global Library' },
  { id: 'l2', title: 'Security & Compliance', type: 'Presentation', theme: '', published: '', creator: 'Taylor', creatorInitials: 'TK', creatorColor: '#0369a1', tags: ['security', 'enterprise', 'compliance'], freshness: 4, usage: 187, created: '04/22/26', modified: '05/12/26', duration: '4:45', folder: 'Engineering' },
  { id: 'l3', title: 'API Walkthrough', type: 'Walkthrough', theme: '', published: '', creator: 'Jordan', creatorInitials: 'JP', creatorColor: '#b45309', tags: ['api'], freshness: 11, usage: 256, created: '04/10/26', modified: '05/05/26', duration: '6:12', folder: 'Engineering' },
  { id: 'l4', title: 'Mobile App Demo', type: 'Demo', theme: '', published: '', creator: 'Jamie', creatorInitials: 'JL', creatorColor: '#1d4ed8', tags: ['mobile', 'product'], freshness: 6, usage: 143, created: '03/30/26', modified: '04/28/26', duration: '3:58', folder: 'Marketing' },
  { id: 'l5', title: 'Enterprise Features', type: 'Presentation', theme: '', published: '', creator: 'Sam', creatorInitials: 'SR', creatorColor: '#7c3aed', tags: ['enterprise', 'admin'], freshness: 3, usage: 412, created: '03/15/26', modified: '05/10/26', duration: '9:01', folder: 'Sales' },
  { id: 'l6', title: 'Admin Console', type: 'Sim', theme: '', published: '', creator: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['admin'], freshness: 8, usage: 99, created: '02/20/26', modified: '04/05/26', duration: '5:33', folder: 'Engineering' },
  { id: 'l7', title: 'Onboarding Series Pt.1', type: 'Walkthrough', theme: '', published: '', creator: 'Taylor', creatorInitials: 'TK', creatorColor: '#0369a1', tags: ['onboarding', 'product'], freshness: 5, usage: 338, created: '02/01/26', modified: '03/20/26', duration: '7:20', folder: 'Global Library' },
  { id: 'l8', title: 'Sales Enablement Kit', type: 'Webinar', theme: '', published: '', creator: 'Jordan', creatorInitials: 'JP', creatorColor: '#b45309', tags: ['sales'], freshness: 14, usage: 275, created: '01/15/26', modified: '03/01/26', duration: '12:05', folder: 'Sales' },
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
  const [searchQuery, setSearchQuery] = useState('')
  const [searchScope, setSearchScope] = useState<SearchScope>('everywhere')

  function toggle(list: string[], setList: (v: string[]) => void, val: string) {
    setList(list.includes(val) ? list.filter((x) => x !== val) : [...list, val])
  }

  function clearAll() { setTypes([]); setCreators([]); setTags([]); setSearchQuery(''); setSearchScope('everywhere') }

  const filters = { types, creators, tags, searchQuery, searchScope }
  const filterActions = {
    toggleType: (v: string) => toggle(types, setTypes, v),
    toggleCreator: (v: string) => toggle(creators, setCreators, v),
    toggleTag: (v: string) => toggle(tags, setTags, v),
    clearAll,
    setSearch: setSearchQuery,
    setScope: setSearchScope,
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

type SearchScope = 'everywhere' | 'in-folder'
interface Filters { types: string[]; creators: string[]; tags: string[]; searchQuery: string; searchScope: SearchScope }
interface FilterActions {
  toggleType: (v: string) => void
  toggleCreator: (v: string) => void
  toggleTag: (v: string) => void
  clearAll: () => void
  setSearch: (v: string) => void
  setScope: (v: SearchScope) => void
}

const SCOPE_OPTIONS: { value: SearchScope; label: string }[] = [
  { value: 'everywhere', label: 'Everywhere' },
  { value: 'in-folder', label: 'In Folder' },
]

function FilterBar({ filters, actions }: { filters: Filters; actions: FilterActions }) {
  const { types, creators, tags, searchQuery, searchScope } = filters
  const totalApplied = types.length + creators.length + tags.length
  const [scopeOpen, setScopeOpen] = useState(false)
  const scopeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function h(e: MouseEvent) { if (scopeRef.current && !scopeRef.current.contains(e.target as Node)) setScopeOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const appliedGroups = [
    { label: 'Type', values: types, onToggle: actions.toggleType },
    { label: 'Creator', values: creators, onToggle: actions.toggleCreator },
    { label: 'Tags', values: tags, onToggle: actions.toggleTag },
  ]

  const scopeLabel = SCOPE_OPTIONS.find((o) => o.value === searchScope)?.label ?? 'Everywhere'

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
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className={styles.searchIcon}>
              <circle cx="6" cy="6" r="4.5" stroke="#9ca3af" strokeWidth="1.4"/>
              <path d="M9.5 9.5l2.5 2.5" stroke="#9ca3af" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search…"
              value={searchQuery}
              onChange={(e) => actions.setSearch(e.target.value)}
            />
            {searchQuery && (
              <button className={styles.searchClear} onClick={() => actions.setSearch('')}>✕</button>
            )}
          </div>
          <div className={styles.comboDivider} />
          <div className={styles.scopeWrap} ref={scopeRef}>
            <button
              className={`${styles.comboEvery} ${searchScope !== 'everywhere' ? styles.comboEveryActive : ''}`}
              onClick={() => setScopeOpen((o) => !o)}
            >
              {scopeLabel}
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d={scopeOpen ? 'M3 9l4-4 4 4' : 'M3 5l4 4 4-4'} stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {scopeOpen && (
              <div className={styles.scopeDropdown}>
                {SCOPE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    className={`${styles.scopeOption} ${searchScope === opt.value ? styles.scopeOptionActive : ''}`}
                    onClick={() => { actions.setScope(opt.value); setScopeOpen(false) }}
                  >
                    {opt.label}
                    {searchScope === opt.value && (
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" style={{ marginLeft: 'auto' }}>
                        <path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function DemoTable({ rows, filters }: { rows: DemoRow[]; filters: Filters }) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [favorited, setFavorited] = useState<Set<string>>(new Set())
  const [starred, setStarred] = useState<Set<string>>(new Set())
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)

  const q = filters.searchQuery.toLowerCase().trim()

  const filtered = rows.filter((r) => {
    if (filters.types.length > 0 && !filters.types.includes(r.type)) return false
    if (filters.creators.length > 0 && !filters.creators.includes(r.creator)) return false
    if (filters.tags.length > 0 && !filters.tags.some((t) => r.tags.includes(t.toLowerCase()))) return false
    if (q) {
      const haystack = filters.searchScope === 'in-folder'
        ? r.folder.toLowerCase()
        : [r.title, r.type, r.creator, r.folder, ...r.tags].join(' ').toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize)

  const allSelected = paginated.length > 0 && paginated.every((r) => selected.has(r.id))
  const someSelected = paginated.some((r) => selected.has(r.id))

  function toggleRow(id: string) {
    setSelected((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }
  function toggleAll() {
    if (allSelected) {
      setSelected((prev) => { const n = new Set(prev); paginated.forEach((r) => n.delete(r.id)); return n })
    } else {
      setSelected((prev) => { const n = new Set(prev); paginated.forEach((r) => n.add(r.id)); return n })
    }
  }
  function toggleFav(id: string, e: React.MouseEvent) {
    e.stopPropagation()
    setFavorited((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }
  function toggleStar(id: string, e: React.MouseEvent) {
    e.stopPropagation()
    setStarred((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  const selectedCount = filtered.filter((r) => selected.has(r.id)).length

  const MAX_VISIBLE_TAGS = 2

  const pageNumbers: (number | '…')[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - safePage) <= 1) pageNumbers.push(i)
    else if (pageNumbers[pageNumbers.length - 1] !== '…') pageNumbers.push('…')
  }

  return (
    <div className={styles.tableSection}>
      {selectedCount > 0 && (
        <div className={styles.floatingBar}>
          <span className={styles.floatingCount}>{selectedCount}</span>
          <span className={styles.floatingLabel}>Selected</span>
          <div className={styles.floatingDivider} />
          <button className={styles.floatingBtn}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 14s-6-4.35-6-8a4 4 0 0 1 8 0c0 .34-.04.67-.1 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M14 10c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4z" stroke="currentColor" strokeWidth="1.4"/><path d="M10 8v4M8 10h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            Favorite
          </button>
          <button className={styles.floatingBtn}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 2h8l4 4-6 6-6-6V2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><circle cx="5.5" cy="5.5" r="1" fill="currentColor"/></svg>
            Tag
          </button>
          <button className={styles.floatingBtn}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M5 14h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M8 12v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            Create DemoBoard
          </button>
          <button className={styles.floatingBtn}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 3l3 3-3 3M6 13l-3-3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 6H9a4 4 0 0 0-4 4v0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            Public Link
          </button>
          <div className={styles.floatingDivider} />
          <button className={`${styles.floatingBtn} ${styles.floatingDanger}`}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 5h10M6 5V3h4v2M13 5l-1 8H4L3 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Delete
          </button>
          <button className={styles.floatingClose} onClick={() => setSelected(new Set())}>✕</button>
        </div>
      )}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thCheck}>
                <input type="checkbox" className={styles.checkbox} checked={allSelected}
                  ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected }}
                  onChange={toggleAll} />
              </th>
              <th className={styles.thIcon} />
              <th className={styles.thIcon} />
              <th className={styles.thIcon} />
              <th className={styles.th}>Title</th>
              <th className={styles.th}>Folder</th>
              <th className={styles.th}>Type</th>
              <th className={styles.th}>Theme</th>
              <th className={styles.th}>Published</th>
              <th className={styles.th}>Tags</th>
              <th className={styles.th}>Freshness</th>
              <th className={styles.th}>Usage</th>
              <th className={styles.th}>Created ↓</th>
              <th className={styles.th}>Modified</th>
              <th className={styles.th}>Creator</th>
              <th className={styles.th}>Duration</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr><td colSpan={16} className={styles.tableEmpty}>No results match the selected filters.</td></tr>
            ) : (
              paginated.map((row) => {
                const visibleTags = row.tags.slice(0, MAX_VISIBLE_TAGS)
                const extraTags = row.tags.length - MAX_VISIBLE_TAGS
                return (
                  <tr key={row.id} className={`${styles.tr} ${selected.has(row.id) ? styles.trSelected : ''}`} onClick={() => toggleRow(row.id)}>
                    <td className={styles.tdCheck} onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" className={styles.checkbox} checked={selected.has(row.id)} onChange={() => toggleRow(row.id)} />
                    </td>
                    <td className={styles.tdIcon} onClick={(e) => toggleFav(row.id, e)}>
                      <span className={`${styles.iconBtn} ${favorited.has(row.id) ? styles.iconBtnActive : ''}`}>♥</span>
                    </td>
                    <td className={styles.tdIcon} onClick={(e) => toggleStar(row.id, e)}>
                      <span className={`${styles.iconBtn} ${starred.has(row.id) ? styles.iconBtnStarred : ''}`}>★</span>
                    </td>
                    <td className={styles.tdIcon}>
                      <span className={styles.creatorAvatar} style={{ background: row.creatorColor }}>{row.creatorInitials}</span>
                    </td>
                    <td className={styles.td}><span className={styles.rowTitle}>{row.title}</span></td>
                    <td className={styles.td}>
                      <span className={styles.folderCell}>
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                          <path d="M1 3.5C1 2.67 1.67 2 2.5 2H5.5L7 3.5H11.5C12.33 3.5 13 4.17 13 5V10.5C13 11.33 12.33 12 11.5 12H2.5C1.67 12 1 11.33 1 10.5V3.5Z" stroke="#9ca3af" strokeWidth="1.3" strokeLinejoin="round"/>
                        </svg>
                        {row.folder}
                      </span>
                    </td>
                    <td className={styles.td}><span className={styles.typeBadge}>{row.type}</span></td>
                    <td className={styles.tdMeta}>{row.theme || '—'}</td>
                    <td className={styles.tdMeta}>{row.published || '—'}</td>
                    <td className={styles.td}>
                      <div className={styles.tagList}>
                        {visibleTags.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
                        {extraTags > 0 && <span className={styles.tagExtra}>+{extraTags}</span>}
                      </div>
                    </td>
                    <td className={styles.td}>
                      <div className={styles.freshnessCell}>
                        <div className={styles.freshnessBar}>
                          <div className={styles.freshnessFill} style={{ width: `${Math.min(row.freshness * 6, 100)}%` }} />
                        </div>
                        <span className={styles.freshnessPct}>{row.freshness}%</span>
                      </div>
                    </td>
                    <td className={styles.tdMeta}>{row.usage}</td>
                    <td className={styles.tdMeta}>{row.created}</td>
                    <td className={styles.tdMeta}>{row.modified}</td>
                    <td className={styles.td}>
                      <div className={styles.creatorCell}>
                        <span className={styles.creatorAvatarSm} style={{ background: row.creatorColor }}>{row.creatorInitials}</span>
                        <span className={styles.creatorFirstName}>{row.creator}</span>
                      </div>
                    </td>
                    <td className={styles.tdMeta}>{row.duration}</td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.tableFooter}>
        <div className={styles.footerLeft}>
          <select
            className={styles.pageSizeSelect}
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1) }}
          >
            {[10, 25, 50].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          <span className={styles.footerText}>
            Showing {filtered.length === 0 ? 0 : (safePage - 1) * pageSize + 1}–{Math.min(safePage * pageSize, filtered.length)} of {filtered.length} assets
          </span>
        </div>
        <div className={styles.footerRight}>
          <button className={styles.pageBtn} onClick={() => setPage(1)} disabled={safePage === 1}>«</button>
          <button className={styles.pageBtn} onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={safePage === 1}>‹</button>
          {pageNumbers.map((n, i) =>
            n === '…'
              ? <span key={`ellipsis-${i}`} className={styles.pageEllipsis}>…</span>
              : <button key={n} className={`${styles.pageBtn} ${safePage === n ? styles.pageBtnActive : ''}`} onClick={() => setPage(n)}>{n}</button>
          )}
          <button className={styles.pageBtn} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={safePage === totalPages}>›</button>
          <button className={styles.pageBtn} onClick={() => setPage(totalPages)} disabled={safePage === totalPages}>»</button>
        </div>
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
