import { configureStore, Store } from "@reduxjs/toolkit";
import reducer, { setFormError, setFormLoading, setStage } from "./reducer";
import { State, Step, SubmitStage } from "./types";

const initialState: State = {
  form_error: "",
  form_loading: false,
  stage: { step: Step.form },
};
describe("Transaction reducer", () => {
  let store: Store<State>;

  beforeEach(() => {
    store = configureStore({ reducer: reducer });
  });

  describe("Valid initial state", () => {
    it("has a valid initial state", () => {
      expect(store.getState()).toEqual(initialState);
    });
  });

  describe("setFormLoading", () => {
    it("Updates Loading state", () => {
      store.dispatch(setFormLoading(true));
      const state = store.getState();
      expect(state.form_loading).toEqual(true);
    });
  });

  describe("setFormError", () => {
    it("sets error state", () => {
      store.dispatch(setFormError("Transaction error"));
      const state = store.getState();
      expect(state.form_error).toEqual({ title: "Transaction error" });
    });
  });

  describe("setStage", () => {
    it("sets transaction stage", () => {
      const submitStage: SubmitStage = {
        step: Step.submit,
        message: "uploading metadata",
      };
      store.dispatch(setStage(submitStage));
      const state = store.getState();
      expect(state.stage).toEqual(submitStage);
    });
  });
});
