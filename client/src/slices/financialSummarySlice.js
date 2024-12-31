import { createSlice } from "@reduxjs/toolkit";

const financialSummarySlice = createSlice({
  name: "financialSummary",
  initialState: {
    loading: false,
    summaryData: [],
  },
  reducers: {
    fetchFinancialSummaryRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    fetchFinancialSummarySuccess(state, action) {
      return {
        ...state,
        loading: false,
        summaryData: action.payload,
      };
    },
    fetchFinancialSummaryFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    updateBalanceRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    updateBalanceSuccess(state, action) {
      return {
        ...state,
        loading: false,
        if (summaryData) {
          summaryData = {
            ...state.summaryData,
            balance: action.payload.amount,
          };
        }
      };
    },
    updateBalanceFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

const { actions, reducer } = financialSummarySlice;

export const {
  fetchFinancialSummaryRequest,
  fetchFinancialSummarySuccess,
  fetchFinancialSummaryFail,
  updateBalanceRequest,
  updateBalanceSuccess,
  updateBalanceFail,
} = actions;

export default reducer;
