export type PinDataRes =
  | string
  | string[]
  | { status: string; message: string; error?: unknown };
