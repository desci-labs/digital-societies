import { FileObject } from "components/FileDropzone/types";

type Meta = {
  name: string;
  issuer: string;
  symbol: string;
  description: string;
  external_link: string;
}
export type MetadataValues = Meta & {
  image: FileObject;
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
  image: string;
  logo: string;
}

export type IResponse = {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
};