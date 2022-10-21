import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AttestationTokenRecipient } from "./types";

const initialState: AttestationTokenRecipient[] = [
  // {
  //   address: "0xa408bacA39E3B6504FDd599e22F9c4E6dbE0e27E",
  //   is_added: true,
  //   is_deleted: false,
  // },
  // {
  //   address: "0xaf08bacBADFB6504FDd599e22F9c4E6dbE0e27a",
  //   is_added: false,
  //   is_deleted: true,
  // },
];

const slice = createSlice({
  name: "admin/recipientUpdator",
  initialState,
  reducers: {
    setRecipients: (
      _,
      { payload }: PayloadAction<AttestationTokenRecipient[]>
    ) => payload,
    toggleDeleteExistingRecipient: (
      state,
      { payload }: PayloadAction<string>
    ) => {
      const recipient = state.find((r) => r.address === payload);
      recipient!.is_deleted = !recipient!.is_deleted;
    },
    addRecipient: (state, { payload }: PayloadAction<AttestationTokenRecipient>) => {
      state.push(payload);
    },
    undoAddRecipient: (state, { payload }: PayloadAction<string>) => {
      const idx = state.findIndex((recipient) => recipient.address === payload);
      state.splice(idx, 1);
    },
  },
});

export default slice.reducer;
export const {
  addRecipient,
  undoAddRecipient,
  setRecipients,
  toggleDeleteExistingRecipient,
} = slice.actions;
