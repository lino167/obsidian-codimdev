export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
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

type DefaultSchema = Database["public"]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof Database
}
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof Database
}
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
