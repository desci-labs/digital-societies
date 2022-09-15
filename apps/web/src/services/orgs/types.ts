import { Metadata } from "components/Transactors/types";

export type Revoked = {
  tokenId: string;
  revokedBy: string;
  owner: string;
  timestamp: number;
};
export type Org = {
  cid: string;
  metadata: Metadata;
  address: string;
  owner: string;
  dateCreated: number;
  delegates: string[];
  revocations: Revoked[];
  admin: string;
};

export type FactoryState = { data: Org[]; isLoading: boolean };