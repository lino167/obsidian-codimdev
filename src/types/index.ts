export interface Project {
  id: number;
  title: string;
  description: string | null;
  image_url: string | null;
  tech_stack: string[] | null;
  repo_url: string | null;
  live_url: string | null;
  featured: boolean;
  status: string | null;
  created_at: string;
}

export interface Lead {
  id: number;
  created_at: string;
  name: string;
  email: string;
  message: string | null;
  status: string | null;
  ip_address: string | null;
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
