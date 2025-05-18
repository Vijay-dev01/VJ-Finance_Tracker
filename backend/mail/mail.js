const puppeteer = require('puppeteer');
const handlebars = require('handlebars');
const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const path = require('path');
const IncomeSchema = require("../models/incomeModel");
const ExpenseSchema = require("../models/expenseModel");

handlebars.registerHelper('includes', function(str, search) {
  if (!str || typeof str !== 'string') return false;
  return str.includes(search);
});

handlebars.registerHelper('replace', function(str, search, replace) {
  if (!str || typeof str !== 'string') return '';
  return str.replace(search, replace);
});

handlebars.registerHelper('formatDate', function() {
  return new Date().toLocaleDateString();
});

async function generateFinancialSummary(userId) {
  try {
    if (!userId) throw new Error('User ID is required');

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

    if (!Array.isArray(incomeSummary) || !Array.isArray(expenseSummary)) {
      throw new Error('Invalid data format from database');
    }

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
      (incomeTotals["Stocks"] || 0) +
      (incomeTotals["SIP"] || 0) +
      (incomeTotals["Gold_etf"] || 0) +
      (incomeTotals["Sheetu"] || 0) +
      (incomeTotals["Bussiness"] || 0) -
      (expenseTotals["Stocks"] || 0) -
      (expenseTotals["SIP"] || 0) -
      (expenseTotals["Gold_etf"] || 0) -
      (expenseTotals["Sheetu"] || 0) -
      (expenseTotals["Bussiness"] || 0);

    const totalExpenses =
      (expenseTotals["General"] || 0) +
      (expenseTotals["Food"] || 0) +
      (expenseTotals["Fuel"] || 0) +
      (expenseTotals["Grocery"] || 0) +
      (expenseTotals["Shopping"] || 0) +
      (expenseTotals["Travel"] || 0) +
      (expenseTotals["Fun"] || 0) +
      (expenseTotals["UnKnown_Expenses"] || 0) +
      (expenseTotals["Stocks"] || 0) +
      (expenseTotals["SIP"] || 0) +
      (expenseTotals["Gold_etf"] || 0) +
      (expenseTotals["Sheetu"] || 0) +
      (expenseTotals["Bussiness"] || 0) +
    (expenseTotals["Health_Care"] || 0);

    const totalInvestment =
      (incomeTotals["Stocks"] || 0) +
      (incomeTotals["SIP"] || 0) +
      (incomeTotals["Sheetu"] || 0) +
      (incomeTotals["Gold_etf"] || 0) -
      (expenseTotals["Stocks"] || 0) -
      (expenseTotals["SIP"] || 0) -
      (expenseTotals["Gold_etf"] || 0) -
      (expenseTotals["Sheetu"] || 0);

    const totalBusinessSavings = (incomeTotals["Bussiness"] || 0) - (expenseTotals["Bussiness"] || 0);

    const balance =
      (incomeTotals["Salary"] || 0) +
      (incomeTotals["Balance"] || 0) +
      (incomeTotals["Freelance"] || 0) -
      totalExpenses -
      totalInvestment -
      totalBusinessSavings;

    const recordSetData = [
      {
        recordSet: incomeSummary.map((item, index) => ({
          sl_no: index + 1,
          stationNumbers: item._id || 'Uncategorized',
          buyType: 'Income',
          amps: {
            low: item.totalAmount || 0,
            avg: item.totalAmount || 0
          }
        }))
      },
      {
        recordSet: expenseSummary.map((item, index) => ({
          sl_no: index + 1,
          stationNumbers: item._id || 'Uncategorized',
          buyType: 'Expense',
          amps: {
            low: item.totalAmount || 0,
            avg: item.totalAmount || 0
          }
        }))
      }
    ];

    return {
      incomeTotals,
      expenseTotals,
      totalSavings,
      totalExpenses,
      totalInvestment,
      totalBusinessSavings,
      balance,
      recordSetData
    };
  } catch (error) {
    console.error('Error in generateFinancialSummary:', error);
    throw error;
  }
}


async function createPDFReport(summaryData) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    const templatePath = path.join(__dirname, 'templates', 'report.hbs');
    const template = await fs.readFile(templatePath, 'utf8');
    
    if (!template) {
      throw new Error('Template file not found');
    }

    const compiledTemplate = handlebars.compile(template);
    // Pass the complete summary data to the template
    const html = compiledTemplate({
      recordSetData: summaryData.recordSetData,
      totalSavings: summaryData.totalSavings.toFixed(2),
      totalExpenses: summaryData.totalExpenses.toFixed(2),
      totalInvestment: summaryData.totalInvestment.toFixed(2),
      totalBusinessSavings: summaryData.totalBusinessSavings.toFixed(2),
      balance: summaryData.balance.toFixed(2)
    });
    
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    const pdf = await page.pdf({
      format: 'A3',
      margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' },
      printBackground: true
    });
    
    return pdf;
  } catch (error) {
    console.error('Error in createPDFReport:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close().catch(console.error);
    }
  }
}

exports.sendReportByEmail = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!req.body?.email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const summary = await generateFinancialSummary(req.user._id);

    // Validate `summary` structure
    if (!summary || !summary.recordSetData || !Array.isArray(summary.recordSetData)) {
      throw new Error('Invalid summary data');
    }

    // Pass `recordSetData` to `createPDFReport`
    const pdfData = await createPDFReport(summary);

    if (!pdfData) {
      throw new Error('PDF generation failed');
    }

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
    console.error('Error in sendReportByEmail:', error);
    res.status(500).json({ 
      message: "Server Error", 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
