import { Metadata, MetadataValues } from "components/Transactors/types";

export type Revoked = {
  tokenId: number;
  revokedBy: string;
  owner: string;
  timestamp: number;
};

export type OrgMeta = {
  address: string;
  dateCreated: number;
  delegates: string[];
  admin: string;
  verified: boolean;
  delegateRoleId: string;
  metadataUri: string;
};

export type PendingOrg = OrgMeta & {
  pending: boolean;
  metadata: MetadataValues;
};

export type Org = OrgMeta & {
  pending?: false;
  metadata: Metadata;
};

export type FactoryState = { data: (Org | PendingOrg)[]; isLoading: boolean };
