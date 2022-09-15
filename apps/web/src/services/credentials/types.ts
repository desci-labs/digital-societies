import { Metadata } from "components/Transactors/types";

export type CredentialToken = {
  org: string;
  tokenId: number;
  credential: number;
  dateIssued: number;
  issuer: string;
  owner: string;
};
export type CredentialToTokenMap = Record<string, CredentialToken[]>;

export type Credential = {
  id: number;
  mintedBy: string;
  cid: string;
  metadata: Metadata;
  address: string;
  dateCreated: number;
  pending?: boolean;
  tokens: CredentialToken;
};
export type CredentialMap = Record<string, Credential[]>;

export type CredentialState = {
  credentials: CredentialMap;
  isLoading: boolean;
  tokens: CredentialToTokenMap;
};
