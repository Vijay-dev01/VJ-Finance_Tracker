import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpenseSummary } from "../../actions/TransactionsAction";
import { Typography, Card, CardContent, Box, Button, Dialog, DialogContent, AppBar, Toolbar, IconButton } from "@mui/material";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";
import CloseIcon from "@mui/icons-material/Close";

ChartJS.register(ArcElement, BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const ExpenseSummary = () => {
  const dispatch = useDispatch();
  const { expenseSummary, loading } = useSelector((state) => state.expenseState);
  const [chartType, setChartType] = useState("pie");
  const [openFullScreen, setOpenFullScreen] = useState(false);

  useEffect(() => {
    dispatch(getExpenseSummary());
  }, [dispatch]);

  const data = Array.isArray(expenseSummary.categories)
    ? expenseSummary.categories.map((expense) => ({
        name: expense.category,
        value: expense.totalAmount,
      }))
    : [];
  const totalAmount = expenseSummary.overallTotal;

  // Chart data configuration
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Expenses",
        data: data.map((item) => item.value),
        backgroundColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
        hoverBackgroundColor: ["#007BFE", "#00B49F", "#FFBB28", "#FF7042"],
      },
    ],
  };

  // Chart options configuration
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: $${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Card sx={{ maxWidth: 500, margin: "auto", mt: 0, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Expense Summary
          </Typography>
          <Typography variant="h6" color="textSecondary" align="center">
            Total Amount: ${totalAmount}
          </Typography>
          <Box mt={3} sx={{ width: "100%" }} display="flex" justifyContent="center">
            <Box sx={{ width: "100%", maxWidth: "700px" }}>
              {chartType === "pie" ? (
                <Pie data={chartData} options={options} />
              ) : (
                <Bar data={chartData} options={options} />
              )}
            </Box>
          </Box>
          <Box mt={2} display="flex" justifyContent="center">
            <Button variant="contained" onClick={() => setChartType(chartType === "pie" ? "bar" : "pie")}>
              Show {chartType === "pie" ? "Bar" : "Pie"} Chart
            </Button>
            <Button variant="outlined" sx={{ ml: 2 }} onClick={() => setOpenFullScreen(true)}>
              Full Screen
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Full-screen dialog */}
      <Dialog
        fullScreen
        open={openFullScreen}
        onClose={() => setOpenFullScreen(false)}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => setOpenFullScreen(false)} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Expense Summary - {chartType === "pie" ? "Pie" : "Bar"} Chart
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Box display="flex" justifyContent="center" mt={4}>
            {chartType === "pie" ? (
              <Pie data={chartData} options={options} />
            ) : (
              <Bar data={chartData} options={options} />
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExpenseSummary;
