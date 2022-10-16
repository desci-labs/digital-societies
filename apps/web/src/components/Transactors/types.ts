import { FileObject } from "components/FileDropzone/types";

type Meta = {
  name: string;
  issuer: string;
  acronym: string;
  description: string;
  external_link: string;
}
export type MetadataValues = Meta & {
  banner: FileObject;
  logo: FileObject
}

export interface IssuerValues {
  addresses: string;
  credential: number;
}
export interface DelegaterValues {
  delegate: string;
  org: string;
}


export type Metadata = Meta & {
  banner: string;
  logo: string;
}

export type IResponse = {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
};

export type LaunchMode = "create" | "update";

export type LauncherFormValues =  MetadataValues & { mode: LaunchMode }