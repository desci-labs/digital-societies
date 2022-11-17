import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { compareAttestationMetadata } from "helper";
import {
  Attestation,
  AttestationMap,
  AttestationState,
  AttestationTokens,
  AttestationToTokenMap,
  PendingAttestation,
} from "./types";

const initialState: AttestationState = {
  attestations: {},
  tokens: {},
  isLoading: true,
};

const slice = createSlice({
  name: "attestation",
  initialState,
  reducers: {
    setAttestations: (state, { payload }: PayloadAction<AttestationMap>) => {
      Object.keys(payload).forEach((address) => {
        const attestations = state.attestations[address];
        if (!attestations) {
          state.attestations[address] = payload[address];
          return;
        }
        const updatable = payload[address].filter((data) => {
          if (data.metadata === null) return false;
          const prev = attestations.find(
            (attestation) => attestation.id === data.id
          );
          if (prev?.metadata === null) return true;

          if (!prev) return true;
          if (prev?.pending === true && data.metadata !== null) return true;

          if (data.cid !== prev.cid) return true;
          // check diff in metadata
          const canUpdate = compareAttestationMetadata(
            prev.metadata,
            data.metadata
          );
          return canUpdate;
        });

        state.attestations[address] = attestations.filter((attestation) => {
          if (updatable.find((d) => d.id === attestation.id)) return false;
          return true;
        });

        state.attestations[address].push(...updatable);
      });
    },
    setAttestation: (
      state,
      {
        payload,
      }: PayloadAction<{
        address: string;
        attestation: Attestation | PendingAttestation;
      }>
    ) => {
      if (!state.attestations[payload.address]) {
        state.attestations[payload.address] = [];
      }

      const prev = state.attestations[payload.address]?.find(
        (cred) => cred.id === payload.attestation.id
      );

      if (!prev) {
        state.attestations[payload.address].push(payload.attestation);
      } else if (payload.attestation.metadata && prev.pending) {
        state.attestations[payload.address].map((cred) => {
          if (cred.id === payload.attestation.id) return payload.attestation;
          return cred;
        });
      } else {
        const canUpdate =
          prev.cid !== payload.attestation.cid ||
          compareAttestationMetadata(
            prev.metadata,
            payload.attestation.metadata
          );

        if (canUpdate) {
          state.attestations[payload.address] = state.attestations[
            payload.address
          ].filter((cred) => cred.id !== payload.attestation.id);
          state.attestations[payload.address].push(payload.attestation);
        }
      }
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setTokens: (state, { payload }: PayloadAction<AttestationToTokenMap>) => {
      Object.keys(payload).forEach((org) => {
        if (!state.tokens[org]) {
          state.tokens[org] = payload[org];
          return;
        }

        state.tokens[org] = state.tokens[org].filter((t) => {
          if (
            payload[org].find(
              (data) =>
                t.tokenId == data.tokenId &&
                t.attestation === data.attestation &&
                t.owner === data.owner
            )
          ) {
            return false;
          }
          return true;
        });
        state.tokens[org].push(...payload[org]);
      });
    },
    removeTokens: (
      state,
      { payload }: PayloadAction<{ tokenIds: number[]; address: string }>
    ) => {
      state.tokens[payload.address] = state.tokens[payload.address].filter(
        (token) => {
          if (payload.tokenIds.includes(token.tokenId)) return true;
          return false;
        }
      );
    },
    updateTokens: (
      state,
      {
        payload,
      }: PayloadAction<{ tokens: AttestationTokens[]; address: string }>
    ) => {
      state.tokens[payload.address] = state.tokens[payload.address].map(
        (token) => {
          const update = payload.tokens.find(
            (t) => t.tokenId === token.tokenId
          );
          if (!update) return token;
          return update;
        }
      );
    },
  },
});

export default slice.reducer;
export const {
  setAttestation,
  setAttestations,
  setIsLoading,
  setTokens,
  removeTokens,
  updateTokens,
} = slice.actions;
