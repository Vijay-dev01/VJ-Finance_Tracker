const {
  addExpense,
  getExpense,
  deleteExpense,
} = require("../controllers/expenseControllers");
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/incomeControllers");
const { isAuthenticatedUser } = require("../middleware/authenticate");

const router = require("express").Router();

router
  .post("/add-income", isAuthenticatedUser, addIncome)
  .get("/get-incomes", isAuthenticatedUser, getIncomes)
  .delete("/delete-income/:id", isAuthenticatedUser, deleteIncome)
  .post("/add-expense", isAuthenticatedUser, addExpense)
  .get("/get-expenses", isAuthenticatedUser, getExpense)
  .delete("/delete-expense/:id", isAuthenticatedUser, deleteExpense);

module.exports = router;
