import { Database } from "services/database/Index"

export type AssociatedDataRow = Database["public"]["Tables"]["associated_metadata"]["Row"]
export type AssociatedDataInsert = Database["public"]["Tables"]["associated_metadata"]["Insert"]
export type AssociatedDataUpdate = Database["public"]["Tables"]["associated_metadata"]["Update"]