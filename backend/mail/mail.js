const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const IncomeSchema = require("../models/incomeModel");
const ExpenseSchema = require("../models/expenseModel");

// Constants for styling
const STYLES = {
  colors: {
    primary: '#4A90E2',
    white: '#FFFFFF',
    black: '#000000',
    background: '#F5F5F5',
    summaryBox: '#F8F9FA'
  },
  table: {
    cellPadding: 10,
    cellHeight: 30
  },
  fonts: {
    header: 24,
    subheader: 16,
    body: 12
  },
  spacing: {
    margin: 50
  }
};

function createTable(doc, headers, rows, startX, startY, options = {}) {
  const { cellPadding, cellHeight } = STYLES.table;
  const columnWidth = (doc.page.width - startX * 2) / headers.length;
  let currentY = startY;

  // Header row
  doc.fillColor(STYLES.colors.primary)
     .rect(startX, currentY, doc.page.width - startX * 2, cellHeight)
     .fill();

  // Header text
  doc.fillColor(STYLES.colors.white);
  headers.forEach((header, i) => {
    doc.text(
      header,
      startX + i * columnWidth + cellPadding,
      currentY + cellPadding,
      { width: columnWidth - cellPadding * 2 }
    );
  });

  // Data rows
  currentY += cellHeight;
  doc.fillColor(STYLES.colors.black);

  rows.forEach((row, rowIndex) => {
    // Zebra striping
    if (rowIndex % 2 === 0) {
      doc.fillColor(STYLES.colors.background)
         .rect(startX, currentY, doc.page.width - startX * 2, cellHeight)
         .fill();
    }

    doc.fillColor(STYLES.colors.black);
    row.forEach((cell, i) => {
      doc.text(
        String(cell),
        startX + i * columnWidth + cellPadding,
        currentY + cellPadding,
        { width: columnWidth - cellPadding * 2 }
      );
    });
    currentY += cellHeight;
  });

  return currentY;
}

async function generateFinancialSummary(userId) {
  const [incomeSummary, expenseSummary] = await Promise.all([
    IncomeSchema.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } }
    ]),
    ExpenseSchema.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } }
    ])
  ]);

  const incomeTotals = incomeSummary.reduce((acc, { _id, totalAmount }) => {
    acc[_id] = totalAmount;
    return acc;
  }, {});

  const expenseTotals = expenseSummary.reduce((acc, { _id, totalAmount }) => {
    acc[_id] = totalAmount;
    return acc;
  }, {});

  const totalIncome = Object.values(incomeTotals).reduce((a, b) => a + b, 0);
  const totalExpenses = Object.values(expenseTotals).reduce((a, b) => a + b, 0);
  const totalInvestment = ['Investment', 'SIP', 'Gold']
    .reduce((sum, category) => sum + (incomeTotals[category] || 0), 0);

  return {
    incomeTotals,
    expenseTotals,
    totalIncome,
    totalExpenses,
    totalInvestment,
    totalSavings: totalIncome - totalExpenses - totalInvestment,
    businessSavings: incomeTotals["Business"] || 0
  };
}

async function createPDFReport(summary) {
  const doc = new PDFDocument({ margin: STYLES.spacing.margin, size: 'A4' });
  const buffers = [];

  doc.on("data", chunk => buffers.push(chunk));

  // Header
  doc.fontSize(STYLES.fonts.header)
     .text('Financial Report', { align: 'center' })
     .moveDown(2);

  // Income Summary
  doc.fontSize(STYLES.fonts.subheader)
     .text('Income Summary')
     .moveDown();

  createTable(
    doc,
    ['Category', 'Total Amount'],
    Object.entries(summary.incomeTotals).map(([category, amount]) => [
      category,
      `$${amount.toFixed(2)}`
    ]),
    STYLES.spacing.margin,
    doc.y
  );
  doc.moveDown(2);

  // Expense Summary
  doc.fontSize(STYLES.fonts.subheader)
     .text('Expense Summary')
     .moveDown();

  createTable(
    doc,
    ['Category', 'Total Amount'],
    Object.entries(summary.expenseTotals).map(([category, amount]) => [
      category,
      `$${amount.toFixed(2)}`
    ]),
    STYLES.spacing.margin,
    doc.y
  );
  doc.moveDown(2);

  // Financial Summary Box
  const summaryItems = [
    ['Total Income:', summary.totalIncome],
    ['Total Expenses:', summary.totalExpenses],
    ['Total Investment:', summary.totalInvestment],
    ['Total Savings:', summary.totalSavings],
    ['Business Savings:', summary.businessSavings],
    ['Net Balance:', summary.totalIncome - summary.totalExpenses]
  ];

  doc.fontSize(STYLES.fonts.subheader)
     .text('Financial Summary')
     .moveDown();

  const summaryStartY = doc.y;
  doc.fillColor(STYLES.colors.summaryBox)
     .rect(STYLES.spacing.margin, summaryStartY, doc.page.width - 100, 160)
     .fill();

  let summaryY = summaryStartY + 20;
  doc.fillColor(STYLES.colors.black);
  summaryItems.forEach(([label, value]) => {
    doc.text(label, 70, summaryY);
    doc.text(`$${value.toFixed(2)}`, 250, summaryY);
    summaryY += 25;
  });

  doc.end();
  return new Promise(resolve => doc.on("end", () => resolve(Buffer.concat(buffers))));
}

exports.sendReportByEmail = async (req, res) => {
  try {
    const summary = await generateFinancialSummary(req.user._id);
    const pdfData = await createPDFReport(summary);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: "Financial Report",
      text: "Please find attached your financial report.",
      attachments: [{
        filename: "Financial_Report.pdf",
        content: pdfData
      }]
    });

    res.status(200).json({ success: true, message: "Report sent via email" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};