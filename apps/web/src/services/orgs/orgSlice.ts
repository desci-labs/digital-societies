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
    }
  },
});

export default slice.reducer;
export const { resetOrgs, setOrg, setOrgs, setIsLoading } = slice.actions;
