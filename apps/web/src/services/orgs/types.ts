import { Metadata } from "components/Transactors/types";

export type Revoked = {
  tokenId: string;
  revokedBy: string;
  owner: string;
  timestamp: number;
};
export type Org = {
  cid: string;
  address: string;
  dateCreated: number;
  delegates: string[];
  revocations: Revoked[];
  admin: string;
  pending: boolean;
  metadata: Metadata;
};

export type FactoryState = { data: Org[]; isLoading: boolean };