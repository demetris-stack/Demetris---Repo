export type RecordType = 'person' | 'account'
export type Status = 'active' | 'inactive' | 'prospect'

export interface Person {
  id: string
  type: 'person'
  name: string
  email: string
  title: string
  company: string
  status: Status
  lastActivity: string
  avatar?: string
}

export interface Account {
  id: string
  type: 'account'
  name: string
  industry: string
  website: string
  employees: number
  arr: number
  status: Status
  lastActivity: string
}

export type Row = Person | Account

export const ROWS: Row[] = [
  {
    id: 'p1',
    type: 'person',
    name: 'Sophia Carter',
    email: 'sophia.carter@meridian.io',
    title: 'VP of Engineering',
    company: 'Meridian Labs',
    status: 'active',
    lastActivity: '2026-05-13',
  },
  {
    id: 'a1',
    type: 'account',
    name: 'Meridian Labs',
    industry: 'SaaS',
    website: 'meridian.io',
    employees: 320,
    arr: 2_400_000,
    status: 'active',
    lastActivity: '2026-05-13',
  },
  {
    id: 'p2',
    type: 'person',
    name: 'James Okafor',
    email: 'j.okafor@novabridge.com',
    title: 'Head of Product',
    company: 'NovaBridge',
    status: 'active',
    lastActivity: '2026-05-10',
  },
  {
    id: 'a2',
    type: 'account',
    name: 'NovaBridge',
    industry: 'Fintech',
    website: 'novabridge.com',
    employees: 85,
    arr: 780_000,
    status: 'prospect',
    lastActivity: '2026-05-10',
  },
  {
    id: 'p3',
    type: 'person',
    name: 'Elena Voss',
    email: 'elena@arclight.co',
    title: 'CEO',
    company: 'Arclight',
    status: 'prospect',
    lastActivity: '2026-05-07',
  },
  {
    id: 'a3',
    type: 'account',
    name: 'Arclight',
    industry: 'CleanTech',
    website: 'arclight.co',
    employees: 210,
    arr: 1_100_000,
    status: 'prospect',
    lastActivity: '2026-05-07',
  },
  {
    id: 'p4',
    type: 'person',
    name: 'Marcus Reid',
    email: 'm.reid@tantalum.dev',
    title: 'CTO',
    company: 'Tantalum',
    status: 'inactive',
    lastActivity: '2026-03-21',
  },
  {
    id: 'a4',
    type: 'account',
    name: 'Tantalum',
    industry: 'DevTools',
    website: 'tantalum.dev',
    employees: 42,
    arr: 310_000,
    status: 'inactive',
    lastActivity: '2026-03-21',
  },
  {
    id: 'p5',
    type: 'person',
    name: 'Priya Nair',
    email: 'priya.nair@helix.ai',
    title: 'Director of Sales',
    company: 'Helix AI',
    status: 'active',
    lastActivity: '2026-05-14',
  },
  {
    id: 'a5',
    type: 'account',
    name: 'Helix AI',
    industry: 'AI/ML',
    website: 'helix.ai',
    employees: 650,
    arr: 8_200_000,
    status: 'active',
    lastActivity: '2026-05-14',
  },
  {
    id: 'p6',
    type: 'person',
    name: 'Tyler Nguyen',
    email: 't.nguyen@groundwork.co',
    title: 'Founder',
    company: 'Groundwork',
    status: 'prospect',
    lastActivity: '2026-05-01',
  },
  {
    id: 'a6',
    type: 'account',
    name: 'Groundwork',
    industry: 'PropTech',
    website: 'groundwork.co',
    employees: 18,
    arr: 95_000,
    status: 'prospect',
    lastActivity: '2026-05-01',
  },
]
