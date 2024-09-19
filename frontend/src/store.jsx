import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import authReducer from "./slices/AuthSlice";
import userReducer from "./slices/UserSlice";

const reducer = combineReducers({
  authState: authReducer,
  userState: userReducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
