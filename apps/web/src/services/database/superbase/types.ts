export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      associated_metadata: {
        Row: {
          id: number
          created_at: string | null
          updated_at: string | null
          org: string
          owner: string
          metadata: Json
        }
        Insert: {
          id?: number
          created_at?: string | null
          updated_at?: string | null
          org: string
          owner: string
          metadata: Json
        }
        Update: {
          id?: number
          created_at: string | null
          updated_at?: string | null
          org: string
          owner: string
          metadata: Json
        }
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
  }
}
