import { createSlice } from "@reduxjs/toolkit";

const incomeSlice = createSlice({
  name: "Income",
  initialState: {
    loading: false,
    incomes: [],
    isIncomeCreated: false,
    isIncomeDeleted: false,
  },
  reducers: {
    incomesRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    incomesSuccess(state, action) {
      return {
        ...state,
        loading: false,
        incomes: action.payload,
      };
    },
    incomesFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    newIncomeRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    newIncomeSuccess(state, action) {
      return {
        ...state,
        loading: false,
        incomes: action.payload,
        isIncomeCreated: true,
      };
    },
    newIncomeFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isIncomeCreated: false,
      };
    },
    clearIncomeCreated(state, action) {
      return {
        ...state,
        isIncomeCreated: false,
      };
    },
    deleteIncomeRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteIncomeSuccess(state, action) {
      return {
        ...state,
        loading: false,
        incomes: action.payload,
        isIncomeDeleted: true,
      };
    },
    deleteIncomeFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isIncomeDeleted: false,
      };
    },
    clearIncomeDelete(state, action) {
      return {
        ...state,
        isIncomeDeleted: false,
      };
    },
  },
});

const { actions, reducer } = incomeSlice;

export const {
    incomesRequest,
    incomesSuccess,
    incomesFail,
    newIncomeRequest,
    newIncomeSuccess,
    newIncomeFail,
    deleteIncomeRequest,
    deleteIncomeSuccess,
    deleteIncomeFail,
    clearIncomeCreated,
    clearIncomeDelete
} = actions;

export default reducer;
