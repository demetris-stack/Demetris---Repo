import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './DemoLibraryPage.module.css'

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
  description?: string
  parentFolder?: string
}

const MY_DEMOS_SUGGESTED: SuggestedAsset[] = [
  { id: 's1', title: 'Quick Start Guide', type: 'Walkthrough', creatorInitials: 'AM', creatorColor: '#374151', inDemos: 23 },
  { id: 's2', title: 'Onboarding Flow Walkthrough', type: 'Sim', creatorInitials: 'AM', creatorColor: '#374151', inDemos: 21 },
  { id: 's3', title: 'Feature Highlights Reel', type: 'Video', creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 19 },
  { id: 's4', title: 'Dashboard Overview', type: 'Video', creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 18 },
  { id: 's5', title: 'Settings & Permissions', type: 'Tour', creatorInitials: 'SR', creatorColor: '#7c3aed', inDemos: 16 },
  { id: 's6', title: 'Integrations Setup', type: 'Sim', creatorInitials: 'TK', creatorColor: '#0369a1', inDemos: 16 },
  { id: 's7', title: 'Analytics Deep Dive', type: 'Sim', creatorInitials: 'AM', creatorColor: '#374151', inDemos: 15 },
  { id: 's8', title: 'Competitive Battlecard Demo', type: 'Demo', creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 14 },
]

const DEMO_LIBRARY_SUGGESTED: SuggestedAsset[] = [
  { id: 'ls1', title: 'Platform Overview', type: 'Demo', creatorInitials: 'AM', creatorColor: '#374151', inDemos: 32 },
  { id: 'ls2', title: 'Product Tour 2026', type: 'Demo', creatorInitials: 'AM', creatorColor: '#374151', inDemos: 28 },
  { id: 'ls3', title: 'Enterprise Features', type: 'Presentation', creatorInitials: 'SR', creatorColor: '#7c3aed', inDemos: 24 },
  { id: 'ls4', title: 'API Walkthrough', type: 'Walkthrough', creatorInitials: 'JP', creatorColor: '#b45309', inDemos: 21 },
  { id: 'ls5', title: 'Security & Compliance', type: 'Presentation', creatorInitials: 'TK', creatorColor: '#0369a1', inDemos: 19 },
  { id: 'ls6', title: 'Deal Closing Playbook', type: 'Demo', creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 17 },
  { id: 'ls7', title: 'Onboarding Series Pt.1', type: 'Walkthrough', creatorInitials: 'TK', creatorColor: '#0369a1', inDemos: 16 },
  { id: 'ls8', title: 'Mobile App Demo', type: 'Demo', creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 14 },
]

const SUGGESTIONS_RECENTS: SuggestedAsset[] = [
  { id: 'rec1', title: 'Quick Start Guide', type: 'Walkthrough', creatorInitials: 'AM', creatorColor: '#374151', inDemos: 23 },
  { id: 'rec2', title: 'Dashboard Overview', type: 'Video', creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 18 },
  { id: 'rec3', title: 'Product Tour 2026', type: 'Demo', creatorInitials: 'AM', creatorColor: '#374151', inDemos: 28 },
  { id: 'rec4', title: 'Integrations Setup', type: 'Sim', creatorInitials: 'TK', creatorColor: '#0369a1', inDemos: 16 },
  { id: 'rec5', title: 'Mobile App Demo', type: 'Demo', creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 14 },
  { id: 'rec6', title: 'Analytics Deep Dive', type: 'Sim', creatorInitials: 'AM', creatorColor: '#374151', inDemos: 15 },
]

const SUGGESTIONS_FOR_DEAL: SuggestedAsset[] = [
  { id: 'deal1', title: 'Enterprise Features', type: 'Presentation', creatorInitials: 'SR', creatorColor: '#7c3aed', inDemos: 24 },
  { id: 'deal2', title: 'Deal Closing Playbook', type: 'Demo', creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 17 },
  { id: 'deal3', title: 'ROI Calculator Walkthrough', type: 'Walkthrough', creatorInitials: 'TK', creatorColor: '#0369a1', inDemos: 12 },
  { id: 'deal4', title: 'Security & Compliance', type: 'Presentation', creatorInitials: 'TK', creatorColor: '#0369a1', inDemos: 19 },
  { id: 'deal5', title: 'Executive Summary Deck', type: 'Presentation', creatorInitials: 'SR', creatorColor: '#7c3aed', inDemos: 11 },
  { id: 'deal6', title: 'Competitive Battlecard Demo', type: 'Demo', creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 14 },
]

const SUGGESTIONS_PROMOTED: SuggestedAsset[] = [
  { id: 'promo1', title: 'Platform Overview', type: 'Demo', creatorInitials: 'AM', creatorColor: '#374151', inDemos: 32 },
  { id: 'promo2', title: 'Brand Story Demo', type: 'Video', creatorInitials: 'JL', creatorColor: '#1d4ed8', inDemos: 29 },
  { id: 'promo3', title: 'Sales Enablement Kit', type: 'Webinar', creatorInitials: 'JP', creatorColor: '#b45309', inDemos: 26 },
  { id: 'promo4', title: 'Partner Enablement Kit', type: 'Presentation', creatorInitials: 'SR', creatorColor: '#7c3aed', inDemos: 22 },
  { id: 'promo5', title: 'Social Proof Reel', type: 'Video', creatorInitials: 'JP', creatorColor: '#b45309', inDemos: 20 },
  { id: 'promo6', title: 'Event Booth Demo', type: 'Demo', creatorInitials: 'AM', creatorColor: '#374151', inDemos: 18 },
]

const SUGGESTIONS_ASSETS: SuggestedAsset[] = [
  { id: 'asset1', title: 'API Walkthrough', type: 'Walkthrough', creatorInitials: 'JP', creatorColor: '#b45309', inDemos: 21 },
  { id: 'asset2', title: 'Admin Console', type: 'Sim', creatorInitials: 'AM', creatorColor: '#374151', inDemos: 9 },
  { id: 'asset3', title: 'Onboarding Series Pt.1', type: 'Walkthrough', creatorInitials: 'TK', creatorColor: '#0369a1', inDemos: 16 },
  { id: 'asset4', title: 'Pricing Tier Explainer', type: 'Walkthrough', creatorInitials: 'JP', creatorColor: '#b45309', inDemos: 13 },
  { id: 'asset5', title: 'Authentication Flow', type: 'Tour', creatorInitials: 'TK', creatorColor: '#0369a1', inDemos: 10 },
  { id: 'asset6', title: 'Data Pipeline Demo', type: 'Demo', creatorInitials: 'AM', creatorColor: '#374151', inDemos: 8 },
]

// Root-level rows have no parentFolder. Rows inside a folder have parentFolder set.
const MY_DEMOS_ROWS: DemoRow[] = [
  // Root level
  { id: 'r0a', title: 'Onboarding', type: 'Folder', theme: '', published: '', creator: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['onboarding'], freshness: 0, usage: 5, created: '02/01/26', modified: '05/10/26', duration: '—' },
  { id: 'r0b', title: 'Product', type: 'Folder', theme: '', published: '', creator: 'Jamie', creatorInitials: 'JL', creatorColor: '#1d4ed8', tags: ['product'], freshness: 0, usage: 4, created: '03/01/26', modified: '05/01/26', duration: '—' },
  { id: 'r0c', title: 'Sales Enablement', type: 'Folder', theme: '', published: '', creator: 'Jordan', creatorInitials: 'JP', creatorColor: '#b45309', tags: ['sales'], freshness: 0, usage: 4, created: '01/10/26', modified: '04/22/26', duration: '—' },
  { id: 'r0d', title: 'Engineering Demos', type: 'Folder', theme: '', published: '', creator: 'Taylor', creatorInitials: 'TK', creatorColor: '#0369a1', tags: ['api', 'admin'], freshness: 0, usage: 3, created: '01/15/26', modified: '05/05/26', duration: '—' },
  { id: 'r4', title: 'Settings & Permissions', type: 'Tour', theme: '', published: '', creator: 'Sam', creatorInitials: 'SR', creatorColor: '#7c3aed', tags: ['admin', 'security'], freshness: 8, usage: 57, created: '04/05/26', modified: '05/08/26', duration: '2:55', description: 'A guided tour of the permissions model — role assignments, access levels, and audit log configuration.' },
  { id: 'r5', title: 'Integrations Setup', type: 'Sim', theme: '', published: '', creator: 'Taylor', creatorInitials: 'TK', creatorColor: '#0369a1', tags: ['api', 'onboarding'], freshness: 12, usage: 176, created: '02/28/26', modified: '04/15/26', duration: '4:18', description: 'Step-by-step simulation for connecting third-party tools via native integrations and the REST API.' },
  { id: 'r9', title: 'Quick Start Guide', type: 'Walkthrough', theme: '', published: '', creator: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['onboarding', 'product'], freshness: 15, usage: 312, created: '01/05/26', modified: '05/12/26', duration: '2:10', description: 'Get up and running in under 3 minutes. Covers workspace setup, inviting teammates, and first project creation.' },
  { id: 'r10', title: 'Feature Highlights Reel', type: 'Video', theme: '', published: '', creator: 'Jamie', creatorInitials: 'JL', creatorColor: '#1d4ed8', tags: ['product', 'sales'], freshness: 3, usage: 88, created: '04/20/26', modified: '05/14/26', duration: '4:55', description: 'A high-energy product sizzle reel showcasing the top 10 features most valued by customers.' },
  // Inside "Onboarding"
  { id: 'r1', title: 'Onboarding Flow Walkthrough', type: 'Sim', theme: '', published: '', creator: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['onboarding', 'product'], freshness: 6, usage: 142, created: '04/18/26', modified: '05/10/26', duration: '3:42', description: 'Interactive simulation of the full new-user onboarding flow, from sign-up to first meaningful action.', parentFolder: 'Onboarding' },
  { id: 'r7', title: 'Mobile Walkthrough', type: 'Tour', theme: '', published: '', creator: 'Jamie', creatorInitials: 'JL', creatorColor: '#1d4ed8', tags: ['mobile', 'onboarding'], freshness: 9, usage: 64, created: '02/14/26', modified: '03/30/26', duration: '3:15', description: 'A click-through tour of the iOS and Android apps, highlighting key mobile-only features.', parentFolder: 'Onboarding' },
  { id: 'r11', title: 'First Login Experience', type: 'Sim', theme: '', published: '', creator: 'Taylor', creatorInitials: 'TK', creatorColor: '#0369a1', tags: ['onboarding'], freshness: 11, usage: 203, created: '03/05/26', modified: '05/02/26', duration: '2:30', description: 'Simulates exactly what a new user sees when they log in for the first time, including the welcome checklist.', parentFolder: 'Onboarding' },
  { id: 'r12', title: 'Account Setup Tour', type: 'Tour', theme: '', published: '', creator: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['onboarding', 'admin'], freshness: 7, usage: 119, created: '03/18/26', modified: '04/28/26', duration: '3:00', description: 'Covers profile setup, notification preferences, and connecting calendar and email integrations.', parentFolder: 'Onboarding' },
  { id: 'r13', title: 'Welcome Webinar Replay', type: 'Webinar', theme: '', published: '', creator: 'Jordan', creatorInitials: 'JP', creatorColor: '#b45309', tags: ['onboarding', 'sales'], freshness: 4, usage: 78, created: '02/22/26', modified: '04/10/26', duration: '28:00', description: 'Recording of the monthly new-customer welcome webinar including live Q&A highlights.', parentFolder: 'Onboarding' },
  // Inside "Product"
  { id: 'r2', title: 'Dashboard Overview', type: 'Video', theme: '', published: '', creator: 'Jamie', creatorInitials: 'JL', creatorColor: '#1d4ed8', tags: ['product', 'sales'], freshness: 4, usage: 98, created: '03/22/26', modified: '04/30/26', duration: '5:10', description: 'Walkthrough of the main dashboard — widgets, date ranges, and customizing the layout for different team roles.', parentFolder: 'Product' },
  { id: 'r3', title: 'Analytics Deep Dive', type: 'Sim', theme: '', published: '', creator: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['product', 'admin', 'reporting'], freshness: 3, usage: 211, created: '03/14/26', modified: '05/01/26', duration: '7:23', description: 'Explores advanced reporting features: custom funnels, cohort analysis, and scheduled report delivery.', parentFolder: 'Product' },
  { id: 'r14', title: 'Reporting Module Tour', type: 'Tour', theme: '', published: '', creator: 'Jordan', creatorInitials: 'JP', creatorColor: '#b45309', tags: ['product', 'reporting'], freshness: 5, usage: 134, created: '04/01/26', modified: '05/07/26', duration: '4:40', description: 'Tour of every section in the Reporting module with tips on exporting data and sharing with stakeholders.', parentFolder: 'Product' },
  { id: 'r15', title: 'Workspace Customization', type: 'Demo', theme: '', published: '', creator: 'Sam', creatorInitials: 'SR', creatorColor: '#7c3aed', tags: ['product', 'admin'], freshness: 9, usage: 67, created: '04/10/26', modified: '05/03/26', duration: '3:55', description: 'Shows how admins can brand the workspace, configure default views, and manage team-wide settings.', parentFolder: 'Product' },
  // Inside "Sales Enablement"
  { id: 'r6', title: 'Reporting Basics', type: 'Video', theme: '', published: '', creator: 'Jordan', creatorInitials: 'JP', creatorColor: '#b45309', tags: ['sales', 'product'], freshness: 5, usage: 89, created: '03/10/26', modified: '04/22/26', duration: '6:04', description: 'Introductory video covering the core reporting screens — ideal for sharing with new champion contacts.', parentFolder: 'Sales Enablement' },
  { id: 'r8', title: 'Enterprise Admin Tour', type: 'Presentation', theme: '', published: '', creator: 'Sam', creatorInitials: 'SR', creatorColor: '#7c3aed', tags: ['enterprise', 'admin'], freshness: 2, usage: 130, created: '01/20/26', modified: '03/15/26', duration: '9:45', description: 'Detailed presentation for IT and security stakeholders covering SSO, SCIM provisioning, and data residency.', parentFolder: 'Sales Enablement' },
  { id: 'r16', title: 'Competitive Battlecard Demo', type: 'Demo', theme: '', published: '', creator: 'Jamie', creatorInitials: 'JL', creatorColor: '#1d4ed8', tags: ['sales', 'enterprise'], freshness: 6, usage: 241, created: '02/10/26', modified: '05/09/26', duration: '5:30', description: 'Side-by-side demo highlighting key differentiators versus the top two competitors — updated for Q2 2026.', parentFolder: 'Sales Enablement' },
  { id: 'r17', title: 'ROI Calculator Walkthrough', type: 'Walkthrough', theme: '', published: '', creator: 'Taylor', creatorInitials: 'TK', creatorColor: '#0369a1', tags: ['sales'], freshness: 10, usage: 188, created: '03/02/26', modified: '04/25/26', duration: '4:15', description: 'Guided walkthrough of the interactive ROI calculator, showing how to input customer data and present results.', parentFolder: 'Sales Enablement' },
  // Inside "Engineering Demos"
  { id: 'r18', title: 'API Integration Sandbox', type: 'Sim', theme: '', published: '', creator: 'Taylor', creatorInitials: 'TK', creatorColor: '#0369a1', tags: ['api'], freshness: 13, usage: 95, created: '01/28/26', modified: '04/20/26', duration: '6:50', description: 'Live sandbox simulation letting prospects make real API calls and inspect responses without credentials.', parentFolder: 'Engineering Demos' },
  { id: 'r19', title: 'Webhook Configuration', type: 'Walkthrough', theme: '', published: '', creator: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['api', 'admin'], freshness: 8, usage: 52, created: '02/05/26', modified: '04/12/26', duration: '3:20', description: 'Step-by-step guide to setting up webhooks, verifying payloads, and handling retry logic.', parentFolder: 'Engineering Demos' },
  { id: 'r20', title: 'SSO Setup Guide', type: 'Tour', theme: '', published: '', creator: 'Sam', creatorInitials: 'SR', creatorColor: '#7c3aed', tags: ['security', 'admin'], freshness: 5, usage: 74, created: '03/08/26', modified: '05/01/26', duration: '4:00', description: 'Covers SAML 2.0 and OIDC configuration, attribute mapping, and testing the SSO flow end-to-end.', parentFolder: 'Engineering Demos' },
]

const DEMO_LIBRARY_ROWS: DemoRow[] = [
  // Root level
  { id: 'l0a', title: 'Global Library', type: 'Folder', theme: '', published: '', creator: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['product'], freshness: 0, usage: 4, created: '01/01/26', modified: '05/18/26', duration: '—' },
  { id: 'l0b', title: 'Engineering', type: 'Folder', theme: '', published: '', creator: 'Jordan', creatorInitials: 'JP', creatorColor: '#b45309', tags: ['api', 'security'], freshness: 0, usage: 4, created: '02/10/26', modified: '05/05/26', duration: '—' },
  { id: 'l0c', title: 'Sales', type: 'Folder', theme: '', published: '', creator: 'Jordan', creatorInitials: 'JP', creatorColor: '#b45309', tags: ['sales'], freshness: 0, usage: 4, created: '01/05/26', modified: '03/01/26', duration: '—' },
  { id: 'l0d', title: 'Marketing', type: 'Folder', theme: '', published: '', creator: 'Jamie', creatorInitials: 'JL', creatorColor: '#1d4ed8', tags: ['product', 'mobile'], freshness: 0, usage: 3, created: '01/20/26', modified: '04/28/26', duration: '—' },
  { id: 'l4', title: 'Mobile App Demo', type: 'Demo', theme: '', published: '', creator: 'Jamie', creatorInitials: 'JL', creatorColor: '#1d4ed8', tags: ['mobile', 'product'], freshness: 6, usage: 143, created: '03/30/26', modified: '04/28/26', duration: '3:58', description: 'Full walkthrough of the mobile app experience across iOS and Android, including push notifications and offline mode.' },
  { id: 'l6', title: 'Admin Console', type: 'Sim', theme: '', published: '', creator: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['admin'], freshness: 8, usage: 99, created: '02/20/26', modified: '04/05/26', duration: '5:33', description: 'Interactive simulation of the admin console — user management, billing, and organization-wide settings.' },
  { id: 'l9', title: 'Platform Overview', type: 'Demo', theme: '', published: '', creator: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['product', 'onboarding'], freshness: 14, usage: 521, created: '01/10/26', modified: '05/15/26', duration: '6:00', description: 'Top-level platform demo covering all core modules — ideal as the first demo in any discovery conversation.' },
  { id: 'l10', title: 'Partner Enablement Kit', type: 'Presentation', theme: '', published: '', creator: 'Sam', creatorInitials: 'SR', creatorColor: '#7c3aed', tags: ['sales', 'enterprise'], freshness: 2, usage: 164, created: '02/25/26', modified: '04/18/26', duration: '11:30', description: 'Comprehensive deck for partner sales teams covering positioning, objection handling, and co-sell motions.' },
  // Inside "Global Library"
  { id: 'l1', title: 'Product Tour 2026', type: 'Demo', theme: '', published: '', creator: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['product', 'sales'], freshness: 7, usage: 304, created: '05/01/26', modified: '05/18/26', duration: '8:30', description: 'The definitive 2026 product tour — updated with all Q1 feature releases and refreshed UI screenshots.', parentFolder: 'Global Library' },
  { id: 'l7', title: 'Onboarding Series Pt.1', type: 'Walkthrough', theme: '', published: '', creator: 'Taylor', creatorInitials: 'TK', creatorColor: '#0369a1', tags: ['onboarding', 'product'], freshness: 5, usage: 338, created: '02/01/26', modified: '03/20/26', duration: '7:20', description: 'Part 1 of 2: covers workspace creation, initial configuration, and inviting your first team members.', parentFolder: 'Global Library' },
  { id: 'l11', title: 'Onboarding Series Pt.2', type: 'Walkthrough', theme: '', published: '', creator: 'Taylor', creatorInitials: 'TK', creatorColor: '#0369a1', tags: ['onboarding', 'product'], freshness: 4, usage: 271, created: '02/15/26', modified: '04/01/26', duration: '6:45', description: 'Part 2 of 2: advanced configuration, custom fields, automations, and connecting your first integration.', parentFolder: 'Global Library' },
  { id: 'l12', title: 'Executive Summary Deck', type: 'Presentation', theme: '', published: '', creator: 'Sam', creatorInitials: 'SR', creatorColor: '#7c3aed', tags: ['enterprise', 'sales'], freshness: 9, usage: 193, created: '03/10/26', modified: '05/10/26', duration: '9:00', description: 'C-suite-ready presentation summarizing business value, ROI benchmarks, and customer success stories.', parentFolder: 'Global Library' },
  // Inside "Engineering"
  { id: 'l2', title: 'Security & Compliance', type: 'Presentation', theme: '', published: '', creator: 'Taylor', creatorInitials: 'TK', creatorColor: '#0369a1', tags: ['security', 'enterprise', 'compliance'], freshness: 4, usage: 187, created: '04/22/26', modified: '05/12/26', duration: '4:45', description: 'Covers SOC 2 Type II certification, data encryption at rest and in transit, and GDPR compliance posture.', parentFolder: 'Engineering' },
  { id: 'l3', title: 'API Walkthrough', type: 'Walkthrough', theme: '', published: '', creator: 'Jordan', creatorInitials: 'JP', creatorColor: '#b45309', tags: ['api'], freshness: 11, usage: 256, created: '04/10/26', modified: '05/05/26', duration: '6:12', description: 'Hands-on walkthrough of the REST API: authentication, pagination, rate limits, and common use cases.', parentFolder: 'Engineering' },
  { id: 'l13', title: 'Data Pipeline Demo', type: 'Demo', theme: '', published: '', creator: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['api', 'admin'], freshness: 6, usage: 112, created: '03/25/26', modified: '05/03/26', duration: '7:15', description: 'Demonstrates building an end-to-end data pipeline: ingestion, transformation, and output to downstream systems.', parentFolder: 'Engineering' },
  { id: 'l14', title: 'Authentication Flow', type: 'Tour', theme: '', published: '', creator: 'Taylor', creatorInitials: 'TK', creatorColor: '#0369a1', tags: ['security', 'api'], freshness: 3, usage: 145, created: '04/05/26', modified: '05/08/26', duration: '3:30', description: 'Tour of all supported authentication methods: API keys, OAuth 2.0, JWT, and session tokens.', parentFolder: 'Engineering' },
  // Inside "Sales"
  { id: 'l5', title: 'Enterprise Features', type: 'Presentation', theme: '', published: '', creator: 'Sam', creatorInitials: 'SR', creatorColor: '#7c3aed', tags: ['enterprise', 'admin'], freshness: 3, usage: 412, created: '03/15/26', modified: '05/10/26', duration: '9:01', description: 'Deep-dive into enterprise-only capabilities: advanced RBAC, dedicated infrastructure, and SLA commitments.', parentFolder: 'Sales' },
  { id: 'l8', title: 'Sales Enablement Kit', type: 'Webinar', theme: '', published: '', creator: 'Jordan', creatorInitials: 'JP', creatorColor: '#b45309', tags: ['sales'], freshness: 14, usage: 275, created: '01/15/26', modified: '03/01/26', duration: '12:05', description: 'Recorded enablement webinar for AEs covering discovery frameworks, demo best practices, and objection handling.', parentFolder: 'Sales' },
  { id: 'l15', title: 'Deal Closing Playbook', type: 'Demo', theme: '', published: '', creator: 'Jamie', creatorInitials: 'JL', creatorColor: '#1d4ed8', tags: ['sales', 'enterprise'], freshness: 7, usage: 319, created: '02/18/26', modified: '05/11/26', duration: '6:20', description: 'Late-stage demo focused on procurement, security review, and legal considerations for enterprise deals.', parentFolder: 'Sales' },
  { id: 'l16', title: 'Pricing Tier Explainer', type: 'Walkthrough', theme: '', published: '', creator: 'Jordan', creatorInitials: 'JP', creatorColor: '#b45309', tags: ['sales'], freshness: 5, usage: 207, created: '03/05/26', modified: '04/22/26', duration: '4:50', description: 'Walks through each pricing tier side-by-side, highlighting the features and limits relevant to mid-market buyers.', parentFolder: 'Sales' },
  // Inside "Marketing"
  { id: 'l17', title: 'Brand Story Demo', type: 'Video', theme: '', published: '', creator: 'Jamie', creatorInitials: 'JL', creatorColor: '#1d4ed8', tags: ['product'], freshness: 10, usage: 388, created: '01/25/26', modified: '04/15/26', duration: '5:45', description: 'An emotional brand narrative video — origin story, mission, and customer transformation highlights.', parentFolder: 'Marketing' },
  { id: 'l18', title: 'Social Proof Reel', type: 'Video', theme: '', published: '', creator: 'Jordan', creatorInitials: 'JP', creatorColor: '#b45309', tags: ['sales', 'product'], freshness: 8, usage: 254, created: '02/08/26', modified: '04/20/26', duration: '3:10', description: 'Fast-paced compilation of customer quotes, NPS scores, and G2 review highlights for use in sales emails.', parentFolder: 'Marketing' },
  { id: 'l19', title: 'Event Booth Demo', type: 'Demo', theme: '', published: '', creator: 'Alex', creatorInitials: 'AM', creatorColor: '#374151', tags: ['product', 'enterprise'], freshness: 12, usage: 176, created: '03/12/26', modified: '05/05/26', duration: '4:25', description: 'Short, high-impact demo designed for trade show booths — grabs attention in 60 seconds and works without audio.', parentFolder: 'Marketing' },
]

const TYPE_OPTIONS = ['Demo', 'Walkthrough', 'Tutorial', 'Presentation', 'Webinar', 'Sim', 'Tour', 'Video']
const CREATOR_OPTIONS = ['Alex', 'Jamie', 'Sam', 'Taylor', 'Jordan']
const TAG_OPTIONS = [
  'Onboarding', 'Product', 'Sales', 'API', 'Security', 'Mobile', 'Enterprise', 'Admin',
  'Reporting', 'Analytics', 'Compliance', 'Marketing', 'Engineering', 'Integrations',
  'Getting Started', 'Advanced', 'Partner', 'Webinar', 'Demo', 'Tutorial',
]
const DURATION_OPTIONS = ['Short (< 5 min)', 'Medium (5–15 min)', 'Long (> 15 min)']

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
const FRESHNESS_OPTIONS = ['High (> 70%)', 'Medium (30–70%)', 'Low (< 30%)']
const PUBLISHED_OPTIONS = ['Published', 'Draft', 'Archived', 'Scheduled']
const THEME_OPTIONS = ['Light', 'Dark', 'Custom', 'Default', 'Minimal']

function parseDurationMins(d: string): number {
  if (!d || d === '—') return 0
  const parts = d.split(':')
  return parts.length === 2 ? parseInt(parts[0]) + parseInt(parts[1]) / 60 : 0
}
function matchesDurationBucket(duration: string, bucket: string): boolean {
  const m = parseDurationMins(duration)
  if (bucket === 'Short (< 5 min)') return m > 0 && m < 5
  if (bucket === 'Medium (5–15 min)') return m >= 5 && m <= 15
  if (bucket === 'Long (> 15 min)') return m > 15
  return false
}
function matchesFreshnessBucket(freshness: number, bucket: string): boolean {
  if (bucket === 'High (> 70%)') return freshness > 70
  if (bucket === 'Medium (30–70%)') return freshness >= 30 && freshness <= 70
  if (bucket === 'Low (< 30%)') return freshness < 30
  return false
}

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
  const [durationBuckets, setDurationBuckets] = useState<string[]>([])
  const [freshnessBuckets, setFreshnessBuckets] = useState<string[]>([])
  const [publishedStatuses, setPublishedStatuses] = useState<string[]>([])
  const [themes, setThemes] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchScope, setSearchScope] = useState<SearchScope>('everywhere')
  const [openFolderName, setOpenFolderName] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  function toggle(list: string[], setList: (v: string[]) => void, val: string) {
    setList(list.includes(val) ? list.filter((x) => x !== val) : [...list, val])
  }

  function clearAll() {
    setTypes([]); setCreators([]); setTags([])
    setDurationBuckets([]); setFreshnessBuckets([])
    setPublishedStatuses([]); setThemes([])
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
    types, creators, tags, durationBuckets, freshnessBuckets, publishedStatuses, themes,
    searchQuery, searchScope, openFolder: openFolderName,
  }
  const filterActions: FilterActions = {
    toggleType: (v) => toggle(types, setTypes, v),
    toggleCreator: (v) => toggle(creators, setCreators, v),
    toggleTag: (v) => toggle(tags, setTags, v),
    toggleDurationBucket: (v) => toggle(durationBuckets, setDurationBuckets, v),
    toggleFreshnessBucket: (v) => toggle(freshnessBuckets, setFreshnessBuckets, v),
    togglePublishedStatus: (v) => toggle(publishedStatuses, setPublishedStatuses, v),
    toggleTheme: (v) => toggle(themes, setThemes, v),
    clearAll,
    setSearch: setSearchQuery,
    setScope: setSearchScope,
    openFolder: handleOpenFolder,
    closeFolder: handleCloseFolder,
  }

  const content = tab === 'suggestions' ? (
    <SuggestionsPage />
  ) : tab === 'my-demos' ? (
    <>
      <SuggestedCarousel assets={MY_DEMOS_SUGGESTED} />
      <FilterBar filters={filters} actions={filterActions} onOpenDrawer={() => setDrawerOpen(true)} />
      <DemoTable rows={MY_DEMOS_ROWS} filters={filters} actions={filterActions} />
    </>
  ) : tab === 'demo-library' ? (
    <>
      <SuggestedCarousel assets={DEMO_LIBRARY_SUGGESTED} />
      <FilterBar filters={filters} actions={filterActions} onOpenDrawer={() => setDrawerOpen(true)} />
      <DemoTable rows={DEMO_LIBRARY_ROWS} filters={filters} actions={filterActions} />
    </>
  ) : tab === 'favorites' ? (
    <div className={styles.empty}><p>No favorites yet.</p></div>
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
  durationBuckets: string[]; freshnessBuckets: string[]
  publishedStatuses: string[]; themes: string[]
  searchQuery: string; searchScope: SearchScope; openFolder: string | null
}
interface FilterActions {
  toggleType: (v: string) => void
  toggleCreator: (v: string) => void
  toggleTag: (v: string) => void
  toggleDurationBucket: (v: string) => void
  toggleFreshnessBucket: (v: string) => void
  togglePublishedStatus: (v: string) => void
  toggleTheme: (v: string) => void
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
  const { types, creators, tags, durationBuckets, freshnessBuckets, publishedStatuses, themes, searchQuery, searchScope } = filters
  const totalApplied = types.length + creators.length + tags.length +
    durationBuckets.length + freshnessBuckets.length + publishedStatuses.length + themes.length
  const totalExtra = durationBuckets.length + freshnessBuckets.length + publishedStatuses.length + themes.length
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
    { label: 'Duration', values: filters.durationBuckets, onToggle: actions.toggleDurationBucket },
    { label: 'Freshness', values: filters.freshnessBuckets, onToggle: actions.toggleFreshnessBucket },
    { label: 'Published Status', values: filters.publishedStatuses, onToggle: actions.togglePublishedStatus },
    { label: 'Theme', values: filters.themes, onToggle: actions.toggleTheme },
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
  { id: 'title',     label: 'Title',     locked: true },
  { id: 'type',      label: 'Type' },
  { id: 'theme',     label: 'Theme' },
  { id: 'published', label: 'Published' },
  { id: 'tags',      label: 'Tags' },
  { id: 'freshness', label: 'Freshness' },
  { id: 'usage',     label: 'Usage' },
  { id: 'created',   label: 'Created' },
  { id: 'modified',  label: 'Modified' },
  { id: 'creator',   label: 'Creator' },
  { id: 'duration',  label: 'Duration' },
]

function DemoTable({ rows, filters, actions }: { rows: DemoRow[]; filters: Filters; actions: FilterActions }) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [favorited, setFavorited] = useState<Set<string>>(new Set())
  const [starred, setStarred] = useState<Set<string>>(new Set())
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)
  const [historyRow, setHistoryRow] = useState<DemoRow | null>(null)
  const [viewMode, setViewMode] = useState<'table' | 'tile'>('table')
  const [visibleCols, setVisibleCols] = useState<Set<string>>(
    new Set(COL_DEFS.map((c) => c.id))
  )

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
    if (filters.durationBuckets.length > 0 && !filters.durationBuckets.some((b) => matchesDurationBucket(r.duration, b))) return false
    if (filters.freshnessBuckets.length > 0 && !filters.freshnessBuckets.some((b) => matchesFreshnessBucket(r.freshness, b))) return false
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

  function handleRowClick(row: DemoRow) {
    if (row.type === 'Folder') {
      setSelected(new Set())
      actions.openFolder(row.title)
    } else {
      toggleRow(row.id)
    }
  }

  return (
    <div className={styles.tableSection}>
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
              <th className={styles.thIcon} />
              <th className={styles.thIcon} />
              <th className={styles.th}>Title</th>
              {col('type')      && <th className={styles.th}>Type</th>}
              {col('theme')     && <th className={styles.th}>Theme</th>}
              {col('published') && <th className={styles.th}>Published</th>}
              {col('tags')      && <th className={styles.th}>Tags</th>}
              {col('freshness') && (
                <th className={styles.th}>
                  <div className={styles.thWithInfo}>
                    Freshness
                    <span className={styles.infoIconWrap}>
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className={styles.infoIcon}>
                        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4"/>
                        <path d="M7 6.5v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                        <circle cx="7" cy="4.5" r="0.75" fill="currentColor"/>
                      </svg>
                      <div className={styles.infoTooltip}>
                        <div className={styles.infoTooltipTitle}>Freshness Score</div>
                        <div className={styles.infoTooltipBody}>Measures how up-to-date a demo's content is based on last edit, screenshot age, and link validity.</div>
                        <div className={styles.infoTooltipScale}>
                          <span className={styles.infoScaleHigh}>● High &gt;70%</span>
                          <span className={styles.infoScaleMid}>● Medium 30–70%</span>
                          <span className={styles.infoScaleLow}>● Low &lt;30%</span>
                        </div>
                      </div>
                    </span>
                  </div>
                </th>
              )}
              {col('usage')    && <th className={styles.th}>Usage</th>}
              {col('created')  && <th className={styles.th}>Created ↓</th>}
              {col('modified') && <th className={styles.th}>Modified</th>}
              {col('creator')  && <th className={styles.th}>Creator</th>}
              {col('duration') && <th className={styles.th}>Duration</th>}
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
                        {row.type === 'Folder' && (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                            <path d="M1 3.5C1 2.67 1.67 2 2.5 2H5.5L7 3.5H11.5C12.33 3.5 13 4.17 13 5V10.5C13 11.33 12.33 12 11.5 12H2.5C1.67 12 1 11.33 1 10.5V3.5Z" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1.2" strokeLinejoin="round"/>
                          </svg>
                        )}
                        <span className={`${styles.rowTitle} ${row.type === 'Folder' ? styles.rowTitleFolder : ''}`}>{row.title}</span>
                      </div>
                    </td>
                    {col('type')      && <td className={styles.td}><span className={styles.typeBadge}>{row.type}</span></td>}
                    {col('theme')     && <td className={styles.tdMeta}>{row.theme || '—'}</td>}
                    {col('published') && <td className={styles.tdMeta}>{row.published || '—'}</td>}
                    {col('tags')      && (
                      <td className={styles.td}>
                        <div className={styles.tagList}>
                          {visibleTags.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
                          {extraTags > 0 && <span className={styles.tagExtra}>+{extraTags}</span>}
                        </div>
                      </td>
                    )}
                    {col('freshness') && (
                      <td className={styles.td}>
                        <div className={styles.freshnessCell}>
                          <div className={styles.freshnessBar}>
                            <div
                              className={styles.freshnessFill}
                              style={{
                                width: `${Math.min(row.freshness * 6, 100)}%`,
                                background: row.freshness > 70 ? '#059669' : row.freshness >= 30 ? '#b45309' : '#dc2626',
                              }}
                            />
                          </div>
                          <span className={styles.freshnessPct}>{row.freshness}%</span>
                          <span className={styles.infoIconWrap}>
                            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" className={styles.infoIcon}>
                              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4"/>
                              <path d="M7 6.5v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                              <circle cx="7" cy="4.5" r="0.75" fill="currentColor"/>
                            </svg>
                            <div className={`${styles.infoTooltip} ${styles.infoTooltipLeft}`}>
                              <div className={styles.infoTooltipTitle}>Freshness Score</div>
                              <div className={styles.infoTooltipBody}>
                                {row.freshness > 70
                                  ? 'Content is up-to-date. Screenshots, links, and copy are current.'
                                  : row.freshness >= 30
                                  ? 'Some content may be stale. Consider reviewing screenshots or copy.'
                                  : 'Content is outdated. A full review is recommended.'}
                              </div>
                              <div className={styles.infoTooltipScale}>
                                <span className={`${styles.infoScaleHigh} ${row.freshness > 70 ? styles.infoScaleActive : ''}`}>● High &gt;70%</span>
                                <span className={`${styles.infoScaleMid} ${row.freshness >= 30 && row.freshness <= 70 ? styles.infoScaleActive : ''}`}>● Mid 30–70%</span>
                                <span className={`${styles.infoScaleLow} ${row.freshness < 30 ? styles.infoScaleActive : ''}`}>● Low &lt;30%</span>
                              </div>
                            </div>
                          </span>
                        </div>
                      </td>
                    )}
                    {col('usage')    && <td className={styles.tdMeta}>{row.usage}</td>}
                    {col('created')  && <td className={styles.tdMeta}>{row.created}</td>}
                    {col('modified') && (
                      <td className={styles.tdMeta} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.modifiedLink} onClick={() => setHistoryRow(row)}>
                          {row.modified}
                        </button>
                      </td>
                    )}
                    {col('creator')  && (
                      <td className={styles.td}>
                        <div className={styles.creatorCell}>
                          <span className={styles.creatorAvatarSm} style={{ background: row.creatorColor }}>{row.creatorInitials}</span>
                          <span className={styles.creatorFirstName}>{row.creator}</span>
                        </div>
                      </td>
                    )}
                    {col('duration') && <td className={styles.tdMeta}>{row.duration}</td>}
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
function SuggestionRow({ title, assets }: { title: string; assets: SuggestedAsset[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  function scroll(dir: 'left' | 'right') {
    trackRef.current?.scrollBy({ left: dir === 'right' ? 300 : -300, behavior: 'smooth' })
  }
  return (
    <div className={styles.suggestSection}>
      <div className={styles.suggestSectionHeader}>
        <span className={styles.suggestSectionTitle}>{title}</span>
        <div className={styles.carouselControls}>
          <button className={styles.arrowBtn} onClick={() => scroll('left')}>‹</button>
          <button className={styles.arrowBtn} onClick={() => scroll('right')}>›</button>
        </div>
      </div>
      <div className={styles.carouselTrack} ref={trackRef}>
        {assets.map((asset) => (
          <div key={asset.id} className={styles.suggestedCard}>
            <div className={styles.suggestedCardThumb}>
              <span className={styles.suggestedAvatar} style={{ background: asset.creatorColor }}>
                {asset.creatorInitials}
              </span>
              <span className={styles.suggestedTypeBadge}>{asset.type}</span>
            </div>
            <div className={styles.suggestedCardBody}>
              <div className={styles.suggestedCardTitle}>{asset.title}</div>
              <div className={styles.suggestedCardCount}>In {asset.inDemos} demos</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SuggestionsPage() {
  return (
    <div className={styles.suggestionsPage}>
      <SuggestionRow title="Recents" assets={SUGGESTIONS_RECENTS} />
      <SuggestionRow title="For this deal…" assets={SUGGESTIONS_FOR_DEAL} />
      <SuggestionRow title="Promoted" assets={SUGGESTIONS_PROMOTED} />
      <SuggestionRow title="Assets" assets={SUGGESTIONS_ASSETS} />
    </div>
  )
}

const SUGGESTED_TABS = ['Popular', 'By Deal', 'By Persona', 'Recent'] as const
type SuggestedTab = typeof SUGGESTED_TABS[number]

function SuggestedCarousel({ assets, expanded: initialExpanded, hideTabs }: { assets: SuggestedAsset[]; expanded?: boolean; hideTabs?: boolean }) {
  const [collapsed, setCollapsed] = useState(!initialExpanded && false)
  const [activeTab, setActiveTab] = useState<SuggestedTab>('Popular')
  const trackRef = useRef<HTMLDivElement>(null)

  const sorted = [...assets].sort((a, b) => {
    if (activeTab === 'Recent') return a.id.localeCompare(b.id)
    if (activeTab === 'Popular') return b.inDemos - a.inDemos
    return b.inDemos - a.inDemos
  })

  function scroll(dir: 'left' | 'right') {
    trackRef.current?.scrollBy({ left: dir === 'right' ? 300 : -300, behavior: 'smooth' })
  }

  return (
    <section className={styles.suggestedSection}>
      <div className={styles.suggestedHeader}>
        <button className={styles.suggestedToggle} onClick={() => setCollapsed((c) => !c)}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: collapsed ? 'rotate(-90deg)' : 'none', transition: 'transform .2s' }}>
            <path d="M3 5l4 4 4-4" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className={styles.suggestedTitle}>Suggested assets for you</span>
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
        <div className={styles.carouselControls}>
          <button className={styles.arrowBtn} onClick={() => scroll('left')}>‹</button>
          <button className={styles.arrowBtn} onClick={() => scroll('right')}>›</button>
        </div>
      </div>

      {!collapsed && (
        <div className={styles.carouselTrack} ref={trackRef}>
          {sorted.map((asset) => (
            <div key={asset.id} className={styles.suggestedCard}>
              <div className={styles.suggestedCardThumb}>
                <span className={styles.suggestedAvatar} style={{ background: asset.creatorColor }}>
                  {asset.creatorInitials}
                </span>
                <span className={styles.suggestedTypeBadge}>{asset.type}</span>
              </div>
              <div className={styles.suggestedCardBody}>
                <div className={styles.suggestedCardTitle}>{asset.title}</div>
                <div className={styles.suggestedCardCount}>In {asset.inDemos} demos</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
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
function ClockIcon() {
  return <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4"/><path d="M7 4v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function SparkleIcon() {
  return <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.3 3.7L12 7l-3.7 1.3L7 13l-1.3-3.7L2 7l3.7-1.3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
}
function PublishedIcon() {
  return <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M4 7l2.5 2.5L10 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function ThemeIcon() {
  return <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.4"/><path d="M7 1.5v11M1.5 7h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
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
    filters.durationBuckets.length + filters.freshnessBuckets.length +
    filters.publishedStatuses.length + filters.themes.length

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
          <DrawerSection label="Duration" icon={<ClockIcon />} options={DURATION_OPTIONS} selected={filters.durationBuckets} onToggle={actions.toggleDurationBucket} />
          <DrawerSection label="Freshness" icon={<SparkleIcon />} options={FRESHNESS_OPTIONS} selected={filters.freshnessBuckets} onToggle={actions.toggleFreshnessBucket} />
          <DrawerSection label="Published Status" icon={<PublishedIcon />} options={PUBLISHED_OPTIONS} selected={filters.publishedStatuses} onToggle={actions.togglePublishedStatus} />
          <DrawerSection label="Theme" icon={<ThemeIcon />} options={THEME_OPTIONS} selected={filters.themes} onToggle={actions.toggleTheme} />
        </div>

        <div className={styles.drawerFooter}>
          <button className={styles.drawerDoneBtn} onClick={onClose}>Done</button>
        </div>
      </div>
    </>
  )
}
