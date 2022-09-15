import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChainIDs } from "constants/chains";
import { FactoryState, Org } from "./types";

interface State {
  chainId?: ChainIDs;
  address?: string;
  tokenBalance: string | number;
}

const initialState: FactoryState = { data: [], isLoading: true };

const slice = createSlice({
  name: "orgs",
  initialState,
  reducers: {
    resetOrgs: (state) => initialState,
    setOrgs: (
      state,
      { payload }: PayloadAction<Org[]>
    ) => {
      state.data = payload;
    },
    setOrg: (
      state,
      { payload }: PayloadAction<Org>
    ) => {
      state.data.push(payload);
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    }
  },
});

export default slice.reducer;
export const { resetOrgs, setOrg, setOrgs, setIsLoading } = slice.actions;
