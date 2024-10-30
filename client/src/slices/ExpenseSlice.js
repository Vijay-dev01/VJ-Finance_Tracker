import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "Expense",
  initialState: {
    loading: false,
    expenses: [],
    isExpenseCreated: false,
    isExpenseUpdated: false,
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
    updateExpenseRequest(state) {
      return { ...state, loading: true };
    },
    updateExpenseSuccess(state, action) {
      return {
        ...state,
        loading: false,
        expenses: state.expenses.map((expense) =>
          expense._id === action.payload._id ? action.payload : expense
        ),
        isExpenseUpdated: true,
      };
    },
    updateExpenseFail(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
    clearExpenseUpdated(state) {
      return { ...state, isExpenseUpdated: false };
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
  updateExpenseRequest,
  updateExpenseSuccess,
  updateExpenseFail,
  deleteExpenseRequest,
  deleteExpenseSuccess,
  deleteExpenseFail,
  clearExpenseCreated,
  clearExpenseUpdated,
  clearExpenseDelete,
} = actions;

export default reducer;
