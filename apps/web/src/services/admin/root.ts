import { combineReducers } from "@reduxjs/toolkit";
import tokenUpdatorReducer from "./tokenUpdator";

export const adminReducers = combineReducers({
  tokenRecipients: tokenUpdatorReducer,
});
