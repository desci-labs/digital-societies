import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormError, Stage, State, Step } from "./types";

const initialState: State = {
  form_error: "",
  form_loading: false,
  stage: { step: Step.form },
};

const slice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setFormLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.form_loading = payload;
    },
    setFormError: (state, { payload }: PayloadAction<FormError | null>) => {
      if (!payload) {
        state.form_error = "";
      } else if (typeof payload === "string") {
        state.form_error = { title: payload };
      } else {
        state.form_error = payload;
      }

      state.form_loading = false;
    },
    resetTxFormState: (state) => {
      state.form_error = initialState.form_error;
      state.form_loading = initialState.form_loading;
      state.stage = initialState.stage;
    },

    setStage: (state, { payload }: PayloadAction<Stage>) => {
      state.stage = payload;
    },
  },
});

export default slice.reducer;
export const { setStage, setFormError, setFormLoading, resetTxFormState } =
  slice.actions;
