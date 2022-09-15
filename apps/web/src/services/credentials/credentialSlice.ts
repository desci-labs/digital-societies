import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Credential,
  CredentialMap,
  CredentialState,
  CredentialToken,
  CredentialToTokenMap,
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
      state.credentials = payload;
    },
    setCredential: (
      state,
      { payload }: PayloadAction<{ address: string; credential: Credential }>
    ) => {
      const filtered = state.credentials[payload.address].filter(
        (c) => c.id != payload.credential.id
      );
      state.credentials[payload.address] = filtered.concat(payload.credential);
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
