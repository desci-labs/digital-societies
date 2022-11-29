import { Database } from "services/database/Index";

export type AssociatedDataRow =
  Database["public"]["Tables"]["associated_metadata"]["Row"];
export type AssociatedDataInsert =
  Database["public"]["Tables"]["associated_metadata"]["Insert"];
export type AssociatedDataUpdate =
  Database["public"]["Tables"]["associated_metadata"]["Update"];

export type SocietyDataRow =
  Database["public"]["Tables"]["societies_manager"]["Row"];
export type SocietyDataInsert =
  Database["public"]["Tables"]["societies_manager"]["Insert"];
export type SocietyDataUpdate =
  Database["public"]["Tables"]["societies_manager"]["Update"];

export type CustomDataError = Error & { data: { message: string } };
export type ApiResponse = { status: string; message?: string };
export type QueryParams = { address?: string };
