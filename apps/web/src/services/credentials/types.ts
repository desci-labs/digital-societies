import { Metadata, MetadataValues } from "components/Transactors/types";

export type CredentialToken = {
  org: string;
  tokenId: number;
  credential: number;
  dateIssued: number;
  issuer: string;
  owner: string;
};

export type CredentialToTokenMap = Record<string, CredentialToken[]>;

export type CredentialMeta = {
  id: number;
  mintedBy: string;
  cid: string;
  address: string;
  dateCreated: number;
};

export type Credential = CredentialMeta & { pending?: never, metadata: Metadata }
export type PendingCredential = CredentialMeta & { pending: boolean, metadata: MetadataValues }

export type CredentialMap = Record<string, (Credential | PendingCredential)[]>;

export type CredentialState = {
  credentials: CredentialMap;
  isLoading: boolean;
  tokens: CredentialToTokenMap;
};
