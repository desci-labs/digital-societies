import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FactoryState, Org, PendingOrg } from "./types";

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

    addDelegates(state, { payload }: PayloadAction<{ org: string; delegate: string }> ) {
      const delegates = state.data.find(item => item.address === payload.org)?.delegates ?? [];
      state.data.map(org => {
        if (org.address === payload.org) {
          return { ...org, delegates: delegates.includes(payload.delegate) ? delegates : delegates.concat([payload.delegate])}
        }
        return org;
      })
    },
    removeDelegates(state, { payload }: PayloadAction<{ org: string; delegate: string }> ) {
      const delegates = state.data.find(item => item.address === payload.org)?.delegates ?? [];
      
      if (!delegates.includes(payload.delegate)) return;

      state.data.map(org => {
        if (org.address === payload.org) {
          return { ...org, delegates:  delegates.filter(el => el !== payload.delegate)}
        }
        return org;
      })
    }
  },
});

export default slice.reducer;
export const { resetOrgs, setOrg, setOrgs, setIsLoading, addDelegates } = slice.actions;
