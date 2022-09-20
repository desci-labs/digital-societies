import { FileObject } from "components/FileDropzone/types";

type Meta = {
  name: string;
  issuer: string;
  symbol: string;
  description: string;
  external_link: string;
}
export type MetadataValues = Meta & {
  banner: FileObject;
  badge: FileObject
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
  badge: string;
}

export type IResponse = {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
};