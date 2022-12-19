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
        const prev = state.data.find(
          (org) => org.address.toLowerCase() === data.address.toLowerCase()
        );
        if (!prev) return true;

        if (prev?.pending === true && data.pending === false) return true;
        if (prev.verified !== data.verified) return true;
        if (data.metadataUri !== prev.metadataUri) return true;
        if (prev.delegateRoleId !== data.delegateRoleId) return true;

        // check diff in metadata
        const canUpdate = compareMetadata(prev.metadata, data.metadata);
        return canUpdate;
      });

      state.data = state.data.filter((org) => {
        if (
          updatable.find(
            (d) => d.address.toLowerCase() === org.address.toLowerCase()
          )
        )
          return false;
        return true;
      });
      state.data.push(...updatable);
    },
    setOrg: (state, { payload }: PayloadAction<Org | PendingOrg>) => {
      const prev = state.data.find(
        (org) => org.address.toLowerCase() === payload.address.toLowerCase()
      );
      if (!prev) {
        state.data.push(payload);
      } else if (
        prev.verified !== payload.verified ||
        (prev.pending && payload.metadata)
      ) {
        state.data = state.data.map((org) => {
          if (org.address.toLowerCase() === payload.address.toLowerCase())
            return payload;
          return org;
        });
      } else {
        const canUpdate = compareMetadata(prev.metadata, payload.metadata);

        if (canUpdate) {
          state.data = state.data.map((org) => {
            if (org.address.toLowerCase() === payload.address.toLowerCase())
              return payload;
            return org;
          });
        }
      }
    },

    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },

    resetDelegates(
      state,
      { payload }: PayloadAction<{ org: string; delegates: string[] }>
    ) {
      const org = state.data.find((item) => item.address === payload.org);
      if (!org) return;
      org.delegates = payload.delegates ?? [];
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
    removeDelegates(
      state,
      { payload }: PayloadAction<{ org: string; delegates: string[] }>
    ) {
      const org = state.data.find((item) => item.address === payload.org);
      if (!org) return;
      org.delegates = org?.delegates ?? [];
      org.delegates = org.delegates.filter((delegate) =>
        payload.delegates.includes(delegate)
      );
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
  removeDelegates,
  resetDelegates,
} = slice.actions;
