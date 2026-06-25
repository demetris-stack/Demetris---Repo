import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './DemoLibraryPage.module.css'
import logoUrl from '../../assets/logo.png'
import standardPIconUrl from '../../assets/standard-p-icon.png'
import singleExpIconUrl from '../../assets/single-exp-icon.png'
import discoveryDemoIconUrl from '../../assets/discovery-demo-icon.png'
import cloudDownloadIconUrl from '../../assets/cloud-download-icon.png'

type Tab = 'suggestions' | 'my-demos' | 'demo-library' | 'favorites' | 'promoted'

const TABS: { id: Tab; label: string }[] = [
  { id: 'suggestions', label: 'Suggestions' },
  { id: 'my-demos', label: 'My Demos' },
  { id: 'demo-library', label: 'Demo Library' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'promoted', label: 'Promoted Content' },
]

interface SuggestedAsset {
  id: string
  title: string
  type: string
  creatorInitials: string
  creatorColor: string
  inDemos: number
}

interface DemoRow {
  id: string
  title: string
  type: string
  theme: string
  language?: string
  totalTours?: number
  creator: string
  creatorInitials: string
  creatorColor: string
  owner?: string
  tags: string[]
  access?: string
  freshness: number
  usage: number
  created: string
  modified: string
  duration?: string
  description?: string
  parentFolder?: string
}

const T1 = 'Discovery Demo'
const T2 = 'Standard Personalization Demo'
const T3 = 'Single Experience'

const MY_DEMOS_SUGGESTED: SuggestedAsset[] = [
  { id: 's1', title: 'Quick Start Guide', type: T1, creatorInitials: 'AM', creatorColor: '#374151', inDemos: 23 },
  { id: 's2', title: 'Onboarding Flow', type: T2, creatorInitials: 'AM', creatorColor: '#374151', inDemos: 21 },
  { id: 's3', title: 'Feature Highlights', type: T3, creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 19 },
  { id: 's4', title: 'Dashboard Overview', type: T1, creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 18 },
  { id: 's5', title: 'Settings & Permissions', type: T2, creatorInitials: 'SR', creatorColor: '#7c3aed', inDemos: 16 },
  { id: 's6', title: 'Integrations Setup', type: T3, creatorInitials: 'TK', creatorColor: '#0369a1', inDemos: 16 },
  { id: 's7', title: 'Analytics Deep Dive', type: T1, creatorInitials: 'AM', creatorColor: '#374151', inDemos: 15 },
  { id: 's8', title: 'Competitive Battlecard', type: T2, creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 14 },
  { id: 's9', title: 'Mobile App Demo', type: T3, creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 13 },
  { id: 's10', title: 'Account Setup', type: T1, creatorInitials: 'AM', creatorColor: '#374151', inDemos: 12 },
  { id: 's11', title: 'Data Export Guide', type: T2, creatorInitials: 'SR', creatorColor: '#7c3aed', inDemos: 10 },
  { id: 's12', title: 'First Login Experience', type: T3, creatorInitials: 'TK', creatorColor: '#0369a1', inDemos: 9 },
]

const DEMO_LIBRARY_SUGGESTED: SuggestedAsset[] = [
  { id: 'ls1', title: 'Platform Overview', type: T1, creatorInitials: 'AM', creatorColor: '#374151', inDemos: 32 },
  { id: 'ls2', title: 'Product Tour 2026', type: T2, creatorInitials: 'AM', creatorColor: '#374151', inDemos: 28 },
  { id: 'ls3', title: 'Enterprise Features', type: T3, creatorInitials: 'SR', creatorColor: '#7c3aed', inDemos: 24 },
  { id: 'ls4', title: 'API Walkthrough', type: T1, creatorInitials: 'JP', creatorColor: '#b45309', inDemos: 21 },
  { id: 'ls5', title: 'Security & Compliance', type: T2, creatorInitials: 'TK', creatorColor: '#0369a1', inDemos: 19 },
  { id: 'ls6', title: 'Deal Closing Playbook', type: T3, creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 17 },
  { id: 'ls7', title: 'Onboarding Series Pt.1', type: T1, creatorInitials: 'TK', creatorColor: '#0369a1', inDemos: 16 },
  { id: 'ls8', title: 'Mobile App Demo', type: T2, creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 14 },
  { id: 'ls9', title: 'ROI Calculator', type: T3, creatorInitials: 'TK', creatorColor: '#0369a1', inDemos: 13 },
  { id: 'ls10', title: 'Brand Story Demo', type: T1, creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 12 },
  { id: 'ls11', title: 'Authentication Flow', type: T2, creatorInitials: 'TK', creatorColor: '#0369a1', inDemos: 11 },
  { id: 'ls12', title: 'Admin Console', type: T3, creatorInitials: 'AM', creatorColor: '#374151', inDemos: 10 },
]

const SUGGESTIONS_RECENTS: SuggestedAsset[] = [
  { id: 'rec1', title: 'Quick Start Guide', type: T1, creatorInitials: 'AM', creatorColor: '#374151', inDemos: 23 },
  { id: 'rec2', title: 'Dashboard Overview', type: T2, creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 18 },
  { id: 'rec3', title: 'Product Tour 2026', type: T3, creatorInitials: 'AM', creatorColor: '#374151', inDemos: 28 },
  { id: 'rec4', title: 'Integrations Setup', type: T1, creatorInitials: 'TK', creatorColor: '#0369a1', inDemos: 16 },
  { id: 'rec5', title: 'Mobile App Demo', type: T2, creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 14 },
  { id: 'rec6', title: 'Analytics Deep Dive', type: T3, creatorInitials: 'AM', creatorColor: '#374151', inDemos: 15 },
  { id: 'rec7', title: 'Settings & Permissions', type: T1, creatorInitials: 'SR', creatorColor: '#7c3aed', inDemos: 11 },
  { id: 'rec8', title: 'Feature Highlights', type: T2, creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 19 },
  { id: 'rec9', title: 'Account Setup', type: T3, creatorInitials: 'AM', creatorColor: '#374151', inDemos: 9 },
  { id: 'rec10', title: 'First Login Experience', type: T1, creatorInitials: 'TK', creatorColor: '#0369a1', inDemos: 22 },
  { id: 'rec11', title: 'Admin Console', type: T2, creatorInitials: 'JP', creatorColor: '#b45309', inDemos: 7 },
  { id: 'rec12', title: 'Data Export Guide', type: T3, creatorInitials: 'SR', creatorColor: '#7c3aed', inDemos: 13 },
]

const SUGGESTIONS_FOR_DEAL: SuggestedAsset[] = [
  { id: 'deal1', title: 'Enterprise Features', type: T1, creatorInitials: 'SR', creatorColor: '#7c3aed', inDemos: 24 },
  { id: 'deal2', title: 'Deal Closing Playbook', type: T2, creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 17 },
  { id: 'deal3', title: 'ROI Calculator', type: T3, creatorInitials: 'TK', creatorColor: '#0369a1', inDemos: 12 },
  { id: 'deal4', title: 'Security & Compliance', type: T1, creatorInitials: 'TK', creatorColor: '#0369a1', inDemos: 19 },
  { id: 'deal5', title: 'Executive Summary', type: T2, creatorInitials: 'SR', creatorColor: '#7c3aed', inDemos: 11 },
  { id: 'deal6', title: 'Competitive Battlecard', type: T3, creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 14 },
  { id: 'deal7', title: 'Procurement Checklist', type: T1, creatorInitials: 'AM', creatorColor: '#374151', inDemos: 8 },
  { id: 'deal8', title: 'Legal & Privacy Overview', type: T2, creatorInitials: 'JP', creatorColor: '#b45309', inDemos: 10 },
  { id: 'deal9', title: 'SLA & Support Tiers', type: T3, creatorInitials: 'SR', creatorColor: '#7c3aed', inDemos: 16 },
  { id: 'deal10', title: 'Migration Readiness', type: T1, creatorInitials: 'TK', creatorColor: '#0369a1', inDemos: 13 },
  { id: 'deal11', title: 'Pilot Program', type: T2, creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 9 },
  { id: 'deal12', title: 'Stakeholder Alignment', type: T3, creatorInitials: 'AM', creatorColor: '#374151', inDemos: 20 },
]

const SUGGESTIONS_PROMOTED: SuggestedAsset[] = [
  { id: 'promo1', title: 'Platform Overview', type: T1, creatorInitials: 'AM', creatorColor: '#374151', inDemos: 32 },
  { id: 'promo2', title: 'Brand Story Demo', type: T2, creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 29 },
  { id: 'promo3', title: 'Sales Enablement Kit', type: T3, creatorInitials: 'JP', creatorColor: '#b45309', inDemos: 26 },
  { id: 'promo4', title: 'Partner Enablement Kit', type: T1, creatorInitials: 'SR', creatorColor: '#7c3aed', inDemos: 22 },
  { id: 'promo5', title: 'Social Proof Reel', type: T2, creatorInitials: 'JP', creatorColor: '#b45309', inDemos: 20 },
  { id: 'promo6', title: 'Event Booth Demo', type: T3, creatorInitials: 'AM', creatorColor: '#374151', inDemos: 18 },
  { id: 'promo7', title: 'Customer Case Study', type: T1, creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 25 },
  { id: 'promo8', title: 'Analyst Report Highlights', type: T2, creatorInitials: 'SR', creatorColor: '#7c3aed', inDemos: 17 },
  { id: 'promo9', title: 'Product Launch Demo', type: T3, creatorInitials: 'JP', creatorColor: '#b45309', inDemos: 30 },
  { id: 'promo10', title: 'Award Win Story', type: T1, creatorInitials: 'AM', creatorColor: '#374151', inDemos: 14 },
  { id: 'promo11', title: 'Community Spotlight', type: T2, creatorInitials: 'TK', creatorColor: '#0369a1', inDemos: 11 },
  { id: 'promo12', title: 'Year in Review', type: T3, creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 19 },
]

const SUGGESTIONS_ASSETS: SuggestedAsset[] = [
  { id: 'asset1', title: 'API Walkthrough', type: T1, creatorInitials: 'JP', creatorColor: '#b45309', inDemos: 21 },
  { id: 'asset2', title: 'Admin Console', type: T2, creatorInitials: 'AM', creatorColor: '#374151', inDemos: 9 },
  { id: 'asset3', title: 'Onboarding Series Pt.1', type: T3, creatorInitials: 'TK', creatorColor: '#0369a1', inDemos: 16 },
  { id: 'asset4', title: 'Pricing Tier Explainer', type: T1, creatorInitials: 'JP', creatorColor: '#b45309', inDemos: 13 },
  { id: 'asset5', title: 'Authentication Flow', type: T2, creatorInitials: 'TK', creatorColor: '#0369a1', inDemos: 10 },
  { id: 'asset6', title: 'Data Pipeline Demo', type: T3, creatorInitials: 'AM', creatorColor: '#374151', inDemos: 8 },
  { id: 'asset7', title: 'Webhook Setup Guide', type: T1, creatorInitials: 'JP', creatorColor: '#b45309', inDemos: 12 },
  { id: 'asset8', title: 'SSO Configuration', type: T2, creatorInitials: 'SR', creatorColor: '#7c3aed', inDemos: 7 },
  { id: 'asset9', title: 'Reporting Deep Dive', type: T3, creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 15 },
  { id: 'asset10', title: 'Custom Fields Tour', type: T1, creatorInitials: 'AM', creatorColor: '#374151', inDemos: 11 },
  { id: 'asset11', title: 'Bulk Import Guide', type: T2, creatorInitials: 'TK', creatorColor: '#0369a1', inDemos: 6 },
  { id: 'asset12', title: 'Notifications Setup', type: T3, creatorInitials: 'SR', creatorColor: '#7c3aed', inDemos: 9 },
]

// Root-level rows have no parentFolder. Rows inside a folder have parentFolder set.
const MY_DEMOS_ROWS: DemoRow[] = [
  // Root level
  { id: 'r0a', title: 'Onboarding', type: 'Folder', theme: '', language: 'English', totalTours: 0, creator: 'Alex', owner: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['onboarding'], access: 'Team', freshness: 0, usage: 5, created: '02/01/26', modified: '05/10/26' },
  { id: 'r0b', title: 'Product', type: 'Folder', theme: '', language: 'English', totalTours: 0, creator: 'Jamie', owner: 'Jamie', creatorInitials: 'JL', creatorColor: '#1d4ed8', tags: ['product'], access: 'Team', freshness: 0, usage: 4, created: '03/01/26', modified: '05/01/26' },
  { id: 'r0c', title: 'Sales Enablement', type: 'Folder', theme: '', language: 'English', totalTours: 0, creator: 'Jordan', owner: 'Jordan', creatorInitials: 'JP', creatorColor: '#b45309', tags: ['sales'], access: 'Team', freshness: 0, usage: 4, created: '01/10/26', modified: '04/22/26' },
  { id: 'r0d', title: 'Engineering Demos', type: 'Folder', theme: '', language: 'English', totalTours: 0, creator: 'Taylor', owner: 'Taylor', creatorInitials: 'TK', creatorColor: '#0369a1', tags: ['api', 'admin'], access: 'Team', freshness: 0, usage: 3, created: '01/15/26', modified: '05/05/26' },
  { id: 'r4', title: 'Settings & Permissions', type: T2, theme: '', language: 'English', totalTours: 4, creator: 'Sam', owner: 'Sam', creatorInitials: 'SR', creatorColor: '#7c3aed', tags: ['admin', 'security'], access: 'Team', freshness: 8, usage: 57, created: '04/05/26', modified: '05/08/26', description: 'A guided tour of the permissions model — role assignments, access levels, and audit log configuration.' },
  { id: 'r5', title: 'Integrations Setup', type: T3, theme: '', language: 'English', totalTours: 7, creator: 'Taylor', owner: 'Taylor', creatorInitials: 'TK', creatorColor: '#0369a1', tags: ['api', 'onboarding'], access: 'Team', freshness: 12, usage: 176, created: '02/28/26', modified: '04/15/26', description: 'Step-by-step simulation for connecting third-party tools via native integrations and the REST API.' },
  { id: 'r9', title: 'Quick Start Guide', type: T1, theme: '', language: 'English', totalTours: 2, creator: 'Alex', owner: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['onboarding', 'product'], access: 'Team', freshness: 15, usage: 312, created: '01/05/26', modified: '05/12/26', description: 'Get up and running in under 3 minutes. Covers workspace setup, inviting teammates, and first project creation.' },
  { id: 'r10', title: 'Feature Highlights Reel', type: T2, theme: '', language: 'English', totalTours: 9, creator: 'Jamie', owner: 'Jamie', creatorInitials: 'JL', creatorColor: '#1d4ed8', tags: ['product', 'sales'], access: 'Team', freshness: 3, usage: 88, created: '04/20/26', modified: '05/14/26', description: 'A high-energy product sizzle reel showcasing the top 10 features most valued by customers.' },
  // Inside "Onboarding"
  { id: 'r1', title: 'Onboarding Flow Walkthrough', type: T1, theme: '', language: 'English', totalTours: 5, creator: 'Alex', owner: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['onboarding', 'product'], access: 'Team', freshness: 6, usage: 142, created: '04/18/26', modified: '05/10/26', description: 'Interactive simulation of the full new-user onboarding flow, from sign-up to first meaningful action.', parentFolder: 'Onboarding' },
  { id: 'r7', title: 'Mobile Walkthrough', type: T3, theme: '', language: 'English', totalTours: 12, creator: 'Jamie', owner: 'Jamie', creatorInitials: 'JL', creatorColor: '#1d4ed8', tags: ['mobile', 'onboarding'], access: 'Team', freshness: 9, usage: 64, created: '02/14/26', modified: '03/30/26', description: 'A click-through tour of the iOS and Android apps, highlighting key mobile-only features.', parentFolder: 'Onboarding' },
  { id: 'r11', title: 'First Login Experience', type: T2, theme: '', language: 'English', totalTours: 3, creator: 'Taylor', owner: 'Taylor', creatorInitials: 'TK', creatorColor: '#0369a1', tags: ['onboarding'], access: 'Team', freshness: 11, usage: 203, created: '03/05/26', modified: '05/02/26', description: 'Simulates exactly what a new user sees when they log in for the first time, including the welcome checklist.', parentFolder: 'Onboarding' },
  { id: 'r12', title: 'Account Setup Tour', type: T1, theme: '', language: 'English', totalTours: 8, creator: 'Alex', owner: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['onboarding', 'admin'], access: 'Team', freshness: 7, usage: 119, created: '03/18/26', modified: '04/28/26', description: 'Covers profile setup, notification preferences, and connecting calendar and email integrations.', parentFolder: 'Onboarding' },
  { id: 'r13', title: 'Welcome & Overview', type: T3, theme: '', language: 'English', totalTours: 6, creator: 'Jordan', owner: 'Jordan', creatorInitials: 'JP', creatorColor: '#b45309', tags: ['onboarding', 'sales'], access: 'Team', freshness: 4, usage: 78, created: '02/22/26', modified: '04/10/26', description: 'Recording of the monthly new-customer welcome session including live Q&A highlights.', parentFolder: 'Onboarding' },
  // Inside "Product"
  { id: 'r2', title: 'Dashboard Overview', type: T1, theme: '', language: 'English', totalTours: 11, creator: 'Jamie', owner: 'Jamie', creatorInitials: 'JL', creatorColor: '#1d4ed8', tags: ['product', 'sales'], access: 'Team', freshness: 4, usage: 98, created: '03/22/26', modified: '04/30/26', description: 'Walkthrough of the main dashboard — widgets, date ranges, and customizing the layout for different team roles.', parentFolder: 'Product' },
  { id: 'r3', title: 'Analytics Deep Dive', type: T2, theme: '', language: 'English', totalTours: 1, creator: 'Alex', owner: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['product', 'admin', 'reporting'], access: 'Team', freshness: 3, usage: 211, created: '03/14/26', modified: '05/01/26', description: 'Explores advanced reporting features: custom funnels, cohort analysis, and scheduled report delivery.', parentFolder: 'Product' },
  { id: 'r14', title: 'Reporting Module', type: T3, theme: '', language: 'English', totalTours: 10, creator: 'Jordan', owner: 'Jordan', creatorInitials: 'JP', creatorColor: '#b45309', tags: ['product', 'reporting'], access: 'Team', freshness: 5, usage: 134, created: '04/01/26', modified: '05/07/26', description: 'Tour of every section in the Reporting module with tips on exporting data and sharing with stakeholders.', parentFolder: 'Product' },
  { id: 'r15', title: 'Workspace Customization', type: T1, theme: '', language: 'English', totalTours: 5, creator: 'Sam', owner: 'Sam', creatorInitials: 'SR', creatorColor: '#7c3aed', tags: ['product', 'admin'], access: 'Team', freshness: 9, usage: 67, created: '04/10/26', modified: '05/03/26', description: 'Shows how admins can brand the workspace, configure default views, and manage team-wide settings.', parentFolder: 'Product' },
  // Inside "Sales Enablement"
  { id: 'r6', title: 'Reporting Basics', type: T2, theme: '', language: 'English', totalTours: 7, creator: 'Jordan', owner: 'Jordan', creatorInitials: 'JP', creatorColor: '#b45309', tags: ['sales', 'product'], access: 'Team', freshness: 5, usage: 89, created: '03/10/26', modified: '04/22/26', description: 'Introductory video covering the core reporting screens — ideal for sharing with new champion contacts.', parentFolder: 'Sales Enablement' },
  { id: 'r8', title: 'Enterprise Admin', type: T3, theme: '', language: 'English', totalTours: 3, creator: 'Sam', owner: 'Sam', creatorInitials: 'SR', creatorColor: '#7c3aed', tags: ['enterprise', 'admin'], access: 'Team', freshness: 2, usage: 130, created: '01/20/26', modified: '03/15/26', description: 'Detailed demo for IT and security stakeholders covering SSO, SCIM provisioning, and data residency.', parentFolder: 'Sales Enablement' },
  { id: 'r16', title: 'Competitive Battlecard', type: T1, theme: '', language: 'English', totalTours: 9, creator: 'Jamie', owner: 'Jamie', creatorInitials: 'JL', creatorColor: '#1d4ed8', tags: ['sales', 'enterprise'], access: 'Team', freshness: 6, usage: 241, created: '02/10/26', modified: '05/09/26', description: 'Side-by-side demo highlighting key differentiators versus the top two competitors — updated for Q2 2026.', parentFolder: 'Sales Enablement' },
  { id: 'r17', title: 'ROI Calculator', type: T2, theme: '', language: 'English', totalTours: 4, creator: 'Taylor', owner: 'Taylor', creatorInitials: 'TK', creatorColor: '#0369a1', tags: ['sales'], access: 'Team', freshness: 10, usage: 188, created: '03/02/26', modified: '04/25/26', description: 'Guided walkthrough of the interactive ROI calculator, showing how to input customer data and present results.', parentFolder: 'Sales Enablement' },
  // Inside "Engineering Demos"
  { id: 'r18', title: 'API Integration Sandbox', type: T3, theme: '', language: 'English', totalTours: 6, creator: 'Taylor', owner: 'Taylor', creatorInitials: 'TK', creatorColor: '#0369a1', tags: ['api'], access: 'Team', freshness: 13, usage: 95, created: '01/28/26', modified: '04/20/26', description: 'Live sandbox simulation letting prospects make real API calls and inspect responses without credentials.', parentFolder: 'Engineering Demos' },
  { id: 'r19', title: 'Webhook Configuration', type: T1, theme: '', language: 'English', totalTours: 8, creator: 'Alex', owner: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['api', 'admin'], access: 'Team', freshness: 8, usage: 52, created: '02/05/26', modified: '04/12/26', description: 'Step-by-step guide to setting up webhooks, verifying payloads, and handling retry logic.', parentFolder: 'Engineering Demos' },
  { id: 'r20', title: 'SSO Setup Guide', type: T2, theme: '', language: 'English', totalTours: 2, creator: 'Sam', owner: 'Sam', creatorInitials: 'SR', creatorColor: '#7c3aed', tags: ['security', 'admin'], access: 'Team', freshness: 5, usage: 74, created: '03/08/26', modified: '05/01/26', description: 'Covers SAML 2.0 and OIDC configuration, attribute mapping, and testing the SSO flow end-to-end.', parentFolder: 'Engineering Demos' },
]

const DEMO_LIBRARY_ROWS: DemoRow[] = [
  // Root level
  { id: 'l0a', title: 'Global Library', type: 'Folder', theme: '', language: 'English', totalTours: 0, creator: 'Alex', owner: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['product'], access: 'Team', freshness: 0, usage: 4, created: '01/01/26', modified: '05/18/26' },
  { id: 'l0b', title: 'Engineering', type: 'Folder', theme: '', language: 'English', totalTours: 0, creator: 'Jordan', owner: 'Jordan', creatorInitials: 'JP', creatorColor: '#b45309', tags: ['api', 'security'], access: 'Team', freshness: 0, usage: 4, created: '02/10/26', modified: '05/05/26' },
  { id: 'l0c', title: 'Sales', type: 'Folder', theme: '', language: 'English', totalTours: 0, creator: 'Jordan', owner: 'Jordan', creatorInitials: 'JP', creatorColor: '#b45309', tags: ['sales'], access: 'Team', freshness: 0, usage: 4, created: '01/05/26', modified: '03/01/26' },
  { id: 'l0d', title: 'Marketing', type: 'Folder', theme: '', language: 'English', totalTours: 0, creator: 'Jamie', owner: 'Jamie', creatorInitials: 'JL', creatorColor: '#1d4ed8', tags: ['product', 'mobile'], access: 'Team', freshness: 0, usage: 3, created: '01/20/26', modified: '04/28/26' },
  { id: 'l4', title: 'Mobile App Demo', type: T1, theme: '', language: 'English', totalTours: 11, creator: 'Jamie', owner: 'Jamie', creatorInitials: 'JL', creatorColor: '#1d4ed8', tags: ['mobile', 'product'], access: 'Team', freshness: 6, usage: 143, created: '03/30/26', modified: '04/28/26', description: 'Full walkthrough of the mobile app experience across iOS and Android, including push notifications and offline mode.' },
  { id: 'l6', title: 'Admin Console', type: T2, theme: '', language: 'English', totalTours: 5, creator: 'Alex', owner: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['admin'], access: 'Team', freshness: 8, usage: 99, created: '02/20/26', modified: '04/05/26', description: 'Interactive simulation of the admin console — user management, billing, and organization-wide settings.' },
  { id: 'l9', title: 'Platform Overview', type: T3, theme: '', language: 'English', totalTours: 7, creator: 'Alex', owner: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['product', 'onboarding'], access: 'Team', freshness: 14, usage: 521, created: '01/10/26', modified: '05/15/26', description: 'Top-level platform demo covering all core modules — ideal as the first demo in any discovery conversation.' },
  { id: 'l10', title: 'Partner Enablement Kit', type: T1, theme: '', language: 'English', totalTours: 4, creator: 'Sam', owner: 'Sam', creatorInitials: 'SR', creatorColor: '#7c3aed', tags: ['sales', 'enterprise'], access: 'Team', freshness: 2, usage: 164, created: '02/25/26', modified: '04/18/26', description: 'Comprehensive demo for partner sales teams covering positioning, objection handling, and co-sell motions.' },
  // Inside "Global Library"
  { id: 'l1', title: 'Product Tour 2026', type: T1, theme: '', language: 'English', totalTours: 9, creator: 'Alex', owner: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['product', 'sales'], access: 'Team', freshness: 7, usage: 304, created: '05/01/26', modified: '05/18/26', description: 'The definitive 2026 product tour — updated with all Q1 feature releases and refreshed UI screenshots.', parentFolder: 'Global Library' },
  { id: 'l7', title: 'Onboarding Series Pt.1', type: T2, theme: '', language: 'English', totalTours: 3, creator: 'Taylor', owner: 'Taylor', creatorInitials: 'TK', creatorColor: '#0369a1', tags: ['onboarding', 'product'], access: 'Team', freshness: 5, usage: 338, created: '02/01/26', modified: '03/20/26', description: 'Part 1 of 2: covers workspace creation, initial configuration, and inviting your first team members.', parentFolder: 'Global Library' },
  { id: 'l11', title: 'Onboarding Series Pt.2', type: T3, theme: '', language: 'English', totalTours: 6, creator: 'Taylor', owner: 'Taylor', creatorInitials: 'TK', creatorColor: '#0369a1', tags: ['onboarding', 'product'], access: 'Team', freshness: 4, usage: 271, created: '02/15/26', modified: '04/01/26', description: 'Part 2 of 2: advanced configuration, custom fields, automations, and connecting your first integration.', parentFolder: 'Global Library' },
  { id: 'l12', title: 'Executive Summary', type: T1, theme: '', language: 'English', totalTours: 8, creator: 'Sam', owner: 'Sam', creatorInitials: 'SR', creatorColor: '#7c3aed', tags: ['enterprise', 'sales'], access: 'Team', freshness: 9, usage: 193, created: '03/10/26', modified: '05/10/26', description: 'C-suite-ready demo summarizing business value, ROI benchmarks, and customer success stories.', parentFolder: 'Global Library' },
  // Inside "Engineering"
  { id: 'l2', title: 'Security & Compliance', type: T2, theme: '', language: 'English', totalTours: 1, creator: 'Taylor', owner: 'Taylor', creatorInitials: 'TK', creatorColor: '#0369a1', tags: ['security', 'enterprise', 'compliance'], access: 'Team', freshness: 4, usage: 187, created: '04/22/26', modified: '05/12/26', description: 'Covers SOC 2 Type II certification, data encryption at rest and in transit, and GDPR compliance posture.', parentFolder: 'Engineering' },
  { id: 'l3', title: 'API Walkthrough', type: T3, theme: '', language: 'English', totalTours: 10, creator: 'Jordan', owner: 'Jordan', creatorInitials: 'JP', creatorColor: '#b45309', tags: ['api'], access: 'Team', freshness: 11, usage: 256, created: '04/10/26', modified: '05/05/26', description: 'Hands-on walkthrough of the REST API: authentication, pagination, rate limits, and common use cases.', parentFolder: 'Engineering' },
  { id: 'l13', title: 'Data Pipeline Demo', type: T1, theme: '', language: 'English', totalTours: 5, creator: 'Alex', owner: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['api', 'admin'], access: 'Team', freshness: 6, usage: 112, created: '03/25/26', modified: '05/03/26', description: 'Demonstrates building an end-to-end data pipeline: ingestion, transformation, and output to downstream systems.', parentFolder: 'Engineering' },
  { id: 'l14', title: 'Authentication Flow', type: T2, theme: '', language: 'English', totalTours: 7, creator: 'Taylor', owner: 'Taylor', creatorInitials: 'TK', creatorColor: '#0369a1', tags: ['security', 'api'], access: 'Team', freshness: 3, usage: 145, created: '04/05/26', modified: '05/08/26', description: 'Tour of all supported authentication methods: API keys, OAuth 2.0, JWT, and session tokens.', parentFolder: 'Engineering' },
  // Inside "Sales"
  { id: 'l5', title: 'Enterprise Features', type: T3, theme: '', language: 'English', totalTours: 3, creator: 'Sam', owner: 'Sam', creatorInitials: 'SR', creatorColor: '#7c3aed', tags: ['enterprise', 'admin'], access: 'Team', freshness: 3, usage: 412, created: '03/15/26', modified: '05/10/26', description: 'Deep-dive into enterprise-only capabilities: advanced RBAC, dedicated infrastructure, and SLA commitments.', parentFolder: 'Sales' },
  { id: 'l8', title: 'Sales Enablement Kit', type: T1, theme: '', language: 'English', totalTours: 9, creator: 'Jordan', owner: 'Jordan', creatorInitials: 'JP', creatorColor: '#b45309', tags: ['sales'], access: 'Team', freshness: 14, usage: 275, created: '01/15/26', modified: '03/01/26', description: 'Demo for AEs covering discovery frameworks, demo best practices, and objection handling.', parentFolder: 'Sales' },
  { id: 'l15', title: 'Deal Closing Playbook', type: T2, theme: '', language: 'English', totalTours: 4, creator: 'Jamie', owner: 'Jamie', creatorInitials: 'JL', creatorColor: '#1d4ed8', tags: ['sales', 'enterprise'], access: 'Team', freshness: 7, usage: 319, created: '02/18/26', modified: '05/11/26', description: 'Late-stage demo focused on procurement, security review, and legal considerations for enterprise deals.', parentFolder: 'Sales' },
  { id: 'l16', title: 'Pricing Tier Explainer', type: T3, theme: '', language: 'English', totalTours: 6, creator: 'Jordan', owner: 'Jordan', creatorInitials: 'JP', creatorColor: '#b45309', tags: ['sales'], access: 'Team', freshness: 5, usage: 207, created: '03/05/26', modified: '04/22/26', description: 'Walks through each pricing tier side-by-side, highlighting the features and limits relevant to mid-market buyers.', parentFolder: 'Sales' },
  // Inside "Marketing"
  { id: 'l17', title: 'Brand Story Demo', type: T1, theme: '', language: 'English', totalTours: 8, creator: 'Jamie', owner: 'Jamie', creatorInitials: 'JL', creatorColor: '#1d4ed8', tags: ['product'], access: 'Team', freshness: 10, usage: 388, created: '01/25/26', modified: '04/15/26', description: 'An emotional brand narrative demo — origin story, mission, and customer transformation highlights.', parentFolder: 'Marketing' },
  { id: 'l18', title: 'Social Proof Reel', type: T2, theme: '', language: 'English', totalTours: 2, creator: 'Jordan', owner: 'Jordan', creatorInitials: 'JP', creatorColor: '#b45309', tags: ['sales', 'product'], access: 'Team', freshness: 8, usage: 254, created: '02/08/26', modified: '04/20/26', description: 'Fast-paced compilation of customer quotes, NPS scores, and G2 review highlights for use in sales emails.', parentFolder: 'Marketing' },
  { id: 'l19', title: 'Event Booth Demo', type: T3, theme: '', language: 'English', totalTours: 11, creator: 'Alex', owner: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['product', 'enterprise'], access: 'Team', freshness: 12, usage: 176, created: '03/12/26', modified: '05/05/26', description: 'Short, high-impact demo designed for trade show booths — grabs attention in 60 seconds and works without audio.', parentFolder: 'Marketing' },
]

const TYPE_OPTIONS = ['Discovery Demo', 'Standard Personalization Demo', 'Single Experience']
const CREATOR_OPTIONS = ['Alex', 'Jamie', 'Sam', 'Taylor', 'Jordan']
const TAG_OPTIONS = [
  'Onboarding', 'Product', 'Sales', 'API', 'Security', 'Mobile', 'Enterprise', 'Admin',
  'Reporting', 'Analytics', 'Compliance', 'Marketing', 'Engineering', 'Integrations',
  'Getting Started', 'Advanced', 'Partner', 'Webinar', 'Demo', 'Tutorial',
]

/* ── Change history mock data ───────────────────────── */
interface HistoryEvent {
  id: string
  date: string
  actor: string
  actorInitials: string
  actorColor: string
  type: 'edit' | 'publish' | 'add' | 'remove' | 'rename' | 'tag' | 'create'
  description: string
  detail?: string
}

const HISTORY_DATA: Record<string, HistoryEvent[]> = {
  // Folders
  'r0a': [
    { id: 'h1', date: 'May 10, 2026', actor: 'Alex', actorInitials: 'AM', actorColor: '#374151', type: 'add', description: 'Added "Account Setup Tour" to folder', detail: 'Moved from root' },
    { id: 'h2', date: 'Apr 28, 2026', actor: 'Jordan', actorInitials: 'JP', actorColor: '#b45309', type: 'add', description: 'Added "Welcome Webinar Replay" to folder' },
    { id: 'h3', date: 'Apr 10, 2026', actor: 'Alex', actorInitials: 'AM', actorColor: '#374151', type: 'add', description: 'Added "Mobile Walkthrough" to folder' },
    { id: 'h4', date: 'Mar 18, 2026', actor: 'Taylor', actorInitials: 'TK', actorColor: '#0369a1', type: 'add', description: 'Added "First Login Experience" to folder' },
    { id: 'h5', date: 'Mar 05, 2026', actor: 'Alex', actorInitials: 'AM', actorColor: '#374151', type: 'create', description: 'Created folder "Onboarding"' },
  ],
  'r0b': [
    { id: 'h1', date: 'May 07, 2026', actor: 'Sam', actorInitials: 'SR', actorColor: '#7c3aed', type: 'add', description: 'Added "Workspace Customization" to folder' },
    { id: 'h2', date: 'Apr 30, 2026', actor: 'Jamie', actorInitials: 'JL', actorColor: '#1d4ed8', type: 'add', description: 'Added "Dashboard Overview" to folder' },
    { id: 'h3', date: 'Apr 01, 2026', actor: 'Jordan', actorInitials: 'JP', actorColor: '#b45309', type: 'add', description: 'Added "Reporting Module Tour" to folder' },
    { id: 'h4', date: 'Mar 22, 2026', actor: 'Jamie', actorInitials: 'JL', actorColor: '#1d4ed8', type: 'create', description: 'Created folder "Product"' },
  ],
  // Demos / other types
  'r1': [
    { id: 'h1', date: 'May 10, 2026', actor: 'Alex', actorInitials: 'AM', actorColor: '#374151', type: 'edit', description: 'Updated slide 4 — revised CTA copy', detail: '"Get started" → "Start free trial"' },
    { id: 'h2', date: 'May 02, 2026', actor: 'Taylor', actorInitials: 'TK', actorColor: '#0369a1', type: 'tag', description: 'Added tag "product"' },
    { id: 'h3', date: 'Apr 22, 2026', actor: 'Alex', actorInitials: 'AM', actorColor: '#374151', type: 'publish', description: 'Published demo', detail: 'Visibility set to Public' },
    { id: 'h4', date: 'Apr 18, 2026', actor: 'Alex', actorInitials: 'AM', actorColor: '#374151', type: 'create', description: 'Created demo' },
  ],
  'r2': [
    { id: 'h1', date: 'Apr 30, 2026', actor: 'Jamie', actorInitials: 'JL', actorColor: '#1d4ed8', type: 'edit', description: 'Replaced hero screenshot on slide 1' },
    { id: 'h2', date: 'Apr 15, 2026', actor: 'Sam', actorInitials: 'SR', actorColor: '#7c3aed', type: 'tag', description: 'Added tags "sales", "product"' },
    { id: 'h3', date: 'Mar 22, 2026', actor: 'Jamie', actorInitials: 'JL', actorColor: '#1d4ed8', type: 'create', description: 'Created demo' },
  ],
  'r3': [
    { id: 'h1', date: 'May 01, 2026', actor: 'Alex', actorInitials: 'AM', actorColor: '#374151', type: 'edit', description: 'Added 3 new slides covering retention metrics' },
    { id: 'h2', date: 'Apr 20, 2026', actor: 'Jordan', actorInitials: 'JP', actorColor: '#b45309', type: 'edit', description: 'Updated chart data on slides 6–8' },
    { id: 'h3', date: 'Mar 14, 2026', actor: 'Alex', actorInitials: 'AM', actorColor: '#374151', type: 'create', description: 'Created demo' },
  ],
  'r4': [
    { id: 'h1', date: 'May 08, 2026', actor: 'Sam', actorInitials: 'SR', actorColor: '#7c3aed', type: 'edit', description: 'Updated permission matrix screenshot' },
    { id: 'h2', date: 'Apr 25, 2026', actor: 'Sam', actorInitials: 'SR', actorColor: '#7c3aed', type: 'publish', description: 'Published demo' },
    { id: 'h3', date: 'Apr 05, 2026', actor: 'Sam', actorInitials: 'SR', actorColor: '#7c3aed', type: 'create', description: 'Created demo' },
  ],
  'r5': [
    { id: 'h1', date: 'Apr 15, 2026', actor: 'Taylor', actorInitials: 'TK', actorColor: '#0369a1', type: 'edit', description: 'Refreshed API code snippet examples' },
    { id: 'h2', date: 'Mar 10, 2026', actor: 'Taylor', actorInitials: 'TK', actorColor: '#0369a1', type: 'rename', description: 'Renamed demo', detail: '"API Integration" → "Integrations Setup"' },
    { id: 'h3', date: 'Feb 28, 2026', actor: 'Taylor', actorInitials: 'TK', actorColor: '#0369a1', type: 'create', description: 'Created demo' },
  ],
}

function getHistory(row: DemoRow): HistoryEvent[] {
  return HISTORY_DATA[row.id] ?? [
    { id: 'h1', date: row.modified, actor: row.creator, actorInitials: row.creatorInitials, actorColor: row.creatorColor, type: 'edit', description: 'Last modified' },
    { id: 'h2', date: row.created, actor: row.creator, actorInitials: row.creatorInitials, actorColor: row.creatorColor, type: 'create', description: row.type === 'Folder' ? 'Created folder' : 'Created demo' },
  ]
}
const THEME_OPTIONS = ['Light', 'Dark', 'Custom', 'Default', 'Minimal']
const LANGUAGE_OPTIONS = ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Japanese', 'Chinese', 'Korean']
const OWNER_OPTIONS = ['Alex', 'Jamie', 'Sam', 'Taylor', 'Jordan']


export default function DemoLibraryPage({ theme }: { theme?: 'consensus' } = {}) {
  useEffect(() => {
    document.title = theme === 'consensus'
      ? 'Demo Library Filtering - Consensus Colors'
      : 'Demo Library Filtering'
  }, [theme])
  const [activeTab, setActiveTab] = useState<Tab>('my-demos')

  return (
    <div className={styles.layout} data-theme={theme}>
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
  const [themes, setThemes] = useState<string[]>([])
  const [languages, setLanguages] = useState<string[]>([])
  const [owners, setOwners] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchScope, setSearchScope] = useState<SearchScope>('everywhere')
  const [openFolderName, setOpenFolderName] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [favorited, setFavorited] = useState<Set<string>>(new Set())

  function toggleFavGlobal(id: string) {
    setFavorited((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  function toggle(list: string[], setList: (v: string[]) => void, val: string) {
    setList(list.includes(val) ? list.filter((x) => x !== val) : [...list, val])
  }

  function clearAll() {
    setTypes([]); setCreators([]); setTags([])
    setThemes([]); setLanguages([]); setOwners([])
    setSearchQuery(''); setSearchScope('everywhere')
  }

  function handleOpenFolder(name: string) {
    setOpenFolderName(name)
    setSearchQuery('')
    setSearchScope('in-folder')
  }

  function handleCloseFolder() {
    setOpenFolderName(null)
    setSearchQuery('')
    setSearchScope('everywhere')
  }

  const filters: Filters = {
    types, creators, tags, themes, languages, owners,
    searchQuery, searchScope, openFolder: openFolderName,
  }
  const filterActions: FilterActions = {
    toggleType: (v) => toggle(types, setTypes, v),
    toggleCreator: (v) => toggle(creators, setCreators, v),
    toggleTag: (v) => toggle(tags, setTags, v),
    toggleTheme: (v) => toggle(themes, setThemes, v),
    toggleLanguage: (v) => toggle(languages, setLanguages, v),
    toggleOwner: (v) => toggle(owners, setOwners, v),
    clearAll,
    setSearch: setSearchQuery,
    setScope: setSearchScope,
    openFolder: handleOpenFolder,
    closeFolder: handleCloseFolder,
  }

  const allRows = [...MY_DEMOS_ROWS, ...DEMO_LIBRARY_ROWS]
  const favRows = allRows.filter((r) => favorited.has(r.id))

  const content = tab === 'suggestions' ? (
    <SuggestionsPage />
  ) : tab === 'my-demos' ? (
    <>
      <SuggestedCarousel assets={MY_DEMOS_SUGGESTED} />
      <FilterBar filters={filters} actions={filterActions} onOpenDrawer={() => setDrawerOpen(true)} />
      <DemoTable rows={MY_DEMOS_ROWS} filters={filters} actions={filterActions} favorited={favorited} onToggleFav={toggleFavGlobal} reportLabel="Full Demo Report" />
    </>
  ) : tab === 'demo-library' ? (
    <>
      <SuggestedCarousel assets={DEMO_LIBRARY_SUGGESTED} />
      <FilterBar filters={filters} actions={filterActions} onOpenDrawer={() => setDrawerOpen(true)} />
      <DemoTable rows={DEMO_LIBRARY_ROWS} filters={filters} actions={filterActions} favorited={favorited} onToggleFav={toggleFavGlobal} reportLabel="Demo Library Report" />
    </>
  ) : tab === 'favorites' ? (
    favRows.length === 0
      ? <div className={styles.empty}><p>No favorites yet. Click the ♥ on any demo to save it here.</p></div>
      : <DemoTable rows={favRows} filters={filters} actions={filterActions} favorited={favorited} onToggleFav={toggleFavGlobal} />
  ) : (
    <div className={styles.empty}><p>No promoted content.</p></div>
  )

  return (
    <>
      {content}
      <FilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} filters={filters} actions={filterActions} />
    </>
  )
}

type SearchScope = 'everywhere' | 'in-folder'
interface Filters {
  types: string[]; creators: string[]; tags: string[]
  themes: string[]; languages: string[]; owners: string[]
  searchQuery: string; searchScope: SearchScope; openFolder: string | null
}
interface FilterActions {
  toggleType: (v: string) => void
  toggleCreator: (v: string) => void
  toggleTag: (v: string) => void
  toggleTheme: (v: string) => void
  toggleLanguage: (v: string) => void
  toggleOwner: (v: string) => void
  clearAll: () => void
  setSearch: (v: string) => void
  setScope: (v: SearchScope) => void
  openFolder: (name: string) => void
  closeFolder: () => void
}

const SCOPE_OPTIONS: { value: SearchScope; label: string }[] = [
  { value: 'everywhere', label: 'Everywhere' },
  { value: 'in-folder', label: 'In Folder' },
]

function FilterBar({ filters, actions, onOpenDrawer }: { filters: Filters; actions: FilterActions; onOpenDrawer: () => void }) {
  const { types, creators, tags, themes, languages, owners, searchQuery, searchScope } = filters
  const totalApplied = types.length + creators.length + tags.length + themes.length + languages.length + owners.length
  const totalExtra = themes.length + languages.length + owners.length
  const totalAll = totalApplied
  const [scopeOpen, setScopeOpen] = useState(false)
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const scopeRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function h(e: MouseEvent) {
      if (scopeRef.current && !scopeRef.current.contains(e.target as Node)) {
        setScopeOpen(false)
        setSuggestionsOpen(false)
      }
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const suggestedTags = searchQuery.trim()
    ? TAG_OPTIONS.filter((t) => t.toLowerCase().includes(searchQuery.trim().toLowerCase()))
    : []

  const appliedGroups = [
    { label: 'Type', values: types, onToggle: actions.toggleType },
    { label: 'Creator', values: creators, onToggle: actions.toggleCreator },
    { label: 'Tags', values: tags, onToggle: actions.toggleTag },
    { label: 'Theme', values: filters.themes, onToggle: actions.toggleTheme },
    { label: 'Language', values: filters.languages, onToggle: actions.toggleLanguage },
    { label: 'Owner', values: filters.owners, onToggle: actions.toggleOwner },
  ]

  const scopeLabel = filters.openFolder
    ? `In "${filters.openFolder}"`
    : (SCOPE_OPTIONS.find((o) => o.value === searchScope)?.label ?? 'Everywhere')

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterLeft}>
        <AppliedFiltersDropdown totalApplied={totalApplied} groups={appliedGroups} onClearAll={actions.clearAll} />
        <FilterDropdown label="Type" icon={<CircleIcon />} options={TYPE_OPTIONS} selected={types} onToggle={actions.toggleType} />
        <FilterDropdown label="Creator" icon={<PersonIcon />} options={CREATOR_OPTIONS} selected={creators} onToggle={actions.toggleCreator} />
        <FilterDropdown label="Tags" icon={<TagIcon />} options={TAG_OPTIONS} selected={tags} onToggle={actions.toggleTag} />
        <button className={`${styles.filterBtn} ${totalExtra > 0 ? styles.filterBtnActive : ''}`} onClick={onOpenDrawer}>
          <FunnelIcon />All Filters
          {totalAll > 0 && <span className={styles.filterCount}>{totalAll}</span>}
        </button>
      </div>
      <div className={styles.filterRight}>
        <div className={styles.scopeWrap} ref={scopeRef}>
          <div className={styles.comboPill}>
            <div className={styles.comboSearch}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className={styles.searchIcon}>
                <circle cx="6" cy="6" r="4.5" stroke="#9ca3af" strokeWidth="1.4"/>
                <path d="M9.5 9.5l2.5 2.5" stroke="#9ca3af" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              <input
                ref={inputRef}
                className={styles.searchInput}
                type="text"
                placeholder="Search…"
                value={searchQuery}
                onChange={(e) => { actions.setSearch(e.target.value); setSuggestionsOpen(true) }}
                onFocus={() => { if (searchQuery.trim()) setSuggestionsOpen(true) }}
                onKeyDown={(e) => { if (e.key === 'Escape' || e.key === 'Enter') setSuggestionsOpen(false) }}
              />
              {searchQuery && (
                <button className={styles.searchClear} onClick={() => actions.setSearch('')}>✕</button>
              )}
            </div>
            <div className={styles.comboDivider} />
            <button
              className={`${styles.comboEvery} ${searchScope !== 'everywhere' ? styles.comboEveryActive : ''}`}
              onClick={() => setScopeOpen((o) => !o)}
            >
              {scopeLabel}
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d={scopeOpen ? 'M3 9l4-4 4 4' : 'M3 5l4 4 4-4'} stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
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
          {suggestionsOpen && suggestedTags.length > 0 && (
            <div className={styles.suggestionsDropdown}>
              <div className={styles.suggestionsHeader}>
                <span className={styles.suggestionsQuery}>Search for "{searchQuery}"</span>
                <span className={styles.suggestionsHint}>Press Enter</span>
              </div>
              <div className={styles.suggestionsSection}>SUGGESTED TAGS</div>
              {suggestedTags.map((tag) => {
                const isActive = tags.includes(tag)
                return (
                  <div key={tag} className={styles.suggestionRow}>
                    <span className={styles.suggestionTagIcon}>
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                        <path d="M1 1h6l6 6-6 6-6-6V1z" stroke="#9ca3af" strokeWidth="1.3" strokeLinejoin="round"/>
                        <circle cx="4.5" cy="4.5" r="1" fill="#9ca3af"/>
                      </svg>
                    </span>
                    <span className={styles.suggestionTagName}>{tag}</span>
                    <button
                      className={`${styles.suggestionAction} ${isActive ? styles.suggestionRemove : styles.suggestionAdd}`}
                      onClick={() => { actions.toggleTag(tag); if (!isActive) setSuggestionsOpen(false) }}
                    >
                      {isActive ? 'Remove Filter' : 'Add Filter'}
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const COL_DEFS: { id: string; label: string; locked?: boolean }[] = [
  { id: 'title',      label: 'Title',       locked: true },
  { id: 'type',       label: 'Type' },
  { id: 'theme',      label: 'Theme' },
  { id: 'language',   label: 'Language' },
  { id: 'totalTours', label: 'Total Tours' },
  { id: 'tags',       label: 'Tags' },
  { id: 'access',     label: 'Access' },
  { id: 'usage',      label: 'Usage' },
  { id: 'created',    label: 'Created' },
  { id: 'modified',   label: 'Modified' },
  { id: 'creator',    label: 'Creator' },
  { id: 'owner',      label: 'Owner' },
]

function DemoTable({ rows, filters, actions, favorited: favoritedProp, onToggleFav, reportLabel = 'Full Demo Report' }: {
  rows: DemoRow[]
  filters: Filters
  actions: FilterActions
  favorited?: Set<string>
  onToggleFav?: (id: string) => void
  reportLabel?: string
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [localFavorited, setLocalFavorited] = useState<Set<string>>(new Set())
  const favorited = favoritedProp ?? localFavorited
  const [starred, setStarred] = useState<Set<string>>(new Set())
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)
  const [historyRow, setHistoryRow] = useState<DemoRow | null>(null)
  const [viewMode, setViewMode] = useState<'table' | 'tile'>('table')
  const [visibleCols, setVisibleCols] = useState<Set<string>>(
    new Set(COL_DEFS.map((c) => c.id))
  )
  const [downloadOpen, setDownloadOpen] = useState(false)
  const downloadRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!downloadOpen) return
    function handleClick(e: MouseEvent) {
      if (downloadRef.current && !downloadRef.current.contains(e.target as Node)) {
        setDownloadOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [downloadOpen])

  function toggleCol(id: string) {
    setVisibleCols((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const col = (id: string) => visibleCols.has(id)

  const q = filters.searchQuery.toLowerCase().trim()

  // Determine which rows are in scope based on openFolder
  const scopedRows = filters.openFolder
    ? rows.filter((r) => r.parentFolder === filters.openFolder)
    : rows.filter((r) => !r.parentFolder)

  const filtered = scopedRows.filter((r) => {
    if (filters.types.length > 0 && !filters.types.includes(r.type)) return false
    if (filters.creators.length > 0 && !filters.creators.includes(r.creator)) return false
    if (filters.tags.length > 0 && !filters.tags.some((t) => r.tags.includes(t.toLowerCase()))) return false
    if (filters.themes.length > 0 && r.theme && !filters.themes.includes(r.theme)) return false
    if (filters.languages.length > 0 && !filters.languages.includes(r.language ?? 'English')) return false
    if (filters.owners.length > 0 && !filters.owners.includes(r.owner ?? r.creator)) return false
    if (q) {
      const haystack = [r.title, r.type, r.creator, ...r.tags].join(' ').toLowerCase()
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
    if (onToggleFav) {
      onToggleFav(id)
    } else {
      setLocalFavorited((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
    }
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

  const [detailRow, setDetailRow] = useState<DemoRow | null>(null)

  function handleRowClick(row: DemoRow) {
    if (row.type === 'Folder') {
      setSelected(new Set())
      actions.openFolder(row.title)
    } else {
      setDetailRow(row)
    }
  }

  return (
    <div className={styles.tableSection}>
      <hr className={styles.tableDivider} />
      <div className={styles.tableToolbar}>
        <div className={styles.toolbarLeft}>
          {filters.openFolder && (
            <div className={styles.folderBreadcrumb} style={{ margin: 0 }}>
              <button className={styles.breadcrumbBack} onClick={actions.closeFolder}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 11L4 7l5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back
              </button>
              <span className={styles.breadcrumbSep}>/</span>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M1 3.5C1 2.67 1.67 2 2.5 2H5.5L7 3.5H11.5C12.33 3.5 13 4.17 13 5V10.5C13 11.33 12.33 12 11.5 12H2.5C1.67 12 1 11.33 1 10.5V3.5Z" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1.2" strokeLinejoin="round"/>
              </svg>
              <span className={styles.breadcrumbFolder}>{filters.openFolder}</span>
            </div>
          )}
        </div>
        <div className={styles.toolbarRight}>
          <div className={styles.downloadWrap} ref={downloadRef}>
            <button
              className={styles.downloadBtn}
              onClick={() => setDownloadOpen((o) => !o)}
              title="Download report"
            >
              <img src={cloudDownloadIconUrl} alt="Download" width={18} height={18} style={{ display: 'block', objectFit: 'contain' }} />
            </button>
            {downloadOpen && (
              <div className={styles.downloadDropdown}>
                <button className={styles.downloadItem} onClick={() => setDownloadOpen(false)}>
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 11h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                  {reportLabel}
                </button>
              </div>
            )}
          </div>
          {viewMode === 'table' && (
            <ColumnSelector cols={COL_DEFS} visible={visibleCols} onToggle={toggleCol} />
          )}
          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewBtn} ${viewMode === 'table' ? styles.viewBtnActive : ''}`}
              onClick={() => setViewMode('table')}
              title="Table view"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="12" height="2.5" rx="1" fill="currentColor"/>
                <rect x="1" y="5.5" width="12" height="2.5" rx="1" fill="currentColor"/>
                <rect x="1" y="10" width="12" height="2.5" rx="1" fill="currentColor"/>
              </svg>
            </button>
            <button
              className={`${styles.viewBtn} ${viewMode === 'tile' ? styles.viewBtnActive : ''}`}
              onClick={() => setViewMode('tile')}
              title="Tile view"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5.5" height="5.5" rx="1.2" fill="currentColor"/>
                <rect x="7.5" y="1" width="5.5" height="5.5" rx="1.2" fill="currentColor"/>
                <rect x="1" y="7.5" width="5.5" height="5.5" rx="1.2" fill="currentColor"/>
                <rect x="7.5" y="7.5" width="5.5" height="5.5" rx="1.2" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

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
      {viewMode === 'table' && <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thCheck}>
                <input type="checkbox" className={styles.checkbox} checked={allSelected}
                  ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected }}
                  onChange={toggleAll} />
              </th>
              <th className={styles.thIcon} />
              <th className={styles.thIconLabel}>Promoted</th>
              <th className={styles.thIcon} />
              <th className={styles.th}>Title</th>
              {col('type')       && <th className={styles.th}>Type</th>}
              {col('theme')      && <th className={styles.th}>Theme</th>}
              {col('language')   && <th className={styles.th}>Language</th>}
              {col('totalTours') && <th className={styles.th}>Total Tours</th>}
              {col('tags')       && <th className={styles.th}>Tags</th>}
              {col('access')     && <th className={styles.th}>Access</th>}
              {col('usage')      && <th className={styles.th}>Usage</th>}
              {col('created')    && <th className={styles.th}>Created ↓</th>}
              {col('modified')   && <th className={styles.th}>Modified</th>}
              {col('creator')    && <th className={styles.th}>Creator</th>}
              {col('owner')      && <th className={styles.th}>Owner</th>}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr><td colSpan={15} className={styles.tableEmpty}>No results match the selected filters.</td></tr>
            ) : (
              paginated.map((row) => {
                const visibleTags = row.tags.slice(0, MAX_VISIBLE_TAGS)
                const extraTags = row.tags.length - MAX_VISIBLE_TAGS
                return (
                  <tr key={row.id} className={`${styles.tr} ${selected.has(row.id) ? styles.trSelected : ''} ${row.type === 'Folder' ? styles.trFolder : ''}`} onClick={() => handleRowClick(row)}>
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
                    <td className={styles.td}>
                      <div className={styles.titleCell}>
                        <span className={`${styles.rowTitle} ${row.type === 'Folder' ? styles.rowTitleFolder : ''}`}>{row.title}</span>
                      </div>
                    </td>
                    {col('type') && (
                      <td className={styles.td}>
                        <span className={styles.typeIconWrap}>
                          {row.type === 'Folder' ? (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M1.5 4C1.5 3.17 2.17 2.5 3 2.5H6.5L8 4H13C13.83 4 14.5 4.67 14.5 5.5V12C14.5 12.83 13.83 13.5 13 13.5H3C2.17 13.5 1.5 12.83 1.5 12V4Z" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1.2" strokeLinejoin="round"/>
                            </svg>
                          ) : row.type === T2 ? (
                            <img src={standardPIconUrl} alt={T2} width="16" height="16" style={{ objectFit: 'contain', display: 'block' }} />
                          ) : row.type === T3 ? (
                            <img src={singleExpIconUrl} alt={T3} width="16" height="16" style={{ objectFit: 'contain', display: 'block' }} />
                          ) : row.type === T1 ? (
                            <img src={discoveryDemoIconUrl} alt={T1} width="16" height="16" style={{ objectFit: 'contain', display: 'block' }} />
                          ) : (
                            <span className={styles.typeBadge}>{row.type}</span>
                          )}
                          <span className={styles.typeTooltip}>{row.type}</span>
                        </span>
                      </td>
                    )}
                    {col('theme')      && <td className={styles.tdMeta}>{row.theme || '—'}</td>}
                    {col('language')   && <td className={styles.tdMeta}>{row.language || '—'}</td>}
                    {col('totalTours') && <td className={styles.tdMeta}>{row.type === 'Folder' ? '—' : row.totalTours}</td>}
                    {col('tags')       && (
                      <td className={styles.td}>
                        <div className={styles.tagList}>
                          {visibleTags.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
                          {extraTags > 0 && <span className={styles.tagExtra}>+{extraTags}</span>}
                        </div>
                      </td>
                    )}
                    {col('access')     && <td className={styles.tdMeta}>{row.access || '—'}</td>}
                    {col('usage')      && <td className={styles.tdMeta}>{row.usage}</td>}
                    {col('created')    && <td className={styles.tdMeta}>{row.created}</td>}
                    {col('modified')   && (
                      <td className={styles.tdMeta} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.modifiedLink} onClick={() => setHistoryRow(row)}>
                          {row.modified}
                        </button>
                      </td>
                    )}
                    {col('creator')    && (
                      <td className={styles.td}>
                        <div className={styles.creatorCell}>
                          <span className={styles.creatorAvatarSm} style={{ background: row.creatorColor }}>{row.creatorInitials}</span>
                          <span className={styles.creatorFirstName}>{row.creator}</span>
                        </div>
                      </td>
                    )}
                    {col('owner')      && <td className={styles.tdMeta}>{row.owner || '—'}</td>}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>}

      {viewMode === 'tile' && (
        <div className={styles.tileGrid}>
          {paginated.length === 0 ? (
            <div className={styles.tableEmpty} style={{ gridColumn: '1 / -1' }}>No results match the selected filters.</div>
          ) : paginated.map((row) => (
            <div
              key={row.id}
              className={`${styles.tileCard} ${selected.has(row.id) ? styles.tileCardSelected : ''} ${row.type === 'Folder' ? styles.tileCardFolder : ''}`}
              onClick={() => handleRowClick(row)}
            >
              <div className={styles.tileThumb}>
                {row.type === 'Folder' ? (
                  <svg width="32" height="32" viewBox="0 0 14 14" fill="none">
                    <path d="M1 3.5C1 2.67 1.67 2 2.5 2H5.5L7 3.5H11.5C12.33 3.5 13 4.17 13 5V10.5C13 11.33 12.33 12 11.5 12H2.5C1.67 12 1 11.33 1 10.5V3.5Z" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1.2" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="28" height="28" viewBox="0 0 16 16" fill="none">
                    <rect x="1" y="2" width="14" height="10" rx="1.5" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="1"/>
                    <path d="M6 5.5l4 2.5-4 2.5V5.5z" fill="#9ca3af"/>
                  </svg>
                )}
              </div>

              <div className={styles.tileBody}>
                <div className={styles.tileTitleRow}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={selected.has(row.id)}
                    onChange={() => toggleRow(row.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className={styles.tileTitle}>{row.title}</span>
                </div>

                {row.type !== 'Folder' && row.description && (
                  <p className={styles.tileDescription}>{row.description}</p>
                )}

                <div className={styles.tileMeta}>
                  <span className={styles.typeBadge}>{row.type}</span>
                  {row.tags.slice(0, 2).map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                  {row.tags.length > 2 && <span className={styles.tagExtra}>+{row.tags.length - 2}</span>}
                </div>

                <div className={styles.tileFreshness}>
                  <div className={styles.freshnessBar} style={{ flex: 1 }}>
                    <div
                      className={styles.freshnessFill}
                      style={{
                        width: `${Math.min(row.freshness * 6, 100)}%`,
                        background: row.freshness > 70 ? '#059669' : row.freshness >= 30 ? '#b45309' : '#dc2626',
                      }}
                    />
                  </div>
                  <span className={styles.freshnessPct}>{row.freshness}%</span>
                </div>

                <div className={styles.tileFooter}>
                  <span className={styles.creatorAvatarSm} style={{ background: row.creatorColor }}>{row.creatorInitials}</span>
                  <span className={styles.tileCreator}>{row.creator}</span>
                  <span className={styles.tileDot}>·</span>
                  <button className={styles.modifiedLink} style={{ fontSize: 11.5 }} onClick={(e) => { e.stopPropagation(); setHistoryRow(row) }}>{row.modified}</button>
                  <span className={styles.tileFavStar}>
                    <span className={`${styles.iconBtn} ${favorited.has(row.id) ? styles.iconBtnActive : ''}`} onClick={(e) => toggleFav(row.id, e)}>♥</span>
                    <span className={`${styles.iconBtn} ${starred.has(row.id) ? styles.iconBtnStarred : ''}`} onClick={(e) => toggleStar(row.id, e)}>★</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
      <HistoryDrawer row={historyRow} onClose={() => setHistoryRow(null)} />
      <DemoDetailDrawer row={detailRow} onClose={() => setDetailRow(null)} />
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
  const [search, setSearch] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function h(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  function handleOpen() {
    setOpen((o) => {
      if (!o) setTimeout(() => inputRef.current?.focus(), 0)
      else setSearch('')
      return !o
    })
  }

  const filtered = search.trim()
    ? options.filter((o) => o.toLowerCase().includes(search.toLowerCase()))
    : options

  return (
    <div className={styles.dropdownWrap} ref={ref}>
      <button className={`${styles.filterBtn} ${selected.length > 0 ? styles.filterBtnActive : ''}`} onClick={handleOpen}>
        {icon}{label}
        {selected.length > 0 && <span className={styles.filterCount}>{selected.length}</span>}
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 2 }}>
          <path d={open ? 'M2 8l4-4 4 4' : 'M2 4l4 4 4-4'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownSearch}>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className={styles.dropdownSearchIcon}>
              <circle cx="6" cy="6" r="4.5" stroke="#9ca3af" strokeWidth="1.4"/>
              <path d="M9.5 9.5l2.5 2.5" stroke="#9ca3af" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <input
              ref={inputRef}
              className={styles.dropdownSearchInput}
              type="text"
              placeholder={`Search ${label.toLowerCase()}…`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className={styles.dropdownSearchClear} onClick={() => setSearch('')}>✕</button>
            )}
          </div>
          <div className={styles.dropdownOptions}>
            {filtered.length === 0 ? (
              <div className={styles.dropdownEmpty}>No results</div>
            ) : (
              filtered.map((opt) => (
                <label key={opt} className={styles.dropdownItem}>
                  <input type="checkbox" className={styles.checkbox} checked={selected.includes(opt)} onChange={() => onToggle(opt)} />
                  <span className={styles.dropdownLabel}>{opt}</span>
                </label>
              ))
            )}
          </div>
          {selected.length > 0 && (
            <div className={styles.dropdownFooter}>
              <button className={styles.clearBtn} onClick={() => selected.forEach(onToggle)}>Clear all</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ── Suggestions Page ───────────────────────────────── */
const PEOPLE_PHOTO_IDS = [1005, 1010, 1011, 1012, 1025, 1027, 1028, 1059, 1062, 1074, 1079, 1047]

function CardThumbnail({ id }: { id: string }) {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) & 0xffff
  const bucket = hash % 7  // 0-4: person photo, 5: SaaS dashboard, 6: slide

  if (bucket <= 4) {
    const photoId = PEOPLE_PHOTO_IDS[hash % PEOPLE_PHOTO_IDS.length]
    return (
      <img
        src={`https://picsum.photos/id/${photoId}/320/180`}
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
    )
  }

  if (bucket === 5) {
    return (
      <svg width="100%" height="100%" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="180" fill="#f8fafc"/>
        <rect width="320" height="28" fill="#1e293b"/>
        <rect x="0" y="28" width="54" height="152" fill="#f1f5f9"/>
        <rect x="8" y="38" width="38" height="5" rx="2.5" fill="#cbd5e1"/>
        <rect x="8" y="50" width="30" height="5" rx="2.5" fill="#94a3b8"/>
        <rect x="8" y="62" width="34" height="5" rx="2.5" fill="#94a3b8"/>
        <rect x="8" y="74" width="28" height="5" rx="2.5" fill="#94a3b8"/>
        <rect x="8" y="86" width="32" height="5" rx="2.5" fill="#94a3b8"/>
        <rect x="8" y="10" width="50" height="9" rx="4.5" fill="rgba(255,255,255,0.25)"/>
        <circle cx="297" cy="14" r="7" fill="rgba(255,255,255,0.2)"/>
        <circle cx="281" cy="14" r="7" fill="rgba(255,255,255,0.2)"/>
        <rect x="62" y="36" width="58" height="34" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="0.8"/>
        <rect x="128" y="36" width="58" height="34" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="0.8"/>
        <rect x="194" y="36" width="58" height="34" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="0.8"/>
        <rect x="260" y="36" width="52" height="34" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="0.8"/>
        <rect x="68" y="42" width="22" height="4" rx="2" fill="#94a3b8"/>
        <rect x="68" y="52" width="16" height="7" rx="2" fill="#1e293b"/>
        <rect x="134" y="42" width="22" height="4" rx="2" fill="#94a3b8"/>
        <rect x="134" y="52" width="16" height="7" rx="2" fill="#1e293b"/>
        <rect x="200" y="42" width="22" height="4" rx="2" fill="#94a3b8"/>
        <rect x="200" y="52" width="16" height="7" rx="2" fill="#6366f1"/>
        <rect x="266" y="42" width="22" height="4" rx="2" fill="#94a3b8"/>
        <rect x="266" y="52" width="16" height="7" rx="2" fill="#10b981"/>
        <rect x="62" y="78" width="150" height="92" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="0.8"/>
        <rect x="68" y="84" width="34" height="4" rx="2" fill="#1e293b"/>
        <rect x="72" y="126" width="12" height="34" rx="2" fill="#6366f1" opacity="0.7"/>
        <rect x="90" y="114" width="12" height="46" rx="2" fill="#6366f1"/>
        <rect x="108" y="120" width="12" height="40" rx="2" fill="#6366f1" opacity="0.8"/>
        <rect x="126" y="106" width="12" height="54" rx="2" fill="#6366f1"/>
        <rect x="144" y="128" width="12" height="32" rx="2" fill="#6366f1" opacity="0.6"/>
        <rect x="162" y="116" width="12" height="44" rx="2" fill="#6366f1" opacity="0.85"/>
        <rect x="188" y="78" width="124" height="92" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="0.8"/>
        <rect x="194" y="84" width="38" height="4" rx="2" fill="#1e293b"/>
        <rect x="194" y="96" width="112" height="1" fill="#f1f5f9"/>
        <rect x="194" y="101" width="30" height="3" rx="1.5" fill="#94a3b8"/>
        <rect x="288" y="101" width="18" height="3" rx="1.5" fill="#10b981"/>
        <rect x="194" y="110" width="34" height="3" rx="1.5" fill="#94a3b8"/>
        <rect x="288" y="110" width="14" height="3" rx="1.5" fill="#f59e0b"/>
        <rect x="194" y="119" width="26" height="3" rx="1.5" fill="#94a3b8"/>
        <rect x="288" y="119" width="20" height="3" rx="1.5" fill="#6366f1"/>
        <rect x="194" y="128" width="32" height="3" rx="1.5" fill="#94a3b8"/>
        <rect x="288" y="128" width="16" height="3" rx="1.5" fill="#10b981"/>
        <rect x="194" y="137" width="28" height="3" rx="1.5" fill="#94a3b8"/>
        <rect x="288" y="137" width="22" height="3" rx="1.5" fill="#ef4444"/>
        <rect x="194" y="146" width="36" height="3" rx="1.5" fill="#94a3b8"/>
        <rect x="288" y="146" width="14" height="3" rx="1.5" fill="#6366f1"/>
        <rect x="194" y="155" width="24" height="3" rx="1.5" fill="#94a3b8"/>
        <rect x="288" y="155" width="18" height="3" rx="1.5" fill="#10b981"/>
      </svg>
    )
  }

  // bucket === 6: presentation slide
  return (
    <svg width="100%" height="100%" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="180" fill="#faf8f5"/>
      <rect x="210" y="0" width="110" height="180" fill="#f0ebe3" opacity="0.7"/>
      <rect x="248" y="0" width="72" height="180" fill="#e6ddd2" opacity="0.5"/>
      <circle cx="38" cy="30" r="12" fill="#c2410c"/>
      <text x="38" y="35" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white">C</text>
      <text x="28" y="78" fontSize="24" fontWeight="800" fill="#1a1a1a">Pre-sales</text>
      <text x="28" y="108" fontSize="24" fontWeight="800" fill="#1a1a1a">ROI</text>
      <rect x="28" y="120" width="78" height="3" rx="1.5" fill="#c2410c"/>
      <rect x="28" y="132" width="96" height="4" rx="2" fill="#94a3b8" opacity="0.5"/>
      <rect x="28" y="142" width="80" height="4" rx="2" fill="#94a3b8" opacity="0.35"/>
      <circle cx="272" cy="88" r="32" fill="#c2410c" opacity="0.07"/>
      <circle cx="294" cy="132" r="22" fill="#c2410c" opacity="0.05"/>
      <rect x="255" y="48" width="38" height="3" rx="1.5" fill="#c2410c" opacity="0.18"/>
      <rect x="248" y="58" width="48" height="3" rx="1.5" fill="#c2410c" opacity="0.1"/>
    </svg>
  )
}

/* ── Share / DemoBoard Modal ────────────────────────── */
function ShareModal({ asset, onClose }: { asset: SuggestedAsset | null; onClose: () => void }) {
  const [step, setStep] = useState<'form' | 'review'>('form')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [org, setOrg] = useState('')
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!asset) return
    setStep('form'); setFirstName(''); setLastName('')
    setEmail(''); setOrg(''); setSent(false); setErrors({})
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [asset, onClose])

  if (!asset) return null

  function validate() {
    const e: Record<string, string> = {}
    if (!firstName.trim()) e.firstName = 'Required'
    if (!lastName.trim()) e.lastName = 'Required'
    if (!email.trim()) e.email = 'Required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleReview() { if (validate()) setStep('review') }
  function handleSend() { setSent(true) }

  return (
    <div className={styles.shareOverlay} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className={styles.shareModal}>

        {/* Dark header */}
        <div className={styles.shareHeader}>
          <div>
            <p className={styles.shareHeaderTag}>SEND VIA CONSENSUS</p>
            <h2 className={styles.shareHeaderTitle}>
              {sent ? 'DemoBoard Sent!' : step === 'review' ? 'Review DemoBoard' : 'Create a DemoBoard'}
            </h2>
            {!sent && <p className={styles.shareHeaderSub}>Hello {asset.title.split(' ')[0]}</p>}
          </div>
          <button className={styles.shareClose} onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        {sent ? (
          <div className={styles.shareSentBody}>
            <div className={styles.shareSentIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <p className={styles.shareSentTitle}>DemoBoard created!</p>
            <p className={styles.shareSentDesc}>
              A link has been sent to <strong>{email}</strong>. They'll be able to explore this demo at their own pace.
            </p>
            <button className={styles.sharePrimaryBtn} onClick={onClose}>Done</button>
          </div>
        ) : step === 'form' ? (
          <div className={styles.shareBody}>
            <div className={styles.shareRow}>
              <div className={styles.shareField}>
                <label className={styles.shareLabel}>FIRST NAME <span className={styles.shareReq}>*</span></label>
                <input
                  className={`${styles.shareInput} ${errors.firstName ? styles.shareInputErr : ''}`}
                  placeholder="Jane"
                  value={firstName}
                  onChange={(e) => { setFirstName(e.target.value); setErrors((p) => ({ ...p, firstName: '' })) }}
                />
                {errors.firstName && <span className={styles.shareErrMsg}>{errors.firstName}</span>}
              </div>
              <div className={styles.shareField}>
                <label className={styles.shareLabel}>LAST NAME <span className={styles.shareReq}>*</span></label>
                <input
                  className={`${styles.shareInput} ${errors.lastName ? styles.shareInputErr : ''}`}
                  placeholder="Smith"
                  value={lastName}
                  onChange={(e) => { setLastName(e.target.value); setErrors((p) => ({ ...p, lastName: '' })) }}
                />
                {errors.lastName && <span className={styles.shareErrMsg}>{errors.lastName}</span>}
              </div>
            </div>

            <div className={styles.shareField}>
              <label className={styles.shareLabel}>RECIPIENT EMAIL <span className={styles.shareReq}>*</span></label>
              <input
                className={`${styles.shareInput} ${errors.email ? styles.shareInputErr : ''}`}
                placeholder="jane@company.com"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })) }}
              />
              {errors.email && <span className={styles.shareErrMsg}>{errors.email}</span>}
            </div>

            <div className={styles.shareField}>
              <label className={styles.shareLabel}>ORGANIZATION</label>
              <input
                className={styles.shareInput}
                placeholder="Acme Corp"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
              />
              <span className={styles.shareHint}>Optional — helps identify the demoboard later</span>
            </div>

            <div className={styles.shareFooter}>
              <button className={styles.shareCancelBtn} onClick={onClose}>Cancel</button>
              <button className={styles.sharePrimaryBtn} onClick={handleReview}>
                Review DemoBoard →
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.shareBody}>
            <div className={styles.shareReviewCard}>
              <div className={styles.shareReviewThumb}>
                <CardThumbnail id={asset.id} />
              </div>
              <div className={styles.shareReviewInfo}>
                <p className={styles.shareReviewLabel}>Demo</p>
                <p className={styles.shareReviewName}>{asset.title}</p>
              </div>
            </div>

            <div className={styles.shareReviewRows}>
              <div className={styles.shareReviewRow}><span>Recipient</span><strong>{firstName} {lastName}</strong></div>
              <div className={styles.shareReviewRow}><span>Email</span><strong>{email}</strong></div>
              {org && <div className={styles.shareReviewRow}><span>Organization</span><strong>{org}</strong></div>}
            </div>

            <div className={styles.shareFooter}>
              <button className={styles.shareCancelBtn} onClick={() => setStep('form')}>← Back</button>
              <button className={styles.sharePrimaryBtn} onClick={handleSend}>
                Send DemoBoard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Demo Preview Modal ─────────────────────────────── */
function DemoPreviewModal({ asset, onClose }: { asset: SuggestedAsset | null; onClose: () => void }) {
  const [copied, setCopied] = useState(false)

  const shareLink = asset ? `https://demo.example.com/share/${asset.id}` : ''

  function copyLink() {
    navigator.clipboard.writeText(shareLink).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    if (!asset) return
    setCopied(false)
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [asset, onClose])

  if (!asset) return null

  return (
    <div className={styles.previewOverlay} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className={styles.previewModal}>
        {/* Header */}
        <div className={styles.previewHeader}>
          <div className={styles.previewHeaderLeft}>
            <DemoTypeIcon type={asset.type} size={16} />
            <span className={styles.previewTypeLabel}>{asset.type}</span>
          </div>
          <button className={styles.previewClose} onClick={onClose} title="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Player area */}
        <div className={styles.previewPlayer}>
          <div className={styles.previewThumb}>
            <CardThumbnail id={asset.id} />
            <div className={styles.previewPlayBtn}>
              <div className={styles.previewPlayCircle}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <polygon points="10,6 22,14 10,22" fill="white"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className={styles.previewInfo}>
          <h2 className={styles.previewTitle}>{asset.title}</h2>
          <div className={styles.previewMeta}>
            <span className={styles.previewAvatar} style={{ background: asset.creatorColor }}>
              {asset.creatorInitials}
            </span>
            <span className={styles.previewCreator}>Created by {asset.creatorInitials}</span>
            <span className={styles.previewDot}>·</span>
            <span className={styles.previewDemosCount}>Used in {asset.inDemos} demos</span>
          </div>

          <div className={styles.previewStats}>
            <div className={styles.previewStat}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>
              </svg>
              <span>{Math.floor(Math.random() * 900 + 100)} views</span>
            </div>
            <div className={styles.previewStat}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
              <span>{Math.floor(Math.random() * 50 + 5)} shares</span>
            </div>
            <div className={styles.previewStat}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>Updated 3 days ago</span>
            </div>
          </div>
        </div>

        {/* Share link row */}
        <div className={styles.previewShareRow}>
          <div className={styles.previewLinkWrap}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: '#9ca3af' }}>
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
            <input
              className={styles.previewLinkInput}
              value={shareLink}
              readOnly
              onFocus={(e) => e.target.select()}
            />
          </div>
          <button
            className={`${styles.previewCopyBtn} ${copied ? styles.previewCopyBtnCopied : ''}`}
            onClick={copyLink}
          >
            {copied ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                Copy link
              </>
            )}
          </button>
        </div>

        {/* Footer actions */}
        <div className={styles.previewFooter}>
          <button className={styles.previewOpenBtn}>
            Open Demo
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function SuggestionRow({ title, assets }: { title: string; assets: SuggestedAsset[] }) {
  const [previewAsset, setPreviewAsset] = useState<SuggestedAsset | null>(null)
  const [shareAsset, setShareAsset] = useState<SuggestedAsset | null>(null)
  return (
    <>
      <DemoPreviewModal asset={previewAsset} onClose={() => setPreviewAsset(null)} />
      <ShareModal asset={shareAsset} onClose={() => setShareAsset(null)} />
      <div className={styles.suggestSection}>
        <span className={styles.suggestSectionTitle}>{title}</span>
        <div className={styles.carouselTrack}>
          {assets.map((asset) => (
            <div key={asset.id} className={styles.suggestedCard}>
              <div className={styles.suggestedCardThumb}>
                <CardThumbnail id={asset.id} />
                <div className={styles.suggestedThumbPlay}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="rgba(255,255,255,0.2)"/>
                    <polygon points="6,4.5 12,8 6,11.5" fill="white"/>
                  </svg>
                </div>
                <span className={styles.suggestedAvatar} style={{ background: asset.creatorColor }}>
                  {asset.creatorInitials}
                </span>
              </div>
              <div className={styles.suggestedCardBody}>
                <div className={styles.suggestedTypeIcon}><DemoTypeIcon type={asset.type} size={13} /></div>
                <div className={styles.suggestedCardTitle}>{asset.title}</div>
                <div className={styles.suggestedCardFooter}>
                  <span className={styles.suggestedCardCount}>In {asset.inDemos} demos</span>
                  <div className={styles.suggestedCardActions}>
                    <button className={styles.suggestedActionBtn} title="Preview" onClick={() => setPreviewAsset(asset)}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </button>
                    <button className={styles.suggestedActionBtn} title="Share" onClick={() => setShareAsset(asset)}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function SuggestionsPage() {
  return (
    <div className={styles.suggestionsPage}>
      <SuggestionRow title="New" assets={SUGGESTIONS_RECENTS} />
      <SuggestionRow title="Recently Used" assets={SUGGESTIONS_FOR_DEAL} />
      <SuggestionRow title="Updated" assets={SUGGESTIONS_PROMOTED} />
      <SuggestionRow title="Most Viewed" assets={SUGGESTIONS_ASSETS} />
      <SuggestionRow title="Most Shared" assets={SUGGESTIONS_RECENTS} />
    </div>
  )
}

const SUGGESTED_TABS = ['New', 'Recently Used', 'Updated', 'Most Viewed', 'Most Shared'] as const
type SuggestedTab = typeof SUGGESTED_TABS[number]

function SuggestedCarousel({ assets, expanded: initialExpanded = true, hideTabs }: { assets: SuggestedAsset[]; expanded?: boolean; hideTabs?: boolean }) {
  const [collapsed, setCollapsed] = useState<boolean>(!initialExpanded)
  const [activeTab, setActiveTab] = useState<SuggestedTab>('New')
  const [previewAsset, setPreviewAsset] = useState<SuggestedAsset | null>(null)
  const [shareAsset, setShareAsset] = useState<SuggestedAsset | null>(null)

  const sorted = [...assets].sort((a, b) => {
    if (activeTab === 'New') return a.id.localeCompare(b.id)
    if (activeTab === 'Most Viewed' || activeTab === 'Most Shared') return b.inDemos - a.inDemos
    return 0
  })

  return (
    <>
    <DemoPreviewModal asset={previewAsset} onClose={() => setPreviewAsset(null)} />
    <ShareModal asset={shareAsset} onClose={() => setShareAsset(null)} />
    <section className={styles.suggestedSection}>
      <div className={styles.suggestedHeader}>
        <button className={styles.suggestedToggle} onClick={() => setCollapsed((c) => !c)}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: collapsed ? 'rotate(-90deg)' : 'none', transition: 'transform .2s' }}>
            <path d="M3 5l4 4 4-4" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className={styles.suggestedTitle}>Suggested demos for you</span>
        {!hideTabs && (
          <div className={styles.suggestedTabs}>
            {SUGGESTED_TABS.map((tab) => (
              <button
                key={tab}
                className={`${styles.suggestedTab} ${activeTab === tab ? styles.suggestedTabActive : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>

      {!collapsed && (
        <div className={styles.carouselTrack}>
          {sorted.map((asset) => (
            <div key={asset.id} className={styles.suggestedCard}>
              <div className={styles.suggestedCardThumb}>
                <CardThumbnail id={asset.id} />
                <div className={styles.suggestedThumbPlay}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="rgba(255,255,255,0.2)"/>
                    <polygon points="6,4.5 12,8 6,11.5" fill="white"/>
                  </svg>
                </div>
                <span className={styles.suggestedAvatar} style={{ background: asset.creatorColor }}>
                  {asset.creatorInitials}
                </span>
              </div>
              <div className={styles.suggestedCardBody}>
                <div className={styles.suggestedTypeIcon}><DemoTypeIcon type={asset.type} size={13} /></div>
                <div className={styles.suggestedCardTitle}>{asset.title}</div>
                <div className={styles.suggestedCardFooter}>
                  <span className={styles.suggestedCardCount}>In {asset.inDemos} demos</span>
                  <div className={styles.suggestedCardActions}>
                    <button className={styles.suggestedActionBtn} title="Preview" onClick={() => setPreviewAsset(asset)}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </button>
                    <button className={styles.suggestedActionBtn} title="Share" onClick={() => setShareAsset(asset)}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
    </>
  )
}

/* ── Demo Detail Drawer ─────────────────────────────── */
type DetailTab = 'details' | 'usage' | 'tags' | 'activity'

function DemoDetailDrawer({ row, onClose }: { row: DemoRow | null; onClose: () => void }) {
  const [tab, setTab] = useState<DetailTab>('details')

  useEffect(() => { if (row) setTab('details') }, [row])

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!row) return null

  const engagementRate = Math.min(95, 50 + row.usage % 46)
  const usedInDemos = Math.max(1, Math.floor(row.usage / 20))

  return (
    <>
      <div className={styles.detailOverlay} onClick={onClose} />
      <aside className={styles.detailDrawer}>
        {/* Header */}
        <div className={styles.detailHeader}>
          <span className={styles.detailHeaderTitle}>Demo</span>
          <button className={styles.detailClose} onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Thumbnail */}
        <div className={styles.detailThumb}>
          <div className={styles.detailPlayBtn}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="11" r="11" fill="rgba(255,255,255,0.15)"/>
              <polygon points="8,6 17,11 8,16" fill="white"/>
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className={styles.detailTitleRow}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="#6b7280" strokeWidth="1.3"/>
            <polygon points="5.5,4.5 10,7 5.5,9.5" fill="#6b7280"/>
          </svg>
          <span className={styles.detailTitle}>{row.title}</span>
          <button className={styles.detailEditBtn}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className={styles.detailTabs}>
          {(['details','usage','tags','activity'] as DetailTab[]).map((t) => (
            <button key={t} className={`${styles.detailTab} ${tab === t ? styles.detailTabActive : ''}`} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className={styles.detailBody}>
          {tab === 'details' && (
            <>
              <div className={styles.detailSection}>
                <div className={styles.detailSectionTitle}>Demo Details</div>
                {[
                  ['Name', row.title],
                  ['Created', row.created],
                  ['Owner', row.owner || row.creator],
                  ['Creator', row.creator],
                  ['Last modified', row.modified],
                  ['Type', row.type],
                  ['Language', row.language || 'English'],
                  ['Used in', `${usedInDemos} demos`],
                  ['Access', row.access || 'Team'],
                  ['Tags', row.tags.join(', ') || '—'],
                ].map(([label, value]) => (
                  <div key={label} className={styles.detailRow}>
                    <span className={styles.detailLabel}>{label}</span>
                    <span className={styles.detailValue}>{value}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === 'usage' && (
            <div className={styles.detailSection}>
              <div className={styles.detailSectionTitle}>Usage Analytics</div>
              {[
                ['Total views', row.usage.toString()],
                ['Used in demos', `${usedInDemos} demos`],
                ['Engagement rate', `${engagementRate}%`],
                ['Avg. time spent', `${Math.floor(engagementRate / 10)}m ${engagementRate % 10 * 6}s`],
                ['Shares', `${Math.floor(row.usage / 8)}`],
                ['Last viewed', row.modified],
                ['Peak month', 'May 2026'],
              ].map(([label, value]) => (
                <div key={label} className={styles.detailRow}>
                  <span className={styles.detailLabel}>{label}</span>
                  <span className={styles.detailValue}>{value}</span>
                </div>
              ))}
              <div className={styles.detailEngBar}>
                <div className={styles.detailEngLabel}>Engagement</div>
                <div className={styles.detailEngTrack}>
                  <div className={styles.detailEngFill} style={{ width: `${engagementRate}%` }} />
                </div>
                <span className={styles.detailEngPct}>{engagementRate}%</span>
              </div>
            </div>
          )}

          {tab === 'tags' && (
            <div className={styles.detailSection}>
              <div className={styles.detailSectionTitle}>Tags</div>
              <div className={styles.detailTagCloud}>
                {row.tags.length > 0
                  ? row.tags.map((t) => <span key={t} className={styles.detailTagPill}>{t}</span>)
                  : <p className={styles.detailEmpty}>No tags assigned.</p>}
              </div>
              <div className={styles.detailSectionTitle} style={{ marginTop: 20 }}>Suggested Tags</div>
              <div className={styles.detailTagCloud}>
                {['onboarding', 'product', 'sales', 'enterprise', 'api', 'security']
                  .filter((t) => !row.tags.includes(t))
                  .slice(0, 5)
                  .map((t) => <span key={t} className={styles.detailTagPillGhost}>{t}</span>)}
              </div>
            </div>
          )}

          {tab === 'activity' && (
            <div className={styles.detailSection}>
              <div className={styles.detailSectionTitle}>Recent Activity</div>
              {[
                { date: row.modified, actor: row.creator, action: 'Updated content' },
                { date: row.created, actor: row.owner || row.creator, action: 'Created demo' },
                { date: '04/10/26', actor: 'Alex', action: 'Added to 3 demos' },
                { date: '03/22/26', actor: row.creator, action: 'Changed access to Team' },
                { date: '03/01/26', actor: 'Jamie', action: 'Shared via public link' },
              ].map((item, i) => (
                <div key={i} className={styles.detailActivityItem}>
                  <div className={styles.detailActivityDot} />
                  <div className={styles.detailActivityContent}>
                    <div className={styles.detailActivityAction}>{item.action}</div>
                    <div className={styles.detailActivityMeta}>{item.actor} · {item.date}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.detailFooter}>
          <button className={styles.detailCancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.detailShareBtn}>Share</button>
        </div>
      </aside>
    </>
  )
}

function Sidebar() {
  const [libraryOpen, setLibraryOpen] = useState(true)

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarTop}>
        {/* Logo */}
        <div className={styles.logo}>
          <img src={logoUrl} alt="Logo" width="44" height="44" style={{objectFit:'contain'}}/>
        </div>

        <nav className={styles.sidebarNav}>
          {/* Dashboard — Material: refresh */}
          <div className={styles.navRow}>
            <svg className={styles.navIcon} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
            <span className={styles.navLabel}>Dashboard</span>
          </div>

          {/* Create — Material: add */}
          <div className={styles.navRow}>
            <svg className={styles.navIcon} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            <span className={styles.navLabel}>Create</span>
            <svg className={styles.navChevron} width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Share — Material: play_arrow */}
          <div className={styles.navRow}>
            <svg className={styles.navIcon} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span className={styles.navLabel}>Share</span>
            <svg className={styles.navChevron} width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Library — Material: assignment (clipboard) */}
          <div className={`${styles.navRow} ${styles.navRowAccent}`} onClick={() => setLibraryOpen(o => !o)} style={{cursor:'pointer'}}>
            <svg className={styles.navIcon} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            <span className={styles.navLabel}>Library</span>
            <svg className={styles.navChevron} width="12" height="12" viewBox="0 0 12 12" fill="none" style={{transform: libraryOpen ? 'rotate(90deg)' : 'none', transition:'transform .2s'}}>
              <path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {libraryOpen && (
            <div className={styles.navSubGroup}>
              <div className={`${styles.navSubItem} ${styles.navSubItemActive}`}>Demos</div>
              <div className={styles.navSubItem}>Dynamic Tours</div>
            </div>
          )}

          {/* Leads — Material: filter_alt */}
          <div className={styles.navRow}>
            <svg className={styles.navIcon} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39C20.25 4.95 19.78 4 18.95 4H5.04c-.83 0-1.3.95-.79 1.61z"/>
            </svg>
            <span className={styles.navLabel}>Leads</span>
          </div>

          {/* DemoBoards — Material: view_kanban */}
          <div className={styles.navRow}>
            <svg className={styles.navIcon} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3h5v18H3V3zm13 0h5v8h-5V3zm0 10h5v8h-5v-8zM9 3h5v11H9V3zm0 13h5v5H9v-5z"/>
            </svg>
            <span className={styles.navLabel}>DemoBoards</span>
          </div>

          {/* Public Links — Material: link */}
          <div className={styles.navRow}>
            <svg className={styles.navIcon} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z"/>
            </svg>
            <span className={styles.navLabel}>Public Links</span>
          </div>

          {/* Partners — Material: account_tree */}
          <div className={styles.navRow}>
            <svg className={styles.navIcon} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3z"/>
            </svg>
            <span className={styles.navLabel}>Partners</span>
            <svg className={styles.navChevron} width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Analytics — Material: bar_chart */}
          <div className={styles.navRow}>
            <svg className={styles.navIcon} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 9h4v11H4zm12 4h4v7h-4zm-6-9h4v16h-4z"/>
            </svg>
            <span className={styles.navLabel}>Analytics</span>
            <svg className={styles.navChevron} width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </nav>
      </div>
    </aside>
  )
}

/* ── Column Selector ────────────────────────────────── */
function ColumnSelector({
  cols, visible, onToggle,
}: { cols: typeof COL_DEFS; visible: Set<string>; onToggle: (id: string) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const hiddenCount = cols.filter((c) => !c.locked && !visible.has(c.id)).length

  return (
    <div className={styles.dropdownWrap} ref={ref}>
      <button
        className={`${styles.colSelectorBtn} ${hiddenCount > 0 ? styles.colSelectorBtnActive : ''}`}
        onClick={() => setOpen((o) => !o)}
        title="Customize columns"
      >
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="1" width="3.5" height="12" rx="1" stroke="currentColor" strokeWidth="1.3"/>
          <rect x="5.25" y="1" width="3.5" height="12" rx="1" stroke="currentColor" strokeWidth="1.3"/>
          <rect x="9.5" y="1" width="3.5" height="12" rx="1" stroke="currentColor" strokeWidth="1.3"/>
        </svg>
        Columns
        {hiddenCount > 0 && <span className={styles.filterCount}>{cols.filter((c) => !c.locked).length - hiddenCount} / {cols.filter((c) => !c.locked).length}</span>}
      </button>
      {open && (
        <div className={`${styles.dropdown} ${styles.colSelectorDropdown}`}>
          <div className={styles.colSelectorHeader}>
            <span>Columns</span>
            <button
              className={styles.colSelectorReset}
              onClick={() => cols.filter((c) => !c.locked && !visible.has(c.id)).forEach((c) => onToggle(c.id))}
            >
              Show all
            </button>
          </div>
          <div className={styles.dropdownOptions}>
            {cols.map((col) => (
              <label
                key={col.id}
                className={`${styles.dropdownItem} ${col.locked ? styles.colItemLocked : ''}`}
              >
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={visible.has(col.id)}
                  disabled={col.locked}
                  onChange={() => !col.locked && onToggle(col.id)}
                />
                <span className={styles.dropdownLabel}>{col.label}</span>
                {col.locked && <span className={styles.colLockBadge}>Always on</span>}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ── History Drawer ─────────────────────────────────── */
const EVENT_LABELS: Record<HistoryEvent['type'], string> = {
  edit: 'Edited',
  publish: 'Published',
  add: 'Content added',
  remove: 'Content removed',
  rename: 'Renamed',
  tag: 'Tags updated',
  create: 'Created',
}
const EVENT_COLORS: Record<HistoryEvent['type'], string> = {
  edit: '#6b7280',
  publish: '#059669',
  add: '#2563eb',
  remove: '#dc2626',
  rename: '#7c3aed',
  tag: '#b45309',
  create: '#374151',
}

function HistoryDrawer({ row, onClose }: { row: DemoRow | null; onClose: () => void }) {
  const open = row !== null

  useEffect(() => {
    function h(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    if (open) document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [open, onClose])

  const events = row ? getHistory(row) : []
  const isFolder = row?.type === 'Folder'

  return (
    <>
      <div
        className={`${styles.drawerOverlay} ${open ? styles.drawerOverlayVisible : ''}`}
        onClick={onClose}
      />
      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}>
        {row && (
          <>
            <div className={styles.drawerHeader}>
              <div className={styles.historyHeaderLeft}>
                <div className={styles.historyTitle}>
                  {isFolder && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M1 3.5C1 2.67 1.67 2 2.5 2H5.5L7 3.5H11.5C12.33 3.5 13 4.17 13 5V10.5C13 11.33 12.33 12 11.5 12H2.5C1.67 12 1 11.33 1 10.5V3.5Z" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1.2" strokeLinejoin="round"/>
                    </svg>
                  )}
                  <span>{row.title}</span>
                </div>
                <div className={styles.historySubtitle}>
                  {isFolder ? 'Folder activity' : `${row.type} · Change history`}
                </div>
              </div>
              <button className={styles.drawerClose} onClick={onClose}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className={styles.drawerBody}>
              <div className={styles.historyTimeline}>
                {events.map((evt, i) => (
                  <div key={evt.id} className={styles.historyItem}>
                    <div className={styles.historyLineCol}>
                      <div
                        className={styles.historyDot}
                        style={{ background: EVENT_COLORS[evt.type] }}
                      />
                      {i < events.length - 1 && <div className={styles.historyLine} />}
                    </div>
                    <div className={styles.historyContent}>
                      <div className={styles.historyEventRow}>
                        <span
                          className={styles.historyEventType}
                          style={{ color: EVENT_COLORS[evt.type] }}
                        >
                          {EVENT_LABELS[evt.type]}
                        </span>
                        <span className={styles.historyDate}>{evt.date}</span>
                      </div>
                      <div className={styles.historyDescription}>{evt.description}</div>
                      {evt.detail && (
                        <div className={styles.historyDetail}>{evt.detail}</div>
                      )}
                      <div className={styles.historyActor}>
                        <span
                          className={styles.historyAvatar}
                          style={{ background: evt.actorColor }}
                        >
                          {evt.actorInitials}
                        </span>
                        <span className={styles.historyActorName}>{evt.actor}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.drawerFooter}>
              <button className={styles.drawerDoneBtn} onClick={onClose}>Close</button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

function CircleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4"/>
      <polygon points="5.5,4.5 10,7 5.5,9.5" fill="currentColor"/>
    </svg>
  )
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
function DemoTypeIcon({ type, size = 14 }: { type: string; size?: number }) {
  if (type === T1) return <img src={discoveryDemoIconUrl} alt={type} width={size} height={size} style={{ objectFit: 'contain', display: 'block' }} />
  if (type === T2) return <img src={standardPIconUrl} alt={type} width={size} height={size} style={{ objectFit: 'contain', display: 'block' }} />
  if (type === T3) return <img src={singleExpIconUrl} alt={type} width={size} height={size} style={{ objectFit: 'contain', display: 'block' }} />
  return <span style={{ fontSize: 11 }}>{type}</span>
}
function ThemeIcon() {
  return <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.4"/><path d="M7 1.5v11M1.5 7h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
}
function LanguageIcon() {
  return <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.4"/><path d="M7 1.5C5.5 3.5 4.5 5.2 4.5 7s1 3.5 2.5 5.5M7 1.5C8.5 3.5 9.5 5.2 9.5 7s-1 3.5-2.5 5.5M1.5 7h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
}

/* ── Drawer Section ─────────────────────────────────── */
interface DrawerSectionProps {
  label: string
  icon: React.ReactNode
  options: string[]
  selected: string[]
  onToggle: (v: string) => void
}

function DrawerSection({ label, icon, options, selected, onToggle }: DrawerSectionProps) {
  const [expanded, setExpanded] = useState(false)
  const [search, setSearch] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredOpts = search.trim()
    ? options.filter((o) => o.toLowerCase().includes(search.toLowerCase()))
    : options

  return (
    <div className={styles.drawerSection}>
      <button className={styles.drawerSectionHeader} onClick={() => setExpanded((e) => !e)}>
        <span className={styles.drawerSectionIcon}>{icon}</span>
        <span className={styles.drawerSectionName}>{label}</span>
        {selected.length > 0 && <span className={styles.drawerSectionCount}>{selected.length}</span>}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 'auto', flexShrink: 0 }}>
          <path d={expanded ? 'M2 8l4-4 4 4' : 'M2 4l4 4 4-4'} stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {expanded && (
        <div className={styles.drawerSectionBody}>
          <div className={styles.drawerSectionSearch}>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, color: '#9ca3af' }}>
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M9.5 9.5l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <input
              ref={inputRef}
              className={styles.drawerSectionSearchInput}
              type="text"
              placeholder={`Search ${label.toLowerCase()}…`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className={styles.drawerSectionSearchClear} onClick={() => { setSearch(''); inputRef.current?.focus() }}>✕</button>
            )}
          </div>
          <div className={styles.drawerSectionOptions}>
            {filteredOpts.length === 0 ? (
              <div className={styles.drawerSectionEmpty}>No results</div>
            ) : (
              filteredOpts.map((opt) => (
                <label key={opt} className={styles.drawerSectionItem}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={selected.includes(opt)}
                    onChange={() => onToggle(opt)}
                  />
                  <span className={styles.drawerSectionItemLabel}>{opt}</span>
                </label>
              ))
            )}
          </div>
          {selected.length > 0 && (
            <button className={styles.drawerSectionClear} onClick={() => selected.forEach(onToggle)}>
              Clear {label.toLowerCase()}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

/* ── Filter Drawer ──────────────────────────────────── */
function FilterDrawer({ open, onClose, filters, actions }: {
  open: boolean
  onClose: () => void
  filters: Filters
  actions: FilterActions
}) {
  useEffect(() => {
    function h(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    if (open) document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [open, onClose])

  const totalActive =
    filters.types.length + filters.creators.length + filters.tags.length +
    filters.themes.length + filters.languages.length + filters.owners.length

  return (
    <>
      <div
        className={`${styles.drawerOverlay} ${open ? styles.drawerOverlayVisible : ''}`}
        onClick={onClose}
      />
      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <span className={styles.drawerTitle}>All Filters</span>
          {totalActive > 0 && <span className={styles.drawerBadge}>{totalActive}</span>}
          <div style={{ flex: 1 }} />
          {totalActive > 0 && (
            <button className={styles.drawerClearAll} onClick={actions.clearAll}>Clear all</button>
          )}
          <button className={styles.drawerClose} onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.drawerBody}>
          <div className={styles.drawerGroupLabel}>Page Filters</div>
          <DrawerSection label="Type" icon={<CircleIcon />} options={TYPE_OPTIONS} selected={filters.types} onToggle={actions.toggleType} />
          <DrawerSection label="Creator" icon={<PersonIcon />} options={CREATOR_OPTIONS} selected={filters.creators} onToggle={actions.toggleCreator} />
          <DrawerSection label="Tags" icon={<TagIcon />} options={TAG_OPTIONS} selected={filters.tags} onToggle={actions.toggleTag} />

          <div className={styles.drawerDivider} />
          <div className={styles.drawerGroupLabel}>Extra Filters</div>
          <DrawerSection label="Theme" icon={<ThemeIcon />} options={THEME_OPTIONS} selected={filters.themes} onToggle={actions.toggleTheme} />
          <DrawerSection label="Language" icon={<LanguageIcon />} options={LANGUAGE_OPTIONS} selected={filters.languages} onToggle={actions.toggleLanguage} />
          <DrawerSection label="Owner" icon={<PersonIcon />} options={OWNER_OPTIONS} selected={filters.owners} onToggle={actions.toggleOwner} />
        </div>

        <div className={styles.drawerFooter}>
          <button className={styles.drawerDoneBtn} onClick={onClose}>Done</button>
        </div>
      </div>
    </>
  )
}
