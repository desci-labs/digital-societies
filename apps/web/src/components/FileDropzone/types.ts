import { FieldValues, Path } from "react-hook-form";

export type BaseProps<T extends FieldValues> = {
  name: Path<T>;
  className?: string;
  disabled?: boolean;
  hasError?: boolean;
}

export type FileObject = { file: File, name: string } & { ipfsHash: string };