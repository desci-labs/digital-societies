import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, createMigrate, PersistedState } from "redux-persist";
import storage from "redux-persist/lib/storage";
import attestationSlice from "services/attestations/attestationSlice";
import orgSlice from "services/orgs/orgSlice";
import thunk from 'redux-thunk';
import transactionSlice from "services/transaction/transactionSlice";
import { adminReducers } from "services/admin/root";
import { api } from "services/api";

const rootReducer = combineReducers({
  admin: adminReducers,
  org: orgSlice,
  attestations: attestationSlice,
  transaction: transactionSlice,
  [api.reducerPath]: api.reducer,
});

const migrations = {
  1: (state: PersistedState) => {
    console.log('migrate, ', state);
    return {} as PersistedState; // reset all state, except version
  },
}

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  migrate: createMigrate(migrations),
  blacklist: ['transaction', 'admin', api.reducerPath],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (_getDefaultMiddleware) => [thunk],
});

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
