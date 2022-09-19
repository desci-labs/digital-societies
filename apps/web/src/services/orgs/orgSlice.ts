import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FactoryState, Org, PendingOrg, Revoked } from "./types";

const initialState: FactoryState = { data: [], isLoading: true };

const slice = createSlice({
  name: "orgs",
  initialState,
  reducers: {
    resetOrgs: () => initialState,
    setOrgs: (
      state,
      { payload }: PayloadAction<Org[]>
    ) => {
      state.data = payload.filter(org => !!org.metadata);
      state.isLoading = false;
    },
    setOrg: (
      state,
      { payload }: PayloadAction<Org | PendingOrg>
    ) => {
      const prev = state.data.find(org => org.address  === payload.address)
      if (!prev)  {
        state.data.push(payload);
      } else if (prev.pending && payload.metadata) {
        state.data = state.data.map(org => {
          if (org.address === payload.address) return payload;
          return org;
        })
      }
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },

    addDelegate(state, { payload }: PayloadAction<{ org: string; delegate: string }> ) {
      const org = state.data.find(item => item.address === payload.org);
      if (org?.delegates.includes(payload.delegate)) return;
      org?.delegates.push(payload.delegate);
    },

    removeDelegate(state, { payload }: PayloadAction<{ org: string; delegate: string }> ) {
      const org = state.data.find(item => item.address === payload.org);
      if (!org?.delegates.includes(payload.delegate)) return;
      org.delegates = org?.delegates.filter(el => el !== payload.delegate)
    },

    addRevocation(state, { payload }: PayloadAction<{ org: string; token: Revoked }>) {
      const org = state.data.find(org => org.address === payload.org);
      const exists = org?.revocations.find(t => t.tokenId);
      if (exists?.tokenId === payload.token.tokenId) return;
      org?.revocations.push(payload.token);
    }, 
  },
});

export default slice.reducer;
export const { resetOrgs, setOrg, setOrgs, setIsLoading, addDelegate, removeDelegate, addRevocation } = slice.actions;
