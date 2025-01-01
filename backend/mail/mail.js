const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const IncomeSchema = require("../models/incomeModel");
const ExpenseSchema = require("../models/expenseModel");

exports.sendReportByEmail = async (req, res) => {
  try {
    // Fetch income and expense data
    const incomes = await IncomeSchema.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    const expenses = await ExpenseSchema.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    // Generate a PDF report
    const doc = new PDFDocument();
    let buffers = [];
    doc.on("data", (chunk) => buffers.push(chunk));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);

      // Email setup
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER, // Your email
          pass: process.env.EMAIL_PASS, // Your email password
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: req.body.email, // Email from request body
        subject: "Income and Expense Report",
        text: "Please find attached your income and expense report.",
        attachments: [
          {
            filename: "Income_Expense_Report.pdf",
            content: pdfData,
          },
        ],
      };

      // Send email
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return res.status(500).json({ message: "Email sending failed", err });
        }
        res.status(200).json({ success: true, message: "Report sent via email" });
      });
    });

    // Add content to PDF
    doc.fontSize(20).text("Income and Expense Report", { align: "center" });
    doc.moveDown();

    // Income Section
    doc.fontSize(16).text("Income Summary:");
    incomes.forEach((income) => {
      doc
        .fontSize(12)
        .text(
          `Title: ${income.title}, Amount: $${income.amount}, Category: ${income.category}, Date: ${income.date}`
        );
    });
    doc.moveDown();

    // Expense Section
    doc.fontSize(16).text("Expense Summary:");
    expenses.forEach((expense) => {
      doc
        .fontSize(12)
        .text(
          `Title: ${expense.title}, Amount: $${expense.amount}, Category: ${expense.category}, Date: ${expense.date}`
        );
    });

    // Finalize the PDF
    doc.end();
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
