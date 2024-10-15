const ExpenseSchema = require("../models/expenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const expense = new ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    // Validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || typeof amount !== "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }

    await expense.save();
    res.status(200).json({ success: true, message: "Expense Added" ,expense});
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

  console.log(expense);
};

exports.getExpense = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
    if (!expenses.length) {
        return res.status(404).json({ message: "No expenses found" });
      }
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await ExpenseSchema.findByIdAndDelete(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({success: true, message: "Expense Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
