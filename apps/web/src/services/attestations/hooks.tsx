import { useGetter } from "store/accessors";
import { AttestationToken, RevokedAttestationToken } from "./types";

export function useGetAttestationState() {
  const state = useGetter(state => state.attestations);
  return state;
}

export function useGetAttestations(address: string) {
  const { attestations } = useGetter(state => state.attestations);
  return attestations[address]?.filter(c => c.metadata !== null) ?? [];
}

export function useGetAttestation(address: string, id: number) {
  const attestations = useGetAttestations(address);
  return attestations.find((attestation) => attestation.id === id);
}

export function useGetTokens(address: string) {
  const { tokens } = useGetAttestationState();
  return tokens[address] ?? [];
}

export function useGetAttestationTokens(address: string, attestation: number) {
  const tokens = useGetTokens(address);
  return tokens.filter((token) => token.attestation === attestation && token.active === true) as AttestationToken[];
}

export function useGetRevokedAttestationTokens(address: string, attestation: number): RevokedAttestationToken[] {
  const tokens = useGetTokens(address);
  return tokens.filter((token) => token.attestation === attestation && token.active === false) as RevokedAttestationToken[];
}
