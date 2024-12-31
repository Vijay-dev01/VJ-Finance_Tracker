const IncomeSchema = require("../models/incomeModel");

exports.updateBalance = async (req, res) => {
  try {
    const { amount } = req.body;
    
    // Validate amount
    if (!amount || amount < 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid amount",
      });
    }

    // Check if user exists in request
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User authentication failed",
      });
    }

    // Create a new income entry with all required fields
    const newBalance = await IncomeSchema.create({
      title: "Balance Update", // Add required title field
      amount: parseFloat(amount),
      category: "Balance",
      description: "Manual balance update",
      date: new Date(),
      user: req.user._id,
      type: "balance" // Add if your schema requires it
    });

    res.status(200).json({
      success: true,
      message: "Balance updated successfully",
      balance: newBalance,
    });
  } catch (error) {
    console.error("Balance update error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating balance",
      error: error.message
    });
  }
};