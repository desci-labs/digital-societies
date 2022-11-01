import { FileObject } from "components/FileDropzone/types";
import { AttestationType } from "services/attestations/types";


type Meta = {
  name: string;
  issuer: string;
  symbol: string;
  acronym?: string;
  description: string;
  external_link: string;
}

type WithUploadedFiles = {
  banner: string;
  image: string;
}

export type MetadataValues = Meta & {
  banner: FileObject;
  image: FileObject;
}

export type AttestationMetadataValues = Omit<MetadataValues, "symbol" | "acronym"> & { attestationType: AttestationType }
export type AttestationMetadata = AttestationMetadataValues & WithUploadedFiles
export interface IssuerValues {
  org: string;
  address: string;
  attestation: number;
}
export interface DelegaterValues {
  delegate: string;
  org: string;
}

export const ASSOCIATED_SOCIALS = ["facebook", "linkedin", "twitter", "github", "discord"] as const;
export type Socials = typeof ASSOCIATED_SOCIALS //"facebook" | "linkedin" | "twitter" | "github" | "discord";

export type AssociatedDataValues = { owner: string; notes: string } & {
  [K in Socials[number]]: string;
}

export type Metadata = Meta & WithUploadedFiles

export type IResponse = {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
};

export type LaunchMode = "create" | "update";

export type LauncherFormValues = MetadataValues & { mode: LaunchMode }
export type AttestationFormValues = AttestationMetadataValues & { mode: LaunchMode }