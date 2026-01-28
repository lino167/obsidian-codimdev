# Changelog

All notable changes to Obsidian Console will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Settings module for pricing configuration
- Dark/Light theme toggle
- Export reports (PDF/CSV)
- Calendar integration for project deadlines
- Email notifications for lead status changes

---

## [1.0.0] - 2026-01-28

### Added - Core System

#### 🌐 Public Portfolio
- **Landing Page** with tactical dark mode aesthetics
  - Animated hero section with gradient text effects
  - Live tech stack visualization
  - Call-to-action buttons
- **Work Gallery** (`/work`)
  - Project cards with hover effects
  - Category filtering (All, Web, Mobile, Design)
  - Modal detail view with full project information
  - Image lazy loading and optimization
- **Skills Section**
  - Interactive skill bars
  - Technology badges
  - Experience timeline
- **Contact Page** (`/contact`) with omnichannel integration
  - WhatsApp direct integration with pre-formatted messages
  - Traditional email form with Supabase integration
  - Company field for B2B lead capture
  - Dual CTA: WhatsApp (green) + Email (crimson)
- **Certificates Display** (`/certificates`)
  - Grid layout with card design
  - Credential verification links
  - Issue date and organization metadata

#### 🔐 Admin Panel

- **Authentication System**
  - Supabase Auth integration
  - Protected routes with redirect logic
  - Session persistence
  - Login/logout functionality

- **Dashboard** (`/admin`)
  - Real-time KPI metrics (Total Projects, Active, Revenue, Leads)
  - Activity timeline with recent actions
  - Quick stats cards
  - Visual status indicators

- **COMM-LINK CRM** (`/admin/leads`)
  - Master-Detail layout (30% feed, 70% decoder)
  - Lead status workflow: New → Contacted → Negotiating → Converted → Archived
  - Search and filter functionality
  - Inline editing for all lead fields
  - Message log with timestamp tracking
  - Intel & Notes tab for internal annotations
  - Proposal link management
  - **⚡ KILLER FEATURE:** One-click Lead-to-Project conversion
  - WhatsApp reply integration
  - Manual lead creation dialog for phone/referral leads
  - Color-coded status badges (Crimson, Cyan, Orange, Green, Gray)

- **Projects Manager** (`/admin/projects`)
  - CRUD operations (Create, Read, Update, Delete)
  - Project status: Planning → In Progress → Review → Completed
  - Rich text editor for descriptions
  - Budget and timeline tracking
  - Image upload with Supabase Storage
  - Public/Private visibility toggle
  - Featured project designation
  - Link to live demo and repository
  - Seamless integration with COMM-LINK (receives pre-filled data)

- **Resource Monitor** (`/admin/finances`)
  - **HUD Dashboard:**
    - Net Balance calculation (Income - Expenses)
    - Expense Ratio percentage
    - Monthly goal progress bar
  - **Transaction Log:**
    - Income/Expense tracking with visual indicators
    - Category classification (Project, Server, Software, Salary, Tax)
    - Status management (Paid, Pending, Scheduled)
    - Optional project linking
    - Due date scheduling
  - **Filters:** All, Income, Expenses, Pending
  - Real-time calculations and summaries

- **Certificates Manager** (`/admin/certificates`)
  - Upload credential files
  - Metadata management (title, issuer, date, URL)
  - Visibility control (show/hide on public page)
  - CRUD operations

#### 🗄️ Database Schema

- **Projects Table**
  - Core fields: title, slug, description, budget, timeline
  - Status tracking and visibility flags
  - Image URLs and external links
  - Timestamps (created_at, updated_at)

- **Leads Table** (CRM-ready)
  - Contact information (name, email, company, phone)
  - Project type and estimated budget
  - Status workflow fields
  - Admin notes and proposal links
  - IP address tracking
  - Created_at timestamp

- **Finances Table**
  - Transaction tracking (income/expense)
  - Amount, category, status fields
  - Due date for scheduled payments
  - Optional project_id foreign key
  - Indexes for performance

- **Certificates Table**
  - Title, issuer, issue_date
  - File URL and verification link
  - Visibility toggle

#### 🎨 Design System

- **Tactical/Industrial Theme**
  - Primary: `#050505` (Deep Black)
  - Accent: `#BA0C10` (Crimson)
  - Success: Cyan/Green gradients
  - Warning: Orange
  - Typography: Monospace for data, Display for headers

- **UI Components** (Shadcn + Custom)
  - Buttons with hover glow effects
  - Input fields with border animations
  - Modals/Dialogs with backdrop blur
  - Toast notifications (Sonner)
  - Progress bars with gradient fills
  - Status badges with color-coding
  - Scanline overlay effects

- **Animations**
  - Fade-in on page load
  - Slide-in for sidebars
  - Hover scale effects
  - Loading spinners
  - Smooth transitions (300ms)

#### 🛠️ Technical Infrastructure

- Migration to **React + TypeScript + Vite**
- **Supabase Integration:**
  - PostgreSQL database
  - Row Level Security (RLS) policies
  - Storage buckets for images
  - Real-time subscriptions (future)
- **Routing:** React Router DOM v6
- **State Management:** React Hooks
- **Form Handling:** React Hook Form + Zod validation
- **Styling:** Tailwind CSS with custom config
- **Icons:** Lucide React
- **Date Handling:** date-fns with pt-BR locale

### Changed

- Migrated from static HTML to React SPA
- Replaced `class=` with `className=` (JSX)
- Converted all CSS to Tailwind utility classes
- Updated contact form to save leads in Supabase
- Enhanced navigation with active link indicators
- Improved mobile responsiveness

### Fixed

- TypeScript type safety for all components
- Finance module `ProjectSummary` type error
- Contact form WhatsApp message encoding
- Image upload path handling
- Lead status validation constraints

---

## [0.1.0] - 2026-01-14

### Added
- Initial HTML/CSS/JS static portfolio
- Basic project showcase
- Contact form (email only)
- Placeholder skills section

### Deprecated
- Static HTML structure (moved to `legacy/` directory)

---

## Future Roadmap

### v1.1.0 (Q2 2026)
- [ ] Settings module with pricing configuration
- [ ] Email notification system
- [ ] Advanced analytics dashboard
- [ ] Calendar view for project deadlines

### v1.2.0 (Q3 2026)
- [ ] Mobile app (React Native)
- [ ] Client portal (read-only access)
- [ ] Invoice generation
- [ ] Time tracking integration

### v2.0.0 (Q4 2026)
- [ ] Multi-tenant support
- [ ] API for external integrations
- [ ] White-label customization
- [ ] Advanced reporting

---

## Contributors

- **Zacarias Lino** - Initial work and development

---

## Notes

This changelog follows semantic versioning:
- **MAJOR**: Breaking changes
- **MINOR**: New features (backwards compatible)
- **PATCH**: Bug fixes (backwards compatible)

For detailed commit history, see the Git log.
