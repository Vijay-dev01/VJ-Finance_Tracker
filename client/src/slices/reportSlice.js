import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
  name: "report",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    sendReportRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    sendReportSuccess(state, action) {
      return {
        ...state,
        loading: false,
        summaryData: action.payload,
      };
    },
    sendReportFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearReportStatus(state, action) {
      return {
        ...state,
        loading: false,
        error: null,
      };
    },
  },
});

const { actions, reducer } = reportSlice;

export const {
  sendReportRequest,
  sendReportSuccess,
  sendReportFail,
  clearReportStatus,
} = actions;

export default reducer;
