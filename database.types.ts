export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      certificates: {
        Row: {
          date_issued: string | null
          file_url: string | null
          id: number
          issuer: string
          title: string
        }
        Insert: {
          date_issued?: string | null
          file_url?: string | null
          id?: number
          issuer: string
          title: string
        }
        Update: {
          date_issued?: string | null
          file_url?: string | null
          id?: number
          issuer?: string
          title?: string
        }
        Relationships: []
      }
      finances: {
        Row: {
          amount: number
          category: string | null
          created_at: string
          id: number
          status: string | null
          title: string | null
          type: string
        }
        Insert: {
          amount: number
          category?: string | null
          created_at?: string
          id?: number
          status?: string | null
          title?: string | null
          type: string
        }
        Update: {
          amount?: number
          category?: string | null
          created_at?: string
          id?: number
          status?: string | null
          title?: string | null
          type?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string
          email: string
          id: number
          ip_address: string | null
          message: string | null
          name: string
          status: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          ip_address?: string | null
          message?: string | null
          name: string
          status?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          ip_address?: string | null
          message?: string | null
          name?: string
          status?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          budget: number | null
          client_name: string | null
          cover_image: string | null
          created_at: string
          deadline: string | null
          full_description: string | null
          gallery_images: string[] | null
          id: number
          is_featured: boolean | null
          is_public: boolean | null
          live_url: string | null
          progress: number | null
          repo_url: string | null
          short_description: string | null
          slug: string | null
          status: string | null
          tech_stack: string[] | null
          title: string
        }
        Insert: {
          budget?: number | null
          client_name?: string | null
          cover_image?: string | null
          created_at?: string
          deadline?: string | null
          full_description?: string | null
          gallery_images?: string[] | null
          id?: number
          is_featured?: boolean | null
          is_public?: boolean | null
          live_url?: string | null
          progress?: number | null
          repo_url?: string | null
          short_description?: string | null
          slug?: string | null
          status?: string | null
          tech_stack?: string[] | null
          title: string
        }
        Update: {
          budget?: number | null
          client_name?: string | null
          cover_image?: string | null
          created_at?: string
          deadline?: string | null
          full_description?: string | null
          gallery_images?: string[] | null
          id?: number
          is_featured?: boolean | null
          is_public?: boolean | null
          live_url?: string | null
          progress?: number | null
          repo_url?: string | null
          short_description?: string | null
          slug?: string | null
          status?: string | null
          tech_stack?: string[] | null
          title?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          created_at: string
          due_date: string | null
          id: number
          priority: string | null
          project_id: number | null
          status: string | null
          title: string
        }
        Insert: {
          created_at?: string
          due_date?: string | null
          id?: number
          priority?: string | null
          project_id?: number | null
          status?: string | null
          title: string
        }
        Update: {
          created_at?: string
          due_date?: string | null
          id?: number
          priority?: string | null
          project_id?: number | null
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string
          id: string
          operator_name: string | null
        }
        Insert: {
          created_at?: string
          id: string
          operator_name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          operator_name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Simplified helper types
export type Tables<TableName extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][TableName]['Row']

export type TablesInsert<TableName extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][TableName]['Insert']

export type TablesUpdate<TableName extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][TableName]['Update']
