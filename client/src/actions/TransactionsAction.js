import axios from "axios";
import {
  incomesFail,
  incomesRequest,
  incomesSuccess,
  newIncomeFail,
  newIncomeRequest,
  newIncomeSuccess,
  deleteIncomeFail,
  deleteIncomeRequest,
  deleteIncomeSuccess,
  clearIncomeCreated,
  clearIncomeDelete,
  updateIncomeRequest,
  updateIncomeSuccess,
  updateIncomeFail,
  clearIncomeUpdated,
  incomesSummaryRequest,
  incomesSummarySuccess,
  incomesSummaryFail,
} from "../slices/IncomeSlice";
import {
  expensesFail,
  expensesRequest,
  expensesSuccess,
  newExpenseFail,
  newExpenseRequest,
  newExpenseSuccess,
  deleteExpenseFail,
  deleteExpenseRequest,
  deleteExpenseSuccess,
  clearExpenseCreated,
  clearExpenseDelete,
  updateExpenseRequest,
  updateExpenseSuccess,
  updateExpenseFail,
  clearExpenseUpdated,
  expensesSummaryRequest,
  expensesSummarySuccess,
  expensesSummaryFail,
} from "../slices/ExpenseSlice";
import {
  fetchFinancialSummaryFail,
  fetchFinancialSummaryRequest,
  fetchFinancialSummarySuccess,
  updateBalanceFail,
  updateBalanceRequest,
  updateBalanceSuccess,
} from "../slices/financialSummarySlice";
import { sendReportFail, sendReportRequest, sendReportSuccess } from "../slices/reportSlice";

export const getIncomes = () => async (dispatch) => {
  try {
    dispatch(incomesRequest());
    const { data } = await axios.get(`/api/v1/get-incomes`);
    dispatch(incomesSuccess(data));
  } catch (error) {
    dispatch(incomesFail(error.response.data.message));
  }
};
export const getExpense = () => async (dispatch) => {
  try {
    dispatch(expensesRequest());
    const { data } = await axios.get(`/api/v1/get-expenses`);
    dispatch(expensesSuccess(data));
  } catch (error) {
    dispatch(expensesFail(error.response.data.message));
  }
};
export const createNewIncome = (incomeData) => async (dispatch) => {
  try {
    dispatch(newIncomeRequest());
    const { data } = await axios.post(`/api/v1/add-income`, incomeData);
    dispatch(newIncomeSuccess(data));
  } catch (error) {
    dispatch(newIncomeFail(error.response.data.message));
  }
};
export const createNewExpense = (expenseData) => async (dispatch) => {
  try {
    dispatch(newExpenseRequest());
    const { data } = await axios.post(`/api/v1/add-expense`, expenseData);
    dispatch(newExpenseSuccess(data));
  } catch (error) {
    dispatch(newExpenseFail(error.response.data.message));
  }
};
export const updateIncome = (id, incomeData) => async (dispatch) => {
  try {
    dispatch(updateIncomeRequest());
    const { data } = await axios.put(`/api/v1/edit-income/${id}`, incomeData);
    dispatch(updateIncomeSuccess(data));
  } catch (error) {
    dispatch(updateIncomeFail(error.response.data.message));
  }
};
export const updateExpense = (id, expenseData) => async (dispatch) => {
  try {
    dispatch(updateExpenseRequest());
    const { data } = await axios.put(`/api/v1/edit-expense/${id}`, expenseData);
    dispatch(updateExpenseSuccess(data));
  } catch (error) {
    dispatch(updateExpenseFail(error.response.data.message));
  }
};
export const deleteIncome = (id) => async (dispatch) => {
  try {
    dispatch(deleteIncomeRequest());
    await axios.delete(`/api/v1/delete-income/${id}`);
    dispatch(deleteIncomeSuccess());
    dispatch(getIncomes());
  } catch (error) {
    dispatch(deleteIncomeFail(error.response.data.message));
  }
};
export const deleteExpense = (id) => async (dispatch) => {
  try {
    dispatch(deleteExpenseRequest());
    await axios.delete(`/api/v1/delete-expense/${id}`);
    dispatch(deleteExpenseSuccess());
    dispatch(getExpense());
  } catch (error) {
    dispatch(deleteExpenseFail(error.response.data.message));
  }
};

export const getIncomeSummary = () => async (dispatch) => {
  try {
    dispatch(incomesSummaryRequest());
    const { data } = await axios.get(`/api/v1/get-income-summary`);
    dispatch(incomesSummarySuccess(data));
  } catch (error) {
    dispatch(incomesSummaryFail(error.response.data.message));
  }
};
export const getExpenseSummary = () => async (dispatch) => {
  try {
    dispatch(expensesSummaryRequest());
    const { data } = await axios.get(`/api/v1/get-expense-summary`);
    dispatch(expensesSummarySuccess(data));
  } catch (error) {
    dispatch(expensesSummaryFail(error.response.data.message));
  }
};

export const fetchFinancialSummary = () => async (dispatch) => {
  dispatch(fetchFinancialSummaryRequest());
  try {
    const { data } = await axios.get("/api/v1/get-financial-summary");
    dispatch(fetchFinancialSummarySuccess(data));
  } catch (error) {
    dispatch(fetchFinancialSummaryFail(error.response.data.message));
  }
};

export const updateBalanceAmount = (amount) => async (dispatch) => {
  try {
    dispatch(updateBalanceRequest());

    const { data } = await axios.post("/api/v1/update-balance", { amount });

    dispatch(updateBalanceSuccess(data.balance));
    // Fetch updated financial summary
    dispatch(fetchFinancialSummary());
  } catch (error) {
    dispatch(updateBalanceFail(error.response.data.message));
  }
};

export const sendReport = (email) => async (dispatch) => {
  try {
    dispatch(sendReportRequest());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.post(
      '/api/v1/send-report',
      { email },
      config
    );

    dispatch(sendReportSuccess());
  } catch (error) {
    dispatch(
      sendReportFail(
        error.response?.data?.message || 'Failed to send report'
      )
    );
  }
};

export const clearIncomeCreatedData = () => (dispatch) => {
  dispatch(clearIncomeCreated());
};
export const clearIncomeUpdatedData = () => (dispatch) => {
  dispatch(clearIncomeUpdated());
};
export const clearExpenseUpdatedData = () => (dispatch) => {
  dispatch(clearExpenseUpdated());
};
export const clearIncomeDeleteData = () => (dispatch) => {
  dispatch(clearIncomeDelete());
};
export const clearExpenseCreatedData = () => (dispatch) => {
  dispatch(clearExpenseCreated());
};
export const clearExpenseDeleteData = () => (dispatch) => {
  dispatch(clearExpenseDelete());
};
