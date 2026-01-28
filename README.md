# Obsidian Console

> Full-stack freelance portfolio & admin panel with tactical dark mode aesthetics and complete project lifecycle management.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🎯 Overview

**Obsidian Console** is a modern freelance management system combining a stunning public-facing portfolio with a powerful admin panel for end-to-end project lifecycle management.

**Public Side:** Showcase your work with tactical/industrial aesthetics
**Admin Side:** Manage leads, projects, finances, and certificates in one unified CRM

---

## ✨ Features

### 🌐 Public Portfolio
- **Landing Page** with animated hero section
- **Work Gallery** with project filtering and modal details
- **Skills Showcase** with interactive visualizations
- **Contact Form** with omnichannel lead capture (WhatsApp + Email)
- **Certificates Display** with credential verification

### 🔐 Admin Panel
- **Dashboard** with real-time metrics and KPIs
- **COMM-LINK CRM** for lead management with conversion tracking
- **Projects Manager** with full CRUD and status workflows
- **Resource Monitor** for income/expense tracking and monthly goals
- **Certificates Manager** with upload and metadata management
- **Settings** for profile and pricing configuration

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier works)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/lino167/obsidian-codimdev.git
cd obsidian-codimdev/obsidian-console-main

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm run dev
```

**Access:**
- Public site: `http://localhost:5173`
- Admin panel: `http://localhost:5173/admin`

---

## 🗄️ Database Setup

The project uses Supabase for backend. Follow these steps:

1. **Create Supabase Project** at [supabase.com](https://supabase.com)
2. **Apply Migrations:**
   ```bash
   # Install Supabase CLI
   npm i supabase -g

   # Link project
   supabase link --project-ref YOUR_PROJECT_ID

   # Apply migrations
   supabase db push
   ```

3. **Configure Storage:**
   - Create `projects` bucket for project images
   - Create `certificates` bucket for credential files
   - Set public read policies

See [docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md) for detailed instructions.

---

## 📁 Project Structure

```
obsidian-console-main/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── admin/          # Admin-specific components
│   │   └── ui/             # Base UI library (Shadcn)
│   ├── pages/              # Route pages
│   │   ├── admin/          # Admin panel pages
│   │   └── [public pages]  # Public portfolio pages
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities and configurations
│   ├── types/              # TypeScript type definitions
│   └── App.tsx             # Main routing configuration
├── supabase/
│   └── migrations/         # Database schema migrations
├── public/                 # Static assets
└── docs/                   # Documentation
```

---

## 🎨 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React + TypeScript + Vite |
| **Styling** | Tailwind CSS + Shadcn UI |
| **Backend** | Supabase (PostgreSQL + Auth + Storage) |
| **Animations** | Framer Motion + Custom CSS |
| **State** | React Hooks (useState, useEffect) |
| **Routing** | React Router DOM v6 |
| **Forms** | React Hook Form + Zod |
| **Icons** | Lucide React |
| **Toasts** | Sonner |

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | ✅ Yes |
| `VITE_SUPABASE_ANON_KEY` | Public anon key from Supabase | ✅ Yes |

### Admin Authentication

Set up admin user via Supabase Dashboard:
1. Go to **Authentication** → **Users**
2. Create new user with your email
3. Login at `/admin` with credentials

---

## 📚 Documentation

- [**API Reference**](docs/API.md) - Component props and database schema
- [**Architecture**](docs/ARCHITECTURE.md) - System design and data flows
- [**COMM-LINK Guide**](docs/COMMLINK_GUIDE.md) - CRM module walkthrough
- [**Changelog**](CHANGELOG.md) - Version history

---

## 🎭 Design Philosophy

**Theme:** Tactical/Industrial Dark Mode
- Color Palette: `#050505` (background), `#BA0C10` (crimson accent), cyan/green for status
- Typography: Monospace for data, Display for headers
- Visual Language: Terminal aesthetics, scanlines, grid overlays
- Interaction: Smooth micro-animations, hover effects

**User Experience:**
- **Scannable:** Clear hierarchy with visual indicators
- **Responsive:** Mobile-first design
- **Fast:** Optimistic UI updates, minimal loading states
- **Accessible:** Semantic HTML, keyboard navigation

---

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start dev server (Vite)
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # ESLint check
```

### Key Workflows

1. **Add New Feature:**
   - Create component in `src/components/`
   - Add types to `src/types/index.ts`
   - Update routing in `App.tsx` if needed
   - Test in dev mode

2. **Database Changes:**
   - Create migration in `supabase/migrations/`
   - Apply with `supabase db push`
   - Update TypeScript types

3. **Deploy:**
   - Build: `npm run build`
   - Upload `dist/` to hosting (Vercel, Netlify, etc.)
   - Configure environment variables in hosting platform

---

## 🐛 Troubleshooting

**Issue:** "Cannot connect to Supabase"
- ✅ Check `.env` file has correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- ✅ Restart dev server after changing `.env`

**Issue:** "No data showing in admin"
- ✅ Verify Row Level Security (RLS) policies are set correctly
- ✅ Check if you're logged in with authenticated user

**Issue:** "Images not uploading"
- ✅ Verify storage buckets exist (`projects`, `certificates`)
- ✅ Check bucket policies allow public read and authenticated write

---

## 🤝 Contributing

This is a personal portfolio project, but feedback is welcome!

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructure
- `test:` Tests
- `chore:` Maintenance

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) for component library
- [Supabase](https://supabase.com/) for backend infrastructure
- [Lucide Icons](https://lucide.dev/) for iconography
- [Aceternity UI](https://ui.aceternity.com/) for animated components

---

## 📧 Contact

**Zacarias Lino**
Email: zaca793@gmail.com
LinkedIn: [/in/zacariaslino](https://linkedin.com/in/zacariaslino)
GitHub: [@codim-dev](https://github.com/codim-dev)

---

<div align="center">
  <strong>Built with ⚡ by a tactical freelance developer</strong>
</div>
