import { Metadata, MetadataValues } from "components/Transactors/types";

export type AttestationToken = {
  org: string;
  tokenId: number;
  attestation: number;
  dateIssued: number;
  issuer: string;
  owner: string;
};

export type AttestationToTokenMap = Record<string, AttestationToken[]>;

type AttestationMeta = {
  id: number;
  mintedBy: string;
  cid: string;
  address: string;
  dateCreated: number;
};

export type Attestation = AttestationMeta & { pending?: never, metadata: Metadata }
export type PendingAttestation = AttestationMeta & { pending: boolean, metadata: MetadataValues }

export type AttestationMap = Record<string, (Attestation | PendingAttestation)[]>;

export type AttestationState = {
  attestations: AttestationMap;
  isLoading: boolean;
  tokens: AttestationToTokenMap;
};
