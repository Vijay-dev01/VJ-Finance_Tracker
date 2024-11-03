
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Card, CardContent, Box, Button, Dialog, DialogContent, AppBar, Toolbar, IconButton } from "@mui/material";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";
import CloseIcon from "@mui/icons-material/Close";
import { getIncomeSummary } from "../../actions/TransactionsAction";

ChartJS.register(ArcElement, BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const IncomeSummary = () => {
  const dispatch = useDispatch();
  const { incomeSummary, loading } = useSelector((state) => state.incomeState);
  const [chartType, setChartType] = useState("pie");
  const [openFullScreen, setOpenFullScreen] = useState(false);

  useEffect(() => {
    dispatch(getIncomeSummary());
  }, [dispatch]);

  const data = Array.isArray(incomeSummary.categories)
    ? incomeSummary.categories.map((expense) => ({
        name: expense.category,
        value: expense.totalAmount,
      }))
    : [];
  const totalAmount = incomeSummary.overallTotal;

  // Chart data configuration
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Incomes",
        data: data.map((item) => item.value),
        backgroundColor: [
          "#0088FE",  // Blue
          "#00C49F",  // Green
          "#FFBB28",  // Yellow
          "#FF8042",  // Orange
          "#A569BD",  // Purple
          "#F39C12",  // Amber
          "#E74C3C",  // Red
          "#5DADE2",  // Light Blue
          "#52BE80",  // Lime Green
          "#AF7AC5"   // Lavender
        ],
        hoverBackgroundColor: [
          "#007BFE",  // Dark Blue
          "#00B49F",  // Dark Green
          "#FFBB00",  // Gold
          "#FF7042",  // Dark Orange
          "#9B59B6",  // Dark Purple
          "#D68910",  // Dark Amber
          "#C0392B",  // Dark Red
          "#3498DB",  // Medium Blue
          "#45B39D",  // Teal
          "#8E44AD"   // Deep Lavender
        ],
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
            Income Summary
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
              Income Summary - {chartType === "pie" ? "Pie" : "Bar"} Chart
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

export default IncomeSummary;
