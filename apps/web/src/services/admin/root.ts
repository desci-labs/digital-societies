import { combineReducers } from "@reduxjs/toolkit";
import tokenUpdatorReducer from "./reducer";

export const adminReducers = combineReducers({
  tokenRecipients: tokenUpdatorReducer,
});
