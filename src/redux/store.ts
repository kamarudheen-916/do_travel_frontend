import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../reducers/reducesrs";
import { reRender } from "../reducers/reducesrs";
import { darkTheme } from "../reducers/reducesrs";

import notification from '../reducers/reducer2'
import adminSlice from "../reducers/adminSlice";
import messageCountSlice from "../reducers/messageCountSlice";
export type RootState = ReturnType<typeof rootReducer>;


const rootReducer = combineReducers({
  auth: authReducer,
  reRender: reRender,
  darkTheme,
  notification,
  adminAuth:adminSlice,
  messageReducer:messageCountSlice
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
