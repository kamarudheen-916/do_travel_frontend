import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../reducers/reducesrs";


export type RootState = ReturnType<typeof rootReducer>;


const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
