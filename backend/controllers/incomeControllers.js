const IncomeSchema = require("../models/incomeModel");

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = new IncomeSchema({
    title,
    amount,
    category,
    description,
    date,
    user: req.user._id,
  });

  try {
    //validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await income.save();
    res.status(200).json({ success: true, message: "Income Added", income });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    if (!incomes || incomes.length === 0) {
      return res.status(404).json({ message: "No incomes found" });
    }
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.editIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const { id } = req.params;

  try {
    const income = await IncomeSchema.findById(id);
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    // Check if the user editing the income is the same as the one who created it
    if (income.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this income" });
    }

    // Update income details
    income.title = title || income.title;
    income.amount = amount || income.amount;
    income.category = category || income.category;
    income.description = description || income.description;
    income.date = date || income.date;

    await income.save();
    res.status(200).json({ success: true, message: "Income Updated", income });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await IncomeSchema.findById(id);
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }
    // Check if the user deleting the income is the same as the one who created it
    if (income.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this income" });
    }

    // Use findByIdAndDelete to remove the income
    await IncomeSchema.findByIdAndDelete(id); // Or income.deleteOne() if you prefer
    res.status(200).json({ success: true, message: "Income Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
