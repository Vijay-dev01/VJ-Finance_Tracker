import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "Expense",
  initialState: {
    loading: false,
    expenses: [],
    isExpenseCreated: false,
    isExpenseDeleted: false,
  },
  reducers: {
    expensesRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    expensesSuccess(state, action) {
      return {
        ...state,
        loading: false,
        expenses: action.payload,
      };
    },
    expensesFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    newExpenseRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    newExpenseSuccess(state, action) {
      return {
        ...state,
        loading: false,
        expenses: action.payload,
        isExpenseCreated: true,
      };
    },
    newExpenseFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isExpenseCreated: false,
      };
    },
    clearExpenseCreated(state, action) {
      return {
        ...state,
        isExpenseCreated: false,
      };
    },
    deleteExpenseRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteExpenseSuccess(state, action) {
      return {
        ...state,
        loading: false,
        expenses: action.payload,
        isExpenseDeleted: true,
      };
    },
    deleteExpenseFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isExpenseDeleted: false,
      };
    },
    clearExpenseDelete(state, action) {
      return {
        ...state,
        isExpenseDeleted: false,
      };
    },
  },
});

const { actions, reducer } = expenseSlice;

export const {
    expensesRequest,
    expensesSuccess,
    expensesFail,
    newExpenseRequest,
    newExpenseSuccess,
    newExpenseFail,
    deleteExpenseRequest,
    deleteExpenseSuccess,
    deleteExpenseFail,
    clearExpenseCreated,
    clearExpenseDelete
} = actions;

export default reducer;
