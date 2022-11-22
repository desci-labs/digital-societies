import { configureStore, Store } from "@reduxjs/toolkit";
import reducer, {
  addRecipient,
  setRecipients,
  toggleDeleteExistingRecipient,
  undoAddRecipient,
} from "./reducer";
import { AttestationTokenRecipient } from "./types";

const tokenRecipients: AttestationTokenRecipient[] = [
  { address: "0x1", is_added: false, is_deleted: false },
  { address: "0x2", tokenId: 1, is_added: false, is_deleted: false },
  { address: "0x3", is_added: false, is_deleted: false },
  { address: "0x4", is_added: false, is_deleted: false },
];

describe("Admin reducer", () => {
  let store: Store<AttestationTokenRecipient[]>;

  beforeEach(() => {
    store = configureStore({ reducer: reducer });
    store.dispatch(setRecipients(tokenRecipients));
  });

  describe("setRecipients", () => {
    it("adds recipient to state", () => {
      expect(store.getState()).toEqual(tokenRecipients);
    });
  });

  describe("toggleDeleteExistingRecipient", () => {
    it("deletes existing recipient", () => {
      store.dispatch(toggleDeleteExistingRecipient("0x2"));
      const state = store.getState();
      const deleted = state.find((r) => r.address === "0x2");
      expect(deleted?.is_deleted).toEqual(true);
    });
  });

  describe("addRecipient", () => {
    it("Adds new recipient", () => {
      store.dispatch(
        addRecipient({ address: "0x5", is_added: true, is_deleted: false })
      );
      const state = store.getState();
      const added = state.find((r) => r.address === "0x5");
      expect(added).toEqual({
        address: "0x5",
        is_added: true,
        is_deleted: false,
      });
    });
  });

  describe("undoAddRecipient", () => {
    it("Undo addRecipient action", () => {
      store.dispatch(
        addRecipient({ address: "0x5", is_added: true, is_deleted: false })
      );
      let state = store.getState();
      const added = state.find((r) => r.address === "0x5");
      expect(added).toEqual({
        address: "0x5",
        is_added: true,
        is_deleted: false,
      });
      store.dispatch(undoAddRecipient("0x5"));
      state = store.getState();
      const undo = state.find((r) => r.address === "0x5");
      expect(undo).toEqual(undefined);
    });
  });
});
