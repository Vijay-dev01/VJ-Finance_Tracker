import React, { useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register the necessary components for Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const chartRef = useRef(null);

  // Sample data for the bar chart
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [120, 150, 180, 220, 170, 250],
        backgroundColor: "rgba(75,192,192,1)",
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
        text: "Sales Overview",
      },
    },
  };

  // Sample data for the table
  const rows = [
    {
      id: 1,
      date: "2024-10-01",
      description: "Item A",
      amount: "$120",
      action: "Edit",
    },
    {
      id: 2,
      date: "2024-10-02",
      description: "Item B",
      amount: "$150",
      action: "Edit",
    },
    {
      id: 3,
      date: "2024-10-03",
      description: "Item C",
      amount: "$180",
      action: "Edit",
    },
  ];

  // Cleanup the chart when the component unmounts
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      {/* Four Boxes */}
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        {/* {[1, 2, 3, 4].map((item) => (
          <Grid item xs={3} key={item}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6" align="center">
                Box {item}
              </Typography>
            </Paper>
          </Grid>
        ))} */}
        <Grid item xs={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" align="center">
              Income
            </Typography>
            <Typography variant="h4" align="center" sx={{ marginTop: 1 }}>
              1000000
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" align="center">
              Expense
            </Typography>
            <Typography variant="h4" align="center" sx={{ marginTop: 1 }}>
              10000
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" align="center">
              Investment
            </Typography>
            <Typography variant="h4" align="center" sx={{ marginTop: 1 }}>
              15000
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" align="center">
              Savings
            </Typography>
            <Typography variant="h4" align="center" sx={{ marginTop: 1 }}>
              100000
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Bar Chart */}
      <Box sx={{ marginBottom: 3}}>
        <Bar data={barData} options={chartOptions} ref={chartRef} />
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SL</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary">
                    {row.action}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;
