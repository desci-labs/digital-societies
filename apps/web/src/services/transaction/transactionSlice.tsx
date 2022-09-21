import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormError, Stage, State, Step } from "./types";

const initialState: State = { form_error: "", form_loading: false, stage: { step: Step.form }};

const slice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setFormLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.form_loading = payload;
    },
    setFormError: (state, { payload }: PayloadAction<FormError | null>) => {
      console.log('set error payload', payload);
      console.log('set error state', state);
    },
    resetTxFormState: (state) => {
      state.form_error = "";
      state.form_loading = false;
    },
    setStage: (state, { payload }: PayloadAction<Stage>) => {
      state.stage = payload;
    }
  },
});

export default slice.reducer;
export const { setStage, setFormError, setFormLoading, resetTxFormState } = slice.actions;
