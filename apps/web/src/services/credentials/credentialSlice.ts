import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
      Object.keys(payload).forEach(org => {
        state.credentials[org] = payload[org].filter(cred => !!cred.metadata)
      })
      state.isLoading = false;
    },
    setCredential: (
      state,
      { payload }: PayloadAction<{ address: string; credential: Credential | PendingCredential }>
    ) => {
      if (!state.credentials[payload.address]) {
        state.credentials[payload.address] = [];
      }

      const prev = state.credentials[payload.address]?.find(cred => cred.id === payload.credential.id)
      if (!prev) {
        state.credentials[payload.address].push(payload.credential);
      } else if (payload.credential.metadata && prev.pending) {
        state.credentials[payload.address].map(cred => {
          if (cred.id === payload.credential.id) return payload.credential;
          return cred;
        })
      }
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setTokens: (state, { payload }: PayloadAction<CredentialToTokenMap>) => {
      state.tokens = payload;
    },
    setToken: (
      state,
      { payload }: PayloadAction<{ token: CredentialToken; address: string }>
    ) => {
      
      if (!state.tokens[payload.address]) {
        state.tokens[payload.address] = [];
      }

      const update = state.tokens[payload.address].filter(
        (token) => token.tokenId != payload.token.tokenId
      );
      state.tokens[payload.address] = update.concat(payload.token);
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
  setToken,
  setTokens,
  removeToken,
} = slice.actions;
