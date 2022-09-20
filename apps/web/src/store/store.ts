import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import credentialSlice from "services/credentials/credentialSlice";
import orgSlice from "services/orgs/orgSlice";
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  org: orgSlice,
  credential: credentialSlice
});

const persistConfig = {
  key: 'root0',
  version: 0,
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (_getDefaultMiddleware) => [thunk],
});

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
