import { Metadata, MetadataValues } from "components/Transactors/types";

export type AttestationToken  = {
  org: string;
  tokenId: number;
  attestation: number;
  dateIssued: number;
  issuer: string;
  owner: string;
  active: true;
};


export type RevokedAttestationToken = {
  org: string;
  tokenId: number;
  attestation: number;
  dateRevoked: number;
  issuer: string;
  owner: string;
  active: false;
  revokedBy: string;
};

export type AttestationTokens = AttestationToken | RevokedAttestationToken;

export type AttestationToTokenMap = Record<string, AttestationTokens[]>;

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
