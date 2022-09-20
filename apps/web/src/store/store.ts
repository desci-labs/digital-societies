import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, createMigrate, PersistedState, PersistState } from "redux-persist";
import storage from "redux-persist/lib/storage";
import credentialSlice from "services/credentials/credentialSlice";
import orgSlice from "services/orgs/orgSlice";
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  org: orgSlice,
  credential: credentialSlice
});

const migrations = {
  1: (state: PersistedState) => {
    console.log('migrate, ', state);
    return {} as PersistedState; // reset all state, except version
  },
  3: (state: PersistedState) => {
    console.log('migrate, ', state);
    return {} as PersistedState; // reset all state, except version
  }
}

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  migrate: createMigrate(migrations)
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (_getDefaultMiddleware) => [thunk],
});

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
