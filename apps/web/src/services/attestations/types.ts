import { attestationTypes } from "components/Transactors/constants";
import {
  AttestationMetadata,
  AttestationMetadataValues,
} from "components/Transactors/types";

export type AttestationToken = {
  society: string;
  tokenId: number;
  attestation: string;
  owner: string;
  active: boolean;
  issuedBy: string;
  issuedAt: number;
  revokedAt?: never;
  revokedBy?: never;
};

export type RevokedAttestationToken = {
  society: string;
  tokenId: number;
  attestation: string;
  owner: string;
  active: false;
  issuedBy: string;
  revokedAt: number;
  issuedAt: number;
  revokedBy: string;
};

export type AttestationTokens = AttestationToken | RevokedAttestationToken;

export type AttestationToTokenMap = Record<string, AttestationTokens[]>;

export type AttestationType = typeof attestationTypes[number];

type AttestationMeta = {
  id: string;
  metadataUri: string;
  society: string;
  createdAt: number;
  updatedAt?: number;
};

export type Attestation = AttestationMeta & {
  pending?: never;
  metadata: AttestationMetadata;
};
export type PendingAttestation = AttestationMeta & {
  pending: boolean;
  metadata: AttestationMetadataValues;
};

export type AttestationMap = Record<
  string,
  (Attestation | PendingAttestation)[]
>;

export type AttestationState = {
  attestations: AttestationMap;
  isLoading: boolean;
  tokens: AttestationToTokenMap;
};
