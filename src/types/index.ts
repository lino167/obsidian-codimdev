export interface Project {
  id: number;
  created_at: string;
  title: string;
  slug: string | null;
  short_description: string | null;
  full_description: string | null;
  cover_image: string | null;
  gallery_images: string[] | null;
  tech_stack: string[] | null;
  live_url: string | null;
  repo_url: string | null;
  is_featured: boolean | null;
  is_public: boolean | null;
  status: string | null;
  client_name: string | null;
  budget: number | null;
  deadline: string | null;
  progress: number | null;
}

export interface Lead {
  id: number;
  created_at: string;
  name: string;
  email: string;
  message: string | null;
  ip_address: string | null;

  // CRM Fields
  status: 'new' | 'contacted' | 'negotiating' | 'converted' | 'archived';
  company: string | null;
  phone: string | null;
  project_type: 'landing_page' | 'webapp' | 'ecommerce' | 'mobile_app' | 'other' | null;
  estimated_budget: string | null;
  admin_notes: string | null;
  proposal_link: string | null;
}

export interface Finance {
  id: number;
  created_at: string;
  title: string | null;
  amount: number;
  type: 'income' | 'expense';
  category: string | null;
  status: string | null;
}
