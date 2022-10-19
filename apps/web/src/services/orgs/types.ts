import { Metadata, MetadataValues } from "components/Transactors/types";

export type Revoked = {
  tokenId: number;
  revokedBy: string;
  owner: string;
  timestamp: number;
};

export type OrgMeta = {
  cid: string;
  address: string;
  dateCreated: number;
  delegates: string[];
  admin: string;
  verified: boolean;
  // tokenURI: string,
};

export type PendingOrg = OrgMeta & {
  pending: boolean;
  metadata: MetadataValues;
}

export type Org = OrgMeta & {
  pending?: never;
  metadata: Metadata;
}

export type FactoryState = { data: (Org | PendingOrg)[]; isLoading: boolean };