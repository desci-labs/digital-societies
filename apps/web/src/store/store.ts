import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
  },
  middleware: (_getDefaultMiddleware) => [],
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
