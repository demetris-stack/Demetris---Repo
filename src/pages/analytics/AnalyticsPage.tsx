import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './AnalyticsPage.module.css'

type Tab = 'summary' | 'sales' | 'marketing'

const TABS: { id: Tab; label: string }[] = [
  { id: 'summary', label: 'Summary' },
  { id: 'sales', label: 'Sales' },
  { id: 'marketing', label: 'Marketing' },
]

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('sales')

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.breadcrumb}>
          <Link to="/menu" className={styles.breadcrumbLink}>Summary</Link>
        </div>
        <h1 className={styles.title}>Analytics</h1>

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
          {activeTab === 'sales' && <SalesTab />}
          {activeTab === 'summary' && <EmptyTab label="Summary" />}
          {activeTab === 'marketing' && <EmptyTab label="Marketing" />}
        </div>
      </main>
    </div>
  )
}

function EmptyTab({ label }: { label: string }) {
  return <div className={styles.emptyTab}>{label} analytics coming soon.</div>
}

// ─── Mock Data ────────────────────────────────────────────

const INSIGHTS = [
  { label: 'Total Views', value: '3,842', trend: '+18%', up: true },
  { label: 'Avg Engagement', value: '64%', trend: '+7%', up: true },
  { label: 'Stakeholders Discovered', value: '127', trend: '+23%', up: true },
  { label: 'Total Shares', value: '214', trend: '-4%', up: false },
]

const WEEKLY_VIEWS = [
  { week: 'Mar 24', views: 310 },
  { week: 'Mar 31', views: 470 },
  { week: 'Apr 7', views: 395 },
  { week: 'Apr 14', views: 520 },
  { week: 'Apr 21', views: 610 },
  { week: 'Apr 28', views: 480 },
  { week: 'May 5', views: 740 },
  { week: 'May 12', views: 680 },
]

const WEEKLY_ENGAGEMENT = [
  { week: 'Mar 24', pct: 52 },
  { week: 'Mar 31', pct: 58 },
  { week: 'Apr 7', pct: 55 },
  { week: 'Apr 14', pct: 61 },
  { week: 'Apr 21', pct: 67 },
  { week: 'Apr 28', pct: 63 },
  { week: 'May 5', pct: 72 },
  { week: 'May 12', pct: 69 },
]

interface Persona {
  id: string
  initials: string
  color: string
  name: string
  title: string
  company: string
  role: string
  engagement: number
  lastActive: string
}

const BUYER_GROUP: Persona[] = [
  { id: 'p1', initials: 'MR', color: '#6366f1', name: 'Maya Rodriguez', title: 'VP of Sales', company: 'Acme Corp', role: 'Champion', engagement: 88, lastActive: 'May 18' },
  { id: 'p2', initials: 'TK', color: '#10b981', name: 'Tom Keane', title: 'CFO', company: 'Acme Corp', role: 'Economic Buyer', engagement: 71, lastActive: 'May 15' },
  { id: 'p3', initials: 'SL', color: '#f59e0b', name: 'Sara Lin', title: 'Head of Ops', company: 'Acme Corp', role: 'Influencer', engagement: 64, lastActive: 'May 12' },
  { id: 'p4', initials: 'DJ', color: '#0ea5e9', name: 'Dan Jacobs', title: 'Sales Manager', company: 'Acme Corp', role: 'End User', engagement: 45, lastActive: 'May 10' },
  { id: 'p5', initials: 'PW', color: '#ec4899', name: 'Priya Wang', title: 'Legal Counsel', company: 'Acme Corp', role: 'Blocker', engagement: 22, lastActive: 'Apr 30' },
  { id: 'p6', initials: 'JM', color: '#8b5cf6', name: 'James Monroe', title: 'Director of IT', company: 'Acme Corp', role: 'Influencer', engagement: 59, lastActive: 'May 8' },
  { id: 'p7', initials: 'AC', color: '#14b8a6', name: 'Anna Chen', title: 'Product Manager', company: 'Acme Corp', role: 'End User', engagement: 76, lastActive: 'May 14' },
  { id: 'p8', initials: 'RB', color: '#f97316', name: 'Ryan Brooks', title: 'CTO', company: 'Acme Corp', role: 'Economic Buyer', engagement: 83, lastActive: 'May 16' },
]

type AccountSortKey = 'name' | 'contacts' | 'lastViewed' | 'engagement' | 'stage'

interface AccountRow {
  id: string
  name: string
  contacts: number
  lastViewed: string
  engagement: number
  stage: string
}

const ACCOUNT_ROWS: AccountRow[] = [
  { id: 'a1', name: 'Acme Corp', contacts: 5, lastViewed: '2026-05-18', engagement: 88, stage: 'Proposal' },
  { id: 'a2', name: 'Globex Industries', contacts: 3, lastViewed: '2026-05-16', engagement: 74, stage: 'Discovery' },
  { id: 'a3', name: 'Initech Solutions', contacts: 7, lastViewed: '2026-05-14', engagement: 61, stage: 'Negotiation' },
  { id: 'a4', name: 'Umbrella Ventures', contacts: 2, lastViewed: '2026-05-12', engagement: 49, stage: 'Prospecting' },
  { id: 'a5', name: 'Hooli Technologies', contacts: 4, lastViewed: '2026-05-10', engagement: 83, stage: 'Closed Won' },
  { id: 'a6', name: 'Pied Piper Inc', contacts: 6, lastViewed: '2026-05-08', engagement: 57, stage: 'Discovery' },
  { id: 'a7', name: 'Dunder Mifflin', contacts: 3, lastViewed: '2026-05-05', engagement: 38, stage: 'Prospecting' },
  { id: 'a8', name: 'Vandelay Industries', contacts: 5, lastViewed: '2026-05-02', engagement: 66, stage: 'Proposal' },
]

// ─── Sales Tab ────────────────────────────────────────────

function SalesTab() {
  return (
    <div className={styles.salesTab}>
      <InsightsRow />
      <ChartsRow />
      <div className={styles.tablesRow}>
        <BuyerGroup />
        <AccountTable />
      </div>
    </div>
  )
}

// ─── Insights Row ─────────────────────────────────────────

function InsightsRow() {
  return (
    <div className={styles.insightsRow}>
      {INSIGHTS.map((item) => (
        <div key={item.label} className={styles.statCard}>
          <div className={styles.statLabel}>{item.label}</div>
          <div className={styles.statValue}>{item.value}</div>
          <div className={`${styles.statTrend} ${item.up ? styles.trendUp : styles.trendDown}`}>
            {item.up ? '↑' : '↓'} {item.trend} vs last month
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Charts Row ───────────────────────────────────────────

function ChartsRow() {
  return (
    <div className={styles.chartsRow}>
      <ViewsBarChart />
      <EngagementLineChart />
    </div>
  )
}

function ViewsBarChart() {
  const W = 420
  const H = 180
  const padL = 36
  const padB = 28
  const padR = 12
  const padT = 12
  const chartW = W - padL - padR
  const chartH = H - padB - padT
  const maxVal = Math.max(...WEEKLY_VIEWS.map((d) => d.views))
  const barW = (chartW / WEEKLY_VIEWS.length) * 0.55
  const gap = chartW / WEEKLY_VIEWS.length

  return (
    <div className={styles.chartCard}>
      <div className={styles.chartTitle}>Views per Week</div>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.chartSvg}>
        {/* Y-axis guide lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
          const y = padT + chartH * (1 - frac)
          return (
            <g key={frac}>
              <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#f3f4f6" strokeWidth="1" />
              <text x={padL - 4} y={y + 4} textAnchor="end" fontSize="9" fill="#9ca3af">
                {Math.round(maxVal * frac)}
              </text>
            </g>
          )
        })}
        {/* Bars */}
        {WEEKLY_VIEWS.map((d, i) => {
          const barH = (d.views / maxVal) * chartH
          const x = padL + i * gap + (gap - barW) / 2
          const y = padT + chartH - barH
          return (
            <g key={d.week}>
              <rect x={x} y={y} width={barW} height={barH} rx="3" fill="#6366f1" opacity="0.85" />
              <text x={x + barW / 2} y={H - 6} textAnchor="middle" fontSize="8.5" fill="#9ca3af">
                {d.week.split(' ')[1]}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function EngagementLineChart() {
  const W = 420
  const H = 180
  const padL = 36
  const padB = 28
  const padR = 12
  const padT = 12
  const chartW = W - padL - padR
  const chartH = H - padB - padT
  const maxVal = 100
  const gap = chartW / (WEEKLY_ENGAGEMENT.length - 1)

  const points = WEEKLY_ENGAGEMENT.map((d, i) => {
    const x = padL + i * gap
    const y = padT + chartH * (1 - d.pct / maxVal)
    return `${x},${y}`
  }).join(' ')

  const areaPoints = [
    `${padL},${padT + chartH}`,
    ...WEEKLY_ENGAGEMENT.map((d, i) => {
      const x = padL + i * gap
      const y = padT + chartH * (1 - d.pct / maxVal)
      return `${x},${y}`
    }),
    `${padL + chartW},${padT + chartH}`,
  ].join(' ')

  return (
    <div className={styles.chartCard}>
      <div className={styles.chartTitle}>Engagement % per Week</div>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.chartSvg}>
        {/* Y-axis guide lines */}
        {[0, 25, 50, 75, 100].map((val) => {
          const y = padT + chartH * (1 - val / maxVal)
          return (
            <g key={val}>
              <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#f3f4f6" strokeWidth="1" />
              <text x={padL - 4} y={y + 4} textAnchor="end" fontSize="9" fill="#9ca3af">{val}</text>
            </g>
          )
        })}
        {/* Area fill */}
        <polygon points={areaPoints} fill="#10b981" opacity="0.08" />
        {/* Line */}
        <polyline points={points} fill="none" stroke="#10b981" strokeWidth="2" strokeLinejoin="round" />
        {/* Dots */}
        {WEEKLY_ENGAGEMENT.map((d, i) => {
          const x = padL + i * gap
          const y = padT + chartH * (1 - d.pct / maxVal)
          return <circle key={d.week} cx={x} cy={y} r="3" fill="#10b981" />
        })}
        {/* X-axis labels */}
        {WEEKLY_ENGAGEMENT.map((d, i) => {
          const x = padL + i * gap
          return (
            <text key={d.week} x={x} y={H - 6} textAnchor="middle" fontSize="8.5" fill="#9ca3af">
              {d.week.split(' ')[1]}
            </text>
          )
        })}
      </svg>
    </div>
  )
}

// ─── Buyer Group ──────────────────────────────────────────

const ROLE_COLORS: Record<string, string> = {
  Champion: '#6366f1',
  'Economic Buyer': '#10b981',
  Influencer: '#f59e0b',
  'End User': '#0ea5e9',
  Blocker: '#ef4444',
}

function BuyerGroup() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Buyer Group</h2>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Stakeholder</th>
              <th className={styles.th}>Role</th>
              <th className={styles.th}>Engagement</th>
              <th className={styles.th}>Last Active</th>
            </tr>
          </thead>
          <tbody>
            {BUYER_GROUP.map((p) => (
              <tr key={p.id} className={styles.tr}>
                <td className={styles.td}>
                  <div className={styles.personaCell}>
                    <span className={styles.personaAvatar} style={{ background: p.color }}>{p.initials}</span>
                    <div>
                      <div className={styles.personaName}>{p.name}</div>
                      <div className={styles.personaTitle}>{p.title}</div>
                    </div>
                  </div>
                </td>
                <td className={styles.td}>
                  <span className={styles.roleBadge} style={{ background: `${ROLE_COLORS[p.role]}18`, color: ROLE_COLORS[p.role] }}>
                    {p.role}
                  </span>
                </td>
                <td className={styles.td}>
                  <div className={styles.engagementCell}>
                    <div className={styles.engagementBar}>
                      <div className={styles.engagementFill} style={{ width: `${p.engagement}%`, background: ROLE_COLORS[p.role] }} />
                    </div>
                    <span className={styles.engagementPctSm}>{p.engagement}%</span>
                  </div>
                </td>
                <td className={styles.tdMeta}>{p.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

// ─── Account Table ────────────────────────────────────────

const STAGE_COLORS: Record<string, { bg: string; text: string }> = {
  Prospecting: { bg: '#f3f4f6', text: '#6b7280' },
  Discovery: { bg: '#eff6ff', text: '#1d4ed8' },
  Proposal: { bg: '#fef9c3', text: '#a16207' },
  Negotiation: { bg: '#fff7ed', text: '#c2410c' },
  'Closed Won': { bg: '#dcfce7', text: '#15803d' },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function AccountTable() {
  const [sortKey, setSortKey] = useState<AccountSortKey>('lastViewed')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  function toggleSort(key: AccountSortKey) {
    if (sortKey === key) setSortDir((d) => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const rows = [...ACCOUNT_ROWS].sort((a, b) => {
    let cmp = 0
    if (sortKey === 'name') cmp = a.name.localeCompare(b.name)
    else if (sortKey === 'contacts') cmp = a.contacts - b.contacts
    else if (sortKey === 'lastViewed') cmp = a.lastViewed.localeCompare(b.lastViewed)
    else if (sortKey === 'engagement') cmp = a.engagement - b.engagement
    else if (sortKey === 'stage') cmp = a.stage.localeCompare(b.stage)
    return sortDir === 'asc' ? cmp : -cmp
  })

  function SortIcon({ col }: { col: AccountSortKey }) {
    if (sortKey !== col) return <span className={styles.sortNeutral}>↕</span>
    return <span className={styles.sortActive}>{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Account Information</h2>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {([
                ['name', 'Account'],
                ['contacts', 'Contacts'],
                ['lastViewed', 'Last Viewed'],
                ['engagement', 'Engagement'],
                ['stage', 'Deal Stage'],
              ] as [AccountSortKey, string][]).map(([key, label]) => (
                <th key={key} className={`${styles.th} ${styles.thSortable}`} onClick={() => toggleSort(key)}>
                  {label} <SortIcon col={key} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const stageStyle = STAGE_COLORS[row.stage] ?? STAGE_COLORS.Prospecting
              return (
                <tr key={row.id} className={styles.tr}>
                  <td className={styles.td}>
                    <div className={styles.accountName}>{row.name}</div>
                  </td>
                  <td className={styles.tdNum}>{row.contacts}</td>
                  <td className={styles.tdMeta}>{formatDate(row.lastViewed)}</td>
                  <td className={styles.td}>
                    <div className={styles.engagementCell}>
                      <div className={styles.engagementBar}>
                        <div className={styles.engagementFill} style={{ width: `${row.engagement}%`, background: '#6366f1' }} />
                      </div>
                      <span className={styles.engagementPctSm}>{row.engagement}%</span>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.stageBadge} style={{ background: stageStyle.bg, color: stageStyle.text }}>
                      {row.stage}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

// ─── Sidebar ──────────────────────────────────────────────

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
