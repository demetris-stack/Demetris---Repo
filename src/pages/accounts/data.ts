export type Status = 'active' | 'inactive' | 'prospect'

export interface Account {
  id: string
  name: string
  industry: string
  website: string
  employees: number
  arr: number
  status: Status
  lastActivity: string
}

export const ACCOUNTS: Account[] = [
  {
    id: 'a1',
    name: 'Meridian Labs',
    industry: 'SaaS',
    website: 'meridian.io',
    employees: 320,
    arr: 2_400_000,
    status: 'active',
    lastActivity: '2026-05-13',
  },
  {
    id: 'a2',
    name: 'NovaBridge',
    industry: 'Fintech',
    website: 'novabridge.com',
    employees: 85,
    arr: 780_000,
    status: 'prospect',
    lastActivity: '2026-05-10',
  },
  {
    id: 'a3',
    name: 'Arclight',
    industry: 'CleanTech',
    website: 'arclight.co',
    employees: 210,
    arr: 1_100_000,
    status: 'prospect',
    lastActivity: '2026-05-07',
  },
  {
    id: 'a4',
    name: 'Tantalum',
    industry: 'DevTools',
    website: 'tantalum.dev',
    employees: 42,
    arr: 310_000,
    status: 'inactive',
    lastActivity: '2026-03-21',
  },
  {
    id: 'a5',
    name: 'Helix AI',
    industry: 'AI/ML',
    website: 'helix.ai',
    employees: 650,
    arr: 8_200_000,
    status: 'active',
    lastActivity: '2026-05-14',
  },
  {
    id: 'a6',
    name: 'Groundwork',
    industry: 'PropTech',
    website: 'groundwork.co',
    employees: 18,
    arr: 95_000,
    status: 'prospect',
    lastActivity: '2026-05-01',
  },
]
