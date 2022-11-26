import { AssociatedDataValues } from "components/Transactors/types";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      associated_metadata: {
        Row: {
          id: number;
          created_at: string | null;
          updated_at: string | null;
          org: string;
          owner: string;
          metadata: Omit<AssociatedDataValues, "owner">;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          updated_at?: string | null;
          org: string;
          owner: string;
          metadata: Omit<AssociatedDataValues, "owner">;
        };
        Update: {
          id?: number;
          created_at: string | null;
          updated_at?: string | null;
          org: string;
          owner: string;
          metadata: Omit<AssociatedDataValues, "owner">;
        };
      };
      societies_manager: {
        Row: {
          id: number;
          created_at: string | null;
          updated_at: string | null;
          address: string;
          disabled: boolean;
        };
        Insert: {
          id?: never;
          created_at?: string | null;
          updated_at?: string | null;
          address: string;
          disabled: boolean;
        };
        Update: {
          id: number;
          created_at?: string | null;
          updated_at?: string | null;
          address?: string;
          disabled?: boolean;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
