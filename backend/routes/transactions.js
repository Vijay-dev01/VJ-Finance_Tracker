const {
  addExpense,
  getExpense,
  deleteExpense,
  editExpense,
  getExpenseSummary,
} = require("../controllers/expenseControllers");
const { getFinancialSummary } = require("../controllers/getFinanceSummaryController");
const {
  addIncome,
  getIncomes,
  deleteIncome,
  editIncome,
  getIncomeSummary,
} = require("../controllers/incomeControllers");
const { isAuthenticatedUser } = require("../middleware/authenticate");

const router = require("express").Router();

router
  .post("/add-income", isAuthenticatedUser, addIncome)
  .get("/get-incomes", isAuthenticatedUser, getIncomes)
  .put("/edit-income/:id", isAuthenticatedUser, editIncome)
  .delete("/delete-income/:id", isAuthenticatedUser, deleteIncome)
  .post("/add-expense", isAuthenticatedUser, addExpense)
  .get("/get-expenses", isAuthenticatedUser, getExpense)
  .put("/edit-expense/:id", isAuthenticatedUser, editExpense)
  .delete("/delete-expense/:id", isAuthenticatedUser, deleteExpense)
  .get("/get-expense-summary", isAuthenticatedUser, getExpenseSummary)
  .get("/get-income-summary", isAuthenticatedUser, getIncomeSummary)
  .get("/get-financial-summary", isAuthenticatedUser, getFinancialSummary);


module.exports = router;
