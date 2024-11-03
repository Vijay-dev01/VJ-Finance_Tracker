import { createSlice } from "@reduxjs/toolkit";

const incomeSlice = createSlice({
  name: "Income",
  initialState: {
    loading: false,
    incomes: [],
    incomeSummary: [],
    isIncomeCreated: false,
    isIncomeUpdated: false,
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
    updateIncomeRequest(state) {
      return { ...state, loading: true };
    },
    updateIncomeSuccess(state, action) {
      return {
        ...state,
        loading: false,
        incomes: state.incomes.map((income) =>
          income._id === action.payload._id ? action.payload : income
        ),
        isIncomeUpdated: true,
      };
    },
    updateIncomeFail(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
    clearIncomeUpdated(state) {
      return { ...state, isIncomeUpdated: false };
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
    incomesSummaryRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    incomesSummarySuccess(state, action) {
      console.log("API response data:", action.payload); 
      return {
        ...state,
        loading: false,
        incomeSummary: action.payload,
      };
    },
    incomesSummaryFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
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
  updateIncomeRequest,
  updateIncomeSuccess,
  updateIncomeFail,
  deleteIncomeRequest,
  deleteIncomeSuccess,
  deleteIncomeFail,
  incomesSummaryRequest,
  incomesSummarySuccess,
  incomesSummaryFail,
  clearIncomeCreated,
  clearIncomeUpdated,
  clearIncomeDelete,
} = actions;

export default reducer;
