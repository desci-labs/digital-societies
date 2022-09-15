import { configureStore } from "@reduxjs/toolkit";
import credentialSlice from "services/credentials/credentialSlice";
import orgSlice from "services/orgs/orgSlice";

const store = configureStore({
  reducer: {
    org: orgSlice,
    credential: credentialSlice
  },
  middleware: (_getDefaultMiddleware) => [],
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
