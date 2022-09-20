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
          if (!prev) return true;
          if (prev?.pending === true && data.metadata !== null) return true;
          return false;
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
          if(payload[org].find((data) => t.tokenId == data.tokenId)) {
            return false;
          }
          return true
      });
        state.tokens[org].push(...payload[org]);
      });
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
