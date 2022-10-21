import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AttestationTokenRecipient } from "./types";

const initialState: AttestationTokenRecipient[] = [];

const slice = createSlice({
  name: "admin/recipientUpdator",
  initialState,
  reducers: {
    setRecipients: (_, { payload }: PayloadAction<AttestationTokenRecipient[]>) => payload,
    toggleDeleteExistingRecipient: (state, { payload }: PayloadAction<string>) => {
      const recipient = state.find(r => r.address === payload);
      recipient!.is_deleted = !recipient!.is_deleted;
    },
    addRecipient: (state, { payload }: PayloadAction<string>) => {
      state.push({ address: payload, is_added: true, is_deleted: false })
    },
    undoAddRecipient: (state, { payload }: PayloadAction<string>) => {
      const idx = state.findIndex(recipient => recipient.address === payload);
      state.splice(idx, 1);
    }
  },
});

export default slice.reducer;
export const { addRecipient, undoAddRecipient, setRecipients, toggleDeleteExistingRecipient } = slice.actions;
