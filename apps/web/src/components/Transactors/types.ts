import { FileObject } from "components/FileDropzone/types";

export interface MetadataValues {
  name: string;
  issuer: string;
  symbol: string;
  description: string;
  external_link: string;
  image: FileObject;
}

export type Metadata = MetadataValues & { image: string }
export type IResponse = {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
};