const ExpenseSchema = require("../models/expenseModel");

exports.addExpense = async (req, res) => {
  let { title, amount, category, description, date } = req.body;

  if (!date) {
    date = new Date();
  }
  if (!category) {
    category = "General";
  }
  const expense = new ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
    user: req.user._id,
  });

  try {
    // Validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount == "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }

    await expense.save();
    res.status(200).json({ success: true, message: "Expense Added", expense });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    // Add a check here to ensure expenses are not empty
    if (!expenses || expenses.length === 0) {
      return res.status(404).json({ message: "No expenses found" });
    }

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.editExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const { id } = req.params;

  try {
    const expense = await ExpenseSchema.findById(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Check if the user editing the expense is the same as the one who created it
    if (expense.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this expense" });
    }

    // Update expense details
    expense.title = title || expense.title;
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.description = description || expense.description;
    expense.date = date || expense.date;

    await expense.save();
    res
      .status(200)
      .json({ success: true, message: "Expense Updated", expense });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await ExpenseSchema.findById(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Check if the user deleting the income is the same as the one who created it
    if (expense.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this expense" });
    }

    await ExpenseSchema.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Expense Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getExpenseSummary = async (req, res) => {
  try {
    const summary = await ExpenseSchema.aggregate([
      {
        $match: { user: req.user._id }, // Match the expenses for the authenticated user
      },
      {
        $group: {
          _id: "$category", // Group by category
          totalAmount: { $sum: "$amount" }, // Sum the amounts
        },
      },
      {
        $group: {
          _id: null, // Group all categories together
          categories: {
            $push: { category: "$_id", totalAmount: "$totalAmount" },
          }, // Push each category and its total amount
          overallTotal: { $sum: "$totalAmount" }, // Sum total amounts for all categories
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id
          categories: 1, // Include the categories
          overallTotal: 1, // Include the overall total
        },
      },
    ]);

    // If there are no expenses, return a message
    if (!summary || summary.length === 0) {
      return res.status(404).json({ message: "No expenses found" });
    }

    res.status(200).json({
      categories: summary[0].categories, // Categories with their total amounts
      overallTotal: summary[0].overallTotal, // Overall total of expenses
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
