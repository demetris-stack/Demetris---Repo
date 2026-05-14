import { useState, useMemo } from 'react'
import { ROWS, type Row, type RecordType, type Status } from '../data'
import styles from './Table.module.css'

type FilterType = 'all' | RecordType
type SortKey = 'name' | 'type' | 'status' | 'lastActivity'
type SortDir = 'asc' | 'desc'

const STATUS_LABEL: Record<Status, string> = {
  active: 'Active',
  inactive: 'Inactive',
  prospect: 'Prospect',
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatARR(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

const AVATAR_COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b',
  '#10b981', '#0ea5e9', '#ef4444', '#14b8a6',
]

function avatarColor(id: string) {
  let hash = 0
  for (const c of id) hash = (hash * 31 + c.charCodeAt(0)) & 0xffffffff
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

export default function Table() {
  const [filter, setFilter] = useState<FilterType>('all')
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('lastActivity')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const counts = useMemo(() => ({
    all: ROWS.length,
    person: ROWS.filter((r) => r.type === 'person').length,
    account: ROWS.filter((r) => r.type === 'account').length,
  }), [])

  const rows = useMemo(() => {
    let data = ROWS.slice()

    if (filter !== 'all') data = data.filter((r) => r.type === filter)

    if (search.trim()) {
      const q = search.toLowerCase()
      data = data.filter((r) => {
        if (r.name.toLowerCase().includes(q)) return true
        if (r.type === 'person') {
          return r.email.toLowerCase().includes(q) ||
            r.title.toLowerCase().includes(q) ||
            r.company.toLowerCase().includes(q)
        }
        return r.industry.toLowerCase().includes(q) || r.website.toLowerCase().includes(q)
      })
    }

    data.sort((a, b) => {
      let av: string, bv: string
      switch (sortKey) {
        case 'name': av = a.name; bv = b.name; break
        case 'type': av = a.type; bv = b.type; break
        case 'status': av = a.status; bv = b.status; break
        case 'lastActivity': av = a.lastActivity; bv = b.lastActivity; break
      }
      const cmp = av.localeCompare(bv)
      return sortDir === 'asc' ? cmp : -cmp
    })

    return data
  }, [filter, search, sortKey, sortDir])

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <span className={styles.sortIconNeutral}>↕</span>
    return <span className={styles.sortIconActive}>{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>People &amp; Accounts</h1>
          <p className={styles.subtitle}>
            {counts.person} people · {counts.account} accounts
          </p>
        </div>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <input
            className={styles.search}
            type="text"
            placeholder="Search by name, email, company…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.tabs}>
          {(['all', 'person', 'account'] as const).map((t) => (
            <button
              key={t}
              className={`${styles.tab} ${filter === t ? styles.tabActive : ''}`}
              onClick={() => setFilter(t)}
            >
              {t === 'all' ? 'All' : t === 'person' ? 'People' : 'Accounts'}
              <span className={`${styles.tabCount} ${filter === t ? styles.tabCountActive : ''}`}>
                {counts[t]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={`${styles.th} ${styles.thSortable}`} onClick={() => toggleSort('name')}>
                Name <SortIcon col="name" />
              </th>
              <th className={`${styles.th} ${styles.thSortable}`} onClick={() => toggleSort('type')}>
                Type <SortIcon col="type" />
              </th>
              <th className={styles.th}>Details</th>
              <th className={`${styles.th} ${styles.thSortable}`} onClick={() => toggleSort('status')}>
                Status <SortIcon col="status" />
              </th>
              <th className={`${styles.th} ${styles.thSortable}`} onClick={() => toggleSort('lastActivity')}>
                Last Activity <SortIcon col="lastActivity" />
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.empty}>
                  No results found for &ldquo;{search}&rdquo;
                </td>
              </tr>
            ) : (
              rows.map((row) => <TableRow key={row.id} row={row} />)
            )}
          </tbody>
        </table>
      </div>

      <footer className={styles.footer}>
        Showing {rows.length} of {ROWS.length} records
      </footer>
    </div>
  )
}

function TableRow({ row }: { row: Row }) {
  return (
    <tr className={styles.tr}>
      <td className={styles.td}>
        <div className={styles.nameCell}>
          <span
            className={styles.avatar}
            style={{ background: avatarColor(row.id) }}
          >
            {initials(row.name)}
          </span>
          <div>
            <div className={styles.nameText}>{row.name}</div>
            {row.type === 'person' && (
              <div className={styles.nameSubtext}>{row.email}</div>
            )}
            {row.type === 'account' && (
              <div className={styles.nameSubtext}>{row.website}</div>
            )}
          </div>
        </div>
      </td>
      <td className={styles.td}>
        <span className={row.type === 'person' ? styles.badgePerson : styles.badgeAccount}>
          {row.type === 'person' ? 'Person' : 'Account'}
        </span>
      </td>
      <td className={styles.td}>
        {row.type === 'person' ? (
          <div className={styles.detailsCell}>
            <span className={styles.detailMain}>{row.title}</span>
            <span className={styles.detailSub}>{row.company}</span>
          </div>
        ) : (
          <div className={styles.detailsCell}>
            <span className={styles.detailMain}>{row.industry}</span>
            <span className={styles.detailSub}>
              {row.employees.toLocaleString()} employees · {formatARR(row.arr)} ARR
            </span>
          </div>
        )}
      </td>
      <td className={styles.td}>
        <span className={styles[`status_${row.status}` as keyof typeof styles]}>
          {STATUS_LABEL[row.status]}
        </span>
      </td>
      <td className={`${styles.td} ${styles.dateCell}`}>
        {formatDate(row.lastActivity)}
      </td>
    </tr>
  )
}
