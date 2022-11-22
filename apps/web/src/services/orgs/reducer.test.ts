import { configureStore, Store } from "@reduxjs/toolkit";
import reducer, {
  addDelegate,
  removeDelegate,
  setIsLoading,
  setOrg,
  setOrgs,
} from "./reducer";
import { FactoryState, Org, PendingOrg } from "./types";

const orgs: Org[] = [];

const initialState: FactoryState = { data: [], isLoading: true };

describe("Admin reducer", () => {
  let store: Store<FactoryState>;

  beforeEach(() => {
    store = configureStore({ reducer: reducer });
    store.dispatch(setOrgs(orgs));
  });

  describe("setOrgs", () => {
    it("adds orgs to state", () => {
      expect(store.getState()).toEqual(initialState);
    });
  });

  describe("setIsLoading", () => {
    it("setLoading state", () => {
      store.dispatch(setIsLoading(false));
      const state = store.getState();
      expect(state.isLoading).toEqual(false);
    });
  });

  describe("setOrg", () => {
    it("Adds new recipient", () => {
      // store.dispatch(
      //   setOrg({})
      // );
      const state = store.getState();
      // const added = state.find((r) => r.address === "0x5");
      // expect(added).toEqual(undefined);
    });
  });

  describe("addDelegate", () => {
    it("Adds new delegate", () => {
      // store.dispatch(addDelegate());
      const state = store.getState();
      // const added = state.find((r) => r.address === "0x5");
      // expect(added).toEqual({
      //   address: "0x5",
      //   is_added: true,
      //   is_deleted: false,
      // });
    });
  });

  describe("removeDelegate", () => {
    beforeEach(() => {
      // store.dispatch(addDelegate())
    });

    it("Undo addDelegate action", () => {
      // store.dispatch(removeDelegate());
      let state = store.getState();
      state = store.getState();
      // const undo = state.find((r) => r.address === "0x5");
      // expect(undo).toEqual(undefined);
    });
  });
});
