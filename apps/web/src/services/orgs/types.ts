import { Metadata, MetadataValues } from "components/Transactors/types";

export type Revoked = {
  tokenId: string;
  revokedBy: string;
  owner: string;
  timestamp: number;
};

export type OrgMeta = {
  cid: string;
  address: string;
  dateCreated: number;
  delegates: string[];
  revocations: Revoked[];
  admin: string;
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