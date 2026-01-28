# API Reference

> Component props, database schema, and integration guidelines for Obsidian Console.

---

## 📋 Table of Contents

1. [Database API](#database-api)
2. [Component API](#component-api)
3. [Utility Functions](#utility-functions)
4. [Type Definitions](#type-definitions)

---

## 🗄️ Database API

### Projects Table

**Table Name:** `public.projects`

#### Schema

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | `bigint` | NO | auto-increment | Primary key |
| created_at | `timestamptz` | NO | `now()` | Creation timestamp |
| title | `text` | NO | - | Project name |
| slug | `text` | NO | - | URL-safe identifier (unique) |
| short_description | `text` | YES | - | Brief summary |
| full_description | `text` | YES | - | Detailed markdown content |
| tech_stack | `text[]` | YES | - | Array of technologies |
| budget | `numeric` | YES | - | Project budget |
| timeline | `text` | YES | - | Duration estimate |
| status | `text` | YES | `'planning'` | Workflow status |
| is_public | `boolean` | YES | `false` | Show on public site |
| is_featured | `boolean` | YES | `false` | Homepage highlight |
| live_url | `text` | YES | - | Demo link |
| repo_url | `text` | YES | - | GitHub link |
| image_url | `text` | YES | - | Thumbnail URL |

#### Status Values
- `planning` - Initial phase
- `in_progress` - Active development
- `review` - Testing/QA
- `completed` - Finished

#### Example Queries

**Fetch all public projects:**
```typescript
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .eq('is_public', true)
  .order('created_at', { ascending: false });
```

**Insert new project:**
```typescript
const { data, error } = await supabase
  .from('projects')
  .insert({
    title: 'E-commerce Platform',
    slug: 'ecommerce-platform',
    short_description: 'Full-stack marketplace',
    tech_stack: ['React', 'Node.js', 'PostgreSQL'],
    status: 'planning',
    is_public: false
  });
```

**Update project status:**
```typescript
const { error } = await supabase
  .from('projects')
  .update({ status: 'completed' })
  .eq('id', projectId);
```

---

### Leads Table

**Table Name:** `public.leads`

#### Schema

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | `bigint` | NO | auto-increment | Primary key |
| created_at | `timestamptz` | NO | `now()` | Lead arrival time |
| name | `text` | NO | - | Contact name |
| email | `text` | NO | - | Contact email |
| company | `text` | YES | - | Organization |
| phone | `text` | YES | - | Phone/WhatsApp |
| message | `text` | YES | - | Initial inquiry |
| project_type | `text` | YES | - | Type of project |
| estimated_budget | `text` | YES | - | Budget range |
| status | `text` | YES | `'new'` | CRM workflow status |
| admin_notes | `text` | YES | - | Internal notes |
| proposal_link | `text` | YES | - | Proposal URL |
| ip_address | `text` | YES | - | Visitor IP |

#### Status Values
- `new` - Fresh lead (crimson badge)
- `contacted` - First contact made (cyan)
- `negotiating` - In discussion (orange)
- `converted` - Became project (green)
- `archived` - Not interested (gray)

#### Example Queries

**Fetch leads by status:**
```typescript
const { data, error } = await supabase
  .from('leads')
  .select('*')
  .eq('status', 'new')
  .order('created_at', { ascending: false });
```

**Update lead status:**
```typescript
const { error } = await supabase
  .from('leads')
  .update({
    status: 'contacted',
    admin_notes: 'Sent initial proposal'
  })
  .eq('id', leadId);
```

---

### Finances Table

**Table Name:** `public.finances`

#### Schema

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | `bigint` | NO | auto-increment | Primary key |
| created_at | `timestamptz` | NO | `now()` | Transaction time |
| title | `text` | NO | - | Description |
| amount | `numeric` | NO | - | Value |
| type | `text` | NO | - | `income` or `expense` |
| category | `text` | YES | - | Classification |
| status | `text` | YES | `'paid'` | Payment status |
| due_date | `date` | YES | - | Due date |
| project_id | `bigint` | YES | - | FK to projects |

#### Category Values
- `project` - Client payment
- `server` - Hosting costs
- `software` - Tool subscriptions
- `salary` - Personal income
- `tax` - Government fees
- `other` - Miscellaneous

#### Example Queries

**Calculate monthly balance:**
```typescript
const { data: transactions } = await supabase
  .from('finances')
  .select('type, amount')
  .gte('created_at', startOfMonth)
  .lte('created_at', endOfMonth);

const income = transactions
  .filter(t => t.type === 'income')
  .reduce((sum, t) => sum + Number(t.amount), 0);

const expenses = transactions
  .filter(t => t.type === 'expense')
  .reduce((sum, t) => sum + Number(t.amount), 0);

const balance = income - expenses;
```

---

## 🧩 Component API

### ProjectsManager

**Location:** `/src/pages/admin/ProjectsManager.tsx`

#### Props
None (uses internal state and Supabase)

#### Key Functions

**createProject()**
```typescript
async function createProject() {
  const { data, error } = await supabase
    .from('projects')
    .insert(newProjectForm);

  if (!error) {
    toast.success('✅ Projeto criado');
    fetchProjects();
  }
}
```

**handleLeadConversion()**
```typescript
// Receives data from COMM-LINK via navigate() state
useEffect(() => {
  if (location.state?.openWizard && location.state?.prefill) {
    setNewProjectForm(prev => ({
      ...prev,
      ...location.state.prefill
    }));
    setNewProjectDrawerOpen(true);
  }
}, [location]);
```

#### State Structure

```typescript
interface NewProjectForm {
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  tech_stack: string[];
  budget: number | null;
  timeline: string;
  status: 'planning' | 'in_progress' | 'review' | 'completed';
  is_public: boolean;
  is_featured: boolean;
  live_url: string;
  repo_url: string;
  image_url: string;
}
```

---

### CommLink (CRM)

**Location:** `/src/pages/admin/CommLink.tsx`

#### Props
None

#### Key Functions

**promoteToProject()**
```typescript
async function handlePromoteToProject() {
  navigate('/admin/projects', {
    state: {
      prefill: {
        title: `Project: ${selectedLead.company || selectedLead.name}`,
        client_name: selectedLead.name,
        short_description: selectedLead.message
      },
      openWizard: true,
      sourceLeadId: selectedLead.id
    }
  });

  await updateLeadField(selectedLead.id, 'status', 'converted');
}
```

**updateLeadField()**
```typescript
async function updateLeadField(
  id: number,
  field: keyof Lead,
  value: any
) {
  const { error } = await supabase
    .from('leads')
    .update({ [field]: value })
    .eq('id', id);

  if (!error) fetchLeads();
}
```

---

### FinanceManager

**Location:** `/src/pages/admin/FinanceManager.tsx`

#### Props
None

#### Key State

```typescript
interface NewTransaction {
  title: string;
  amount: string;
  type: 'income' | 'expense';
  category: string;
  status: 'paid' | 'pending' | 'scheduled';
  due_date: string;
  project_id: number | null;
}
```

#### Calculations

**Total Income:**
```typescript
const totalIncome = finances
  .filter(f => f.type === 'income')
  .reduce((acc, curr) => acc + Number(curr.amount), 0);
```

**Expense Ratio:**
```typescript
const expenseRatio = totalIncome > 0
  ? ((totalExpenses / totalIncome) * 100)
  : 0;
```

**Goal Progress:**
```typescript
const goalProgress = (totalIncome / monthlyGoal) * 100;
```

---

### ManualLeadDialog

**Location:** `/src/components/admin/ManualLeadDialog.tsx`

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onLeadAdded` | `() => void` | ✅ Yes | Callback after successful creation |

#### Usage

```tsx
<ManualLeadDialog
  onLeadAdded={() => fetchLeads()}
/>
```

#### State

```typescript
interface ManualLeadData {
  name: string;
  email: string;
  company: string;
  phone: string;
  status: 'new';
}
```

---

## 🛠️ Utility Functions

### formatCurrency

**Location:** Inline (can be extracted to `/src/lib/utils.ts`)

```typescript
function formatCurrency(amount: number): string {
  return amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  });
}

// Usage
formatCurrency(15000) // "R$ 15.000,00"
```

---

### generateSlug

```typescript
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')     // Replace non-alphanumeric
    .replace(/^-+|-+$/g, '');        // Trim dashes
}

// Usage
generateSlug('Projeto E-commerce') // "projeto-e-commerce"
```

---

### formatRelativeTime

```typescript
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function formatRelativeTime(date: string): string {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: ptBR
  });
}

// Usage
formatRelativeTime('2026-01-27T10:00:00Z') // "há 2 horas"
```

---

## 📘 Type Definitions

### Project

**Location:** `/src/types/index.ts`

```typescript
export interface Project {
  id: number;
  created_at: string;
  title: string;
  slug: string;
  short_description: string | null;
  full_description: string | null;
  tech_stack: string[] | null;
  budget: number | null;
  timeline: string | null;
  status: 'planning' | 'in_progress' | 'review' | 'completed';
  is_public: boolean;
  is_featured: boolean;
  live_url: string | null;
  repo_url: string | null;
  image_url: string | null;
}
```

---

### Lead

```typescript
export interface Lead {
  id: number;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  message: string | null;
  project_type: string | null;
  estimated_budget: string | null;
  status: 'new' | 'contacted' | 'negotiating' | 'converted' | 'archived';
  admin_notes: string | null;
  proposal_link: string | null;
  ip_address: string | null;
}
```

---

### Finance

```typescript
export interface Finance {
  id: number;
  created_at: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string | null;
  status: 'paid' | 'pending' | 'scheduled';
  due_date: string | null;
  project_id: number | null;
}
```

---

### Certificate

```typescript
export interface Certificate {
  id: number;
  created_at: string;
  title: string;
  issuer: string | null;
  issue_date: string | null;
  file_url: string | null;
  verification_url: string | null;
  is_visible: boolean;
}
```

---

## 🔗 External APIs

### Supabase Client

**Configuration:**
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

**Auth Methods:**
```typescript
// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'admin@example.com',
  password: 'password'
});

// Logout
await supabase.auth.signOut();

// Get session
const { data: { session } } = await supabase.auth.getSession();
```

---

### WhatsApp Integration

**URL Format:**
```typescript
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
window.open(whatsappUrl, '_blank');
```

**Example:**
```typescript
const phoneNumber = '5547996496281';
const message = `Olá! Meu nome é ${name} da empresa ${company}.
Gostaria de falar sobre: ${projectDetails}`;

const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
window.open(url, '_blank');
```

---

## 📝 Response Formats

### Supabase Success Response

```typescript
{
  data: [...],  // Array of records or single record
  error: null,
  count: null,
  status: 200,
  statusText: 'OK'
}
```

### Supabase Error Response

```typescript
{
  data: null,
  error: {
    message: string,
    details: string,
    hint: string,
    code: string
  },
  count: null,
  status: 400,
  statusText: 'Bad Request'
}
```

---

## 🔄 State Management Patterns

### Fetch Pattern

```typescript
const [data, setData] = useState<Type[]>([]);
const [loading, setLoading] = useState(true);

async function fetchData() {
  try {
    setLoading(true);
    const { data, error } = await supabase.from('table').select('*');
    if (error) throw error;
    setData(data || []);
  } catch (error) {
    console.error('Error:', error);
    toast.error('Erro ao carregar dados');
  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  fetchData();
}, []);
```

### Optimistic Update Pattern

```typescript
async function updateItem(id: number, field: string, value: any) {
  // Optimistic UI update
  setItems(prev => prev.map(item =>
    item.id === id ? { ...item, [field]: value } : item
  ));

  // Server update
  const { error } = await supabase
    .from('table')
    .update({ [field]: value })
    .eq('id', id);

  // Rollback on error
  if (error) {
    fetchItems(); // Re-fetch to restore correct state
    toast.error('Erro ao atualizar');
  }
}
```

---

## 🎯 Best Practices

### Error Handling

```typescript
try {
  const { data, error } = await supabase
    .from('table')
    .insert(values);

  if (error) throw error;

  toast.success('✅ Success message');
} catch (error) {
  console.error('Error details:', error);
  toast.error('User-friendly error message');
}
```

### TypeScript Safety

```typescript
// ✅ Good: Type-safe query
const { data } = await supabase
  .from('projects')
  .select<'*', Project>('*');
// data is Project[]

// ❌ Bad: No type safety
const { data } = await supabase.from('projects').select('*');
// data is any[]
```

---

<div align="center">
  <strong>API Reference v1.0 | Last updated: 2026-01-28</strong>
</div>
