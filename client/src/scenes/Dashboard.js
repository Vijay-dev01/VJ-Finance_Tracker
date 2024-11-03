import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,  // Import PointElement
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { fetchFinancialSummary } from "../actions/TransactionsAction";

// Register all necessary elements for both Line and Bar charts
Chart.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const dispatch = useDispatch();
  const [showBarGraph, setShowBarGraph] = useState(false);

  // Select financial summary data from the Redux store
  const { summaryData } = useSelector((state) => state.financialSummaryState);

  useEffect(() => {
    dispatch(fetchFinancialSummary());
  }, [dispatch]);

  // Fallback values if data is not yet loaded
  const totalSavings = summaryData?.totalSavings || 0;
  const totalExpenses = summaryData?.totalExpenses || 0;
  const totalInvestment = summaryData?.totalInvestment || 0;
  const totalBusinessSavings = summaryData?.totalBusinessSavings || 0;
  const balance = summaryData?.balance || 0;

  const chartData = {
    labels: ["Total Savings", "Total Expenses", "Investment", "Business Savings", "Balance"],
    datasets: [
      {
        label: "Financial Summary",
        data: [totalSavings, totalExpenses, totalInvestment, totalBusinessSavings, balance],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(153, 102, 255, 0.6)"
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: showBarGraph ? "Financial Summary - Bar Chart" : "Financial Summary - Line Chart",
      },
    },
  };

  const toggleGraphType = () => {
    setShowBarGraph((prev) => !prev);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item xs={2.4}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" align="center">Total Savings</Typography>
            <Typography variant="h4" align="center" sx={{ marginTop: 1 }}>{totalSavings}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={2.4}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" align="center">Total Expenses</Typography>
            <Typography variant="h4" align="center" sx={{ marginTop: 1 }}>{totalExpenses}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={2.4}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" align="center">Investment</Typography>
            <Typography variant="h4" align="center" sx={{ marginTop: 1 }}>{totalInvestment}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={2.4}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" align="center">Business Savings</Typography>
            <Typography variant="h4" align="center" sx={{ marginTop: 1 }}>{totalBusinessSavings}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={2.4}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" align="center">Balance</Typography>
            <Typography variant="h4" align="center" sx={{ marginTop: 1 }}>{balance}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Button to toggle between bar and line chart */}
      <Button variant="contained" onClick={toggleGraphType} sx={{ marginBottom: 3 }}>
        {showBarGraph ? "Show Line Graph" : "Show Bar Graph"}
      </Button>

      {/* Conditionally render either the Bar or Line chart based on state */}
      <Box sx={{ marginBottom: 3 }}>
        {showBarGraph ? (
          <Bar key="bar" data={chartData} options={chartOptions} />
        ) : (
          <Line key="line" data={chartData} options={chartOptions} />
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
