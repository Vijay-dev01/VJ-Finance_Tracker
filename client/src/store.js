import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import authReducer from "./slices/AuthSlice";
import userReducer from "./slices/UserSlice";
import incomeReducer from "./slices/IncomeSlice";
import expenseReducer from "./slices/ExpenseSlice";
import financialSummaryReducer from "./slices/financialSummarySlice";
import reportReducer from "./slices/reportSlice";

const reducer = combineReducers({
  authState: authReducer,
  userState: userReducer,
  incomeState: incomeReducer,
  expenseState: expenseReducer,
  financialSummaryState: financialSummaryReducer,
  report: reportReducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
