import { FileObject } from "components/FileDropzone/types";
import { attestationTypes } from "./constants";


type Meta = {
  name: string;
  issuer: string;
  acronym: string;
  description: string;
  external_link: string;
}

type WithUploadedFiles = {
  banner: string;
  logo: string;
}

export type AttestationType = typeof attestationTypes[number];

export type MetadataValues = Meta & {
  banner: FileObject;
  logo: FileObject
}

export type AttestationMetadataValues = MetadataValues & { attestationType: AttestationType }
export type AttestationMetadata = AttestationMetadataValues & WithUploadedFiles
export interface IssuerValues {
  addresses: string;
  attestation: number;
}
export interface DelegaterValues {
  delegate: string;
  org: string;
}


export type Metadata = Meta & WithUploadedFiles

export type IResponse = {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
};

export type LaunchMode = "create" | "update";

export type LauncherFormValues =  MetadataValues & { mode: LaunchMode }
export type AttestationFormValues = AttestationMetadataValues & { mode: LaunchMode }