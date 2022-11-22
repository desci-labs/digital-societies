import { configureStore, Store } from "@reduxjs/toolkit";
import reducer, {
  addDelegate,
  removeDelegate,
  setIsLoading,
  setOrg,
  setOrgs,
} from "./reducer";
import { FactoryState, Org } from "./types";
import mockOrgs from "test/data/orgs.json";

const initialState: FactoryState = { data: [], isLoading: true };

describe("Admin reducer", () => {
  let store: Store<FactoryState>;
  const initialOrgs = mockOrgs.slice(1) as Org[];
  const delegates = [
    "0x114EA4c82a0B5d54Ce5697272a2De2e4a14D654C",
    "0xa408bacA39E3B6504FDd599e22F9c4E6dbE0e27E",
    "0x25534A5a53b6C363a9187af33421fe939664F5c7",
  ];

  beforeEach(() => {
    store = configureStore({ reducer: reducer });
    store.dispatch(setOrgs(initialOrgs));
  });

  describe("setOrgs", () => {
    it("adds orgs to state", () => {
      expect(store.getState()).toEqual({ ...initialState, data: initialOrgs });
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
      const org = mockOrgs[0] as Org;
      store.dispatch(setOrg(org));
      const state = store.getState();
      const added = state.data.find((r) => r.address === org.address);
      expect(added).toEqual(org);
    });
  });

  describe("addDelegate", () => {
    it("Adds new delegate", () => {
      const org = mockOrgs[1];
      store.dispatch(addDelegate({ org: org.address, delegate: delegates[0] }));
      const state = store.getState();
      const added = state.data.find((val) => val.address === org.address);
      expect(added?.delegates).toEqual(org.delegates.concat(delegates[0]));
    });
  });

  describe("removeDelegate", () => {
    it("Undo addDelegate action", () => {
      const org = mockOrgs[1];
      store.dispatch(
        removeDelegate({ org: org.address, delegate: org.delegates[0] })
      );
      let state = store.getState();
      state = store.getState();
      const added = state.data.find((val) => val.address === org.address);
      expect(added?.delegates).toEqual(org.delegates.slice(1));
    });
  });
});
