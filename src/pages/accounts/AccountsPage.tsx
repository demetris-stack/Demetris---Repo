import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ACCOUNTS, type Account, type Status } from './data'
import styles from './AccountsPage.module.css'

type SortKey = 'name' | 'industry' | 'employees' | 'arr' | 'status' | 'lastActivity'
type SortDir = 'asc' | 'desc'
type FilterStatus = 'all' | Status

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
  return name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
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

export default function AccountsPage() {
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all')
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('lastActivity')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const counts = useMemo(() => ({
    all: ACCOUNTS.length,
    active: ACCOUNTS.filter((a) => a.status === 'active').length,
    prospect: ACCOUNTS.filter((a) => a.status === 'prospect').length,
    inactive: ACCOUNTS.filter((a) => a.status === 'inactive').length,
  }), [])

  const rows = useMemo(() => {
    let data = ACCOUNTS.slice()

    if (statusFilter !== 'all') data = data.filter((a) => a.status === statusFilter)

    if (search.trim()) {
      const q = search.toLowerCase()
      data = data.filter((a) =>
        a.name.toLowerCase().includes(q) ||
        a.industry.toLowerCase().includes(q) ||
        a.website.toLowerCase().includes(q)
      )
    }

    data.sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case 'name': cmp = a.name.localeCompare(b.name); break
        case 'industry': cmp = a.industry.localeCompare(b.industry); break
        case 'employees': cmp = a.employees - b.employees; break
        case 'arr': cmp = a.arr - b.arr; break
        case 'status': cmp = a.status.localeCompare(b.status); break
        case 'lastActivity': cmp = a.lastActivity.localeCompare(b.lastActivity); break
      }
      return sortDir === 'asc' ? cmp : -cmp
    })

    return data
  }, [statusFilter, search, sortKey, sortDir])

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
      <Link to="/menu" className={styles.back}>← Back to Menu</Link>

      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Accounts</h1>
          <p className={styles.subtitle}>{ACCOUNTS.length} accounts total</p>
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
            placeholder="Search by name, industry, website…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.tabs}>
          {(['all', 'active', 'prospect', 'inactive'] as const).map((t) => (
            <button
              key={t}
              className={`${styles.tab} ${statusFilter === t ? styles.tabActive : ''}`}
              onClick={() => setStatusFilter(t)}
            >
              {t === 'all' ? 'All' : STATUS_LABEL[t as Status]}
              <span className={`${styles.tabCount} ${statusFilter === t ? styles.tabCountActive : ''}`}>
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
                Account <SortIcon col="name" />
              </th>
              <th className={`${styles.th} ${styles.thSortable}`} onClick={() => toggleSort('industry')}>
                Industry <SortIcon col="industry" />
              </th>
              <th className={`${styles.th} ${styles.thSortable}`} onClick={() => toggleSort('employees')}>
                Employees <SortIcon col="employees" />
              </th>
              <th className={`${styles.th} ${styles.thSortable}`} onClick={() => toggleSort('arr')}>
                ARR <SortIcon col="arr" />
              </th>
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
                <td colSpan={6} className={styles.empty}>
                  No accounts found{search ? ` for "${search}"` : ''}
                </td>
              </tr>
            ) : (
              rows.map((account) => <AccountRow key={account.id} account={account} />)
            )}
          </tbody>
        </table>
      </div>

      <footer className={styles.footer}>
        Showing {rows.length} of {ACCOUNTS.length} accounts
      </footer>
    </div>
  )
}

function AccountRow({ account }: { account: Account }) {
  return (
    <tr className={styles.tr}>
      <td className={styles.td}>
        <div className={styles.nameCell}>
          <span className={styles.avatar} style={{ background: avatarColor(account.id) }}>
            {initials(account.name)}
          </span>
          <div>
            <div className={styles.nameText}>{account.name}</div>
            <div className={styles.nameSubtext}>{account.website}</div>
          </div>
        </div>
      </td>
      <td className={styles.td}>
        <span className={styles.industryBadge}>{account.industry}</span>
      </td>
      <td className={`${styles.td} ${styles.numCell}`}>
        {account.employees.toLocaleString()}
      </td>
      <td className={`${styles.td} ${styles.numCell}`}>
        {formatARR(account.arr)}
      </td>
      <td className={styles.td}>
        <span className={styles[`status_${account.status}` as keyof typeof styles]}>
          {STATUS_LABEL[account.status]}
        </span>
      </td>
      <td className={`${styles.td} ${styles.dateCell}`}>
        {formatDate(account.lastActivity)}
      </td>
    </tr>
  )
}
