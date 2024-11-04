const ExpenseSchema = require("../models/expenseModel");
const IncomeSchema = require("../models/incomeModel");

exports.getFinancialSummary = async (req, res) => {
  try {
    const incomeSummary = await IncomeSchema.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const expenseSummary = await ExpenseSchema.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const incomeTotals = incomeSummary.reduce((acc, item) => {
      acc[item._id] = item.totalAmount;
      return acc;
    }, {});

    const expenseTotals = expenseSummary.reduce((acc, item) => {
      acc[item._id] = item.totalAmount;
      return acc;
    }, {});

    const totalSavings =
      (incomeTotals["General"] || 0) +
      (incomeTotals["Investment"] || 0) +
      (incomeTotals["SIP"] || 0) +
      (incomeTotals["Gold"] || 0) +
      (incomeTotals["Bussiness"] || 0);

    const totalExpenses =
      (expenseTotals["General"] || 0) +
      (expenseTotals["Food"] || 0) +
      (expenseTotals["Fuel"] || 0) +
      (expenseTotals["Grocery"] || 0) +
      (expenseTotals["Shopping"] || 0) +
      (expenseTotals["Travel"] || 0) +
      (expenseTotals["Fun"] || 0) +
      (expenseTotals["UnKnown_Expenses"] || 0) +
      (expenseTotals["Health_Care"] || 0);

    const totalInvestment =
      (incomeTotals["Investment"] || 0) +
      (incomeTotals["SIP"] || 0) +
      (incomeTotals["Sheet"] || 0) +
      (incomeTotals["Gold"] || 0);

    const totalBusinessSavings = incomeTotals["Bussiness"] || 0;

    const balance =
      (incomeTotals["Salary"] || 0) +
      (incomeTotals["Freelance"] || 0) -
      totalExpenses;

    res.status(200).json({
      totalSavings,
      totalExpenses,
      totalInvestment,
      totalBusinessSavings,
      balance,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
