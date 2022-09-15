import { configureStore } from "@reduxjs/toolkit";
import orgSlice from "services/orgs/orgSlice";

const store = configureStore({
  reducer: {
    org: orgSlice
  },
  middleware: (_getDefaultMiddleware) => [],
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
