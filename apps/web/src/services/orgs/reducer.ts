import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { compareMetadata } from "helper";
import { FactoryState, Org, PendingOrg } from "./types";

const initialState: FactoryState = { data: [], isLoading: true };

const slice = createSlice({
  name: "orgs",
  initialState,
  reducers: {
    resetOrgs: () => initialState,
    setOrgs: (state, { payload }: PayloadAction<Org[]>) => {
      if (state.data.length === 0) {
        state.data = payload;
        return;
      }

      const updatable = payload.filter((data) => {
        if (data.metadata === null) return false;
        const prev = state.data.find((org) => org.address === data.address);
        if (!prev) return true;
        if (prev?.pending === true && data.metadata !== null) return true;
        if (prev.verified !== data.verified) return true;
        if (data.metadataUri !== prev.metadataUri) return true;
        // if (data.delegates.length !== prev.delegates.length) return true;

        // check diff in metadata
        const canUpdate = compareMetadata(prev.metadata, data.metadata);
        return canUpdate;
      });

      state.data = state.data.filter((org) => {
        if (updatable.find((d) => d.address === org.address)) return false;
        return true;
      });

      state.data.push(...updatable);
    },
    setOrg: (state, { payload }: PayloadAction<Org | PendingOrg>) => {
      const prev = state.data.find((org) => org.address === payload.address);
      if (!prev) {
        state.data.push(payload);
      } else if (
        prev.verified !== payload.verified ||
        (prev.pending && payload.metadata)
      ) {
        state.data = state.data.map((org) => {
          if (org.address === payload.address) return payload;
          return org;
        });
      } else {
        const canUpdate = compareMetadata(prev.metadata, payload.metadata);

        if (canUpdate) {
          state.data = state.data.map((org) => {
            if (org.address === payload.address) return payload;
            return org;
          });
        }
      }
    },

    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },

    addDelegates(
      state,
      { payload }: PayloadAction<{ org: string; delegates: string[] }>
    ) {
      const org = state.data.find((item) => item.address === payload.org);
      if (!org) return;
      org.delegates = org?.delegates ?? [];
      payload.delegates.forEach((delegate) => {
        if (!org?.delegates.includes(delegate)) {
          org?.delegates.push(delegate);
        }
      });
    },
    addDelegate(
      state,
      { payload }: PayloadAction<{ org: string; delegate: string }>
    ) {
      const org = state.data.find((item) => item.address === payload.org);
      if (org?.delegates.includes(payload.delegate)) return;
      org?.delegates.push(payload.delegate);
    },

    removeDelegate(
      state,
      { payload }: PayloadAction<{ org: string; delegate: string }>
    ) {
      const org = state.data.find((item) => item.address === payload.org);
      if (!org?.delegates.includes(payload.delegate)) return;
      org.delegates = org?.delegates.filter((el) => el !== payload.delegate);
    },
  },
});

export default slice.reducer;
export const {
  resetOrgs,
  setOrg,
  setOrgs,
  setIsLoading,
  addDelegate,
  addDelegates,
  removeDelegate,
} = slice.actions;
