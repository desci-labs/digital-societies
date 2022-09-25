import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { compareMetadata } from "helper";
import {
  Credential,
  CredentialMap,
  CredentialState,
  CredentialToken,
  CredentialToTokenMap,
  PendingCredential,
} from "./types";

const initialState: CredentialState = {
  credentials: {},
  tokens: {},
  isLoading: true,
};

const slice = createSlice({
  name: "credentials",
  initialState,
  reducers: {
    resetCredentials: (_state) => initialState,
    setCredentials: (state, { payload }: PayloadAction<CredentialMap>) => {
      Object.keys(payload).forEach((address) => {
        const credentials = state.credentials[address];
        if (!credentials) {
          state.credentials[address] = payload[address];
          return;
        }
        const updatable = payload[address].filter((data) => {
          if (data.metadata === null) return false;
          const prev = credentials.find(
            (credential) => credential.id === data.id
          );
          if (prev?.metadata === null) return true;

          if (!prev) return true;
          if (prev?.pending === true && data.metadata !== null) return true;

          if (data.cid !== prev.cid) return true;
          // check diff in metadata
          const canUpdate = compareMetadata(prev.metadata, data.metadata);
          return canUpdate;
        });

        state.credentials[address] = credentials.filter((credential) => {
          if (updatable.find((d) => d.id === credential.id)) return false;
          return true;
        });

        state.credentials[address].push(...updatable);
      });
    },
    setCredential: (
      state,
      {
        payload,
      }: PayloadAction<{
        address: string;
        credential: Credential | PendingCredential;
      }>
    ) => {
      if (!state.credentials[payload.address]) {
        state.credentials[payload.address] = [];
      }

      const prev = state.credentials[payload.address]?.find(
        (cred) => cred.id === payload.credential.id
      );

      if (!prev) {
        state.credentials[payload.address].push(payload.credential);
      } else if (payload.credential.metadata && prev.pending) {
        state.credentials[payload.address].map((cred) => {
          if (cred.id === payload.credential.id) return payload.credential;
          return cred;
        });
      } else {
        const canUpdate = compareMetadata(prev.metadata, payload.credential.metadata);
        if (canUpdate) {
          state.credentials[payload.address] = state.credentials[payload.address].filter(cred => cred.id !== payload.credential.id);
          state.credentials[payload.address].push(payload.credential)
        }
      }
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setTokens: (state, { payload }: PayloadAction<CredentialToTokenMap>) => {
      Object.keys(payload).forEach((org) => {
        if (!state.tokens[org]) {
          state.tokens[org] = payload[org];
          return;
        }

        state.tokens[org] = state.tokens[org].filter((t) => {
          if (payload[org].find((data) => t.tokenId == data.tokenId || (t.credential === data.credential && t.owner === data.owner))) {
            return false;
          }
          return true
        });
        state.tokens[org].push(...payload[org]);
      });
    },
    removeTokens: (
      state,
      { payload }: PayloadAction<{ tokenIds: number[]; address: string }>
    ) => {
      const update = state.tokens[payload.address].filter(
        (token) => !payload.tokenIds.includes(token.tokenId)
      );
      state.tokens[payload.address] = update;
    },
    removeToken: (
      state,
      { payload }: PayloadAction<{ tokenId: number; address: string }>
    ) => {
      const update = state.tokens[payload.address].filter(
        (token) => token.tokenId != payload.tokenId
      );
      state.tokens[payload.address] = update;
    },
  },
});

export default slice.reducer;
export const {
  resetCredentials,
  setCredential,
  setCredentials,
  setIsLoading,
  setTokens,
  removeToken,
  removeTokens,
} = slice.actions;
