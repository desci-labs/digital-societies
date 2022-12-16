import { FileObject } from "components/FileDropzone/types";
import { FC } from "react";
import { AttestationType } from "services/attestations/types";

export type TxProps<T extends JSX.IntrinsicAttributes> = {
  inModal?: boolean;
  Content: FC<T>;
  contentProps: T;
};

export type MetaProperties = {
  description: string;
};

type Meta = {
  name: string;
  symbol: string;
  acronym?: string;
  description: string;
  external_link: string;
  properties: MetaProperties;
};

type WithUploadedFiles = {
  banner: string;
  image: string;
};

export type MetadataValues = Meta & {
  banner: FileObject;
  image: FileObject;
};

export type AttestationMetadataValues = Omit<
  MetadataValues,
  "symbol" | "acronym" | "banner"
> & { attestationType: AttestationType };

export type AttestationMetadata = Omit<Meta, "symbol" | "acronym"> & {
  attestationType: AttestationType;
} & { image: string };
export interface IssuerValues {
  society: string;
  address: string;
  attestation: string;
}
export interface DelegaterValues {
  delegate: string;
  society: string;
}

export const ASSOCIATED_SOCIALS = [
  "Facebook",
  "Linkedin",
  "Twitter",
  "Discord",
  "Github",
] as const;
export type Socials = typeof ASSOCIATED_SOCIALS; //"facebook" | "linkedin" | "twitter" | "github" | "discord";

export type AssociatedDataValues = { owner: string; notes: string } & {
  [K in Socials[number]]: string;
};

export type Metadata = Meta & WithUploadedFiles;

export type IResponse = {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
};

export type LaunchMode = "create" | "update";

export type LauncherFormValues = MetadataValues & { mode: LaunchMode };
export type AttestationFormValues = AttestationMetadataValues & {
  mode: LaunchMode;
};
