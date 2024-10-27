import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpense, createNewExpense, clearExpenseCreatedData, deleteExpense } from "../../actions/TransactionsAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  InputLabel,
} from "@mui/material";
import ExpenseTable from "./ExpenseTable";

export default function AddExpense() {
  const [expenseData, setExpenseData] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
    date: "",
  });
  const [filter, setFilter] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isExpenseCreated, expenses } = useSelector((state) => state.expenseState);

  const onChange = (e) => {
    setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNewExpense(expenseData));
  };

  const handleDelete = (id) => {
    dispatch(deleteExpense(id));
  };

  const handleEdit = (id) => {
    console.log("Edit", id);
    // Handle edit logic here
  };

  useEffect(() => {
    dispatch(getExpense());

    if (isExpenseCreated) {
      toast("Expense added successfully!", {
        position: "bottom-center",
        type: "success",
        onClose: () => {
          setExpenseData({ title: "", amount: "", category: "", description: "", date: "" });
          dispatch(clearExpenseCreatedData());
          navigate("/homescreen");
        },
      });
    }

    if (error) {
      toast(error, {
        position: "bottom-center",
        type: "error",
        onClose: () => {
          dispatch(clearExpenseCreatedData());
        },
      });
    }
  }, [isExpenseCreated, error, dispatch, navigate]);

  const filteredExpenses = expenses.filter((expense) =>
    expense.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Grid container spacing={2} justifyContent="center" style={{ marginTop: "50px" }}>
      <Grid item xs={12} md={4}>
        <form onSubmit={submitHandler}>
          <Box p={4} boxShadow={3} borderRadius={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              Add New Expense
            </Typography>

            <Box mb={3}>
              <TextField
                label="Title"
                name="title"
                variant="outlined"
                fullWidth
                value={expenseData.title}
                onChange={onChange}
              />
            </Box>

            <Box mb={3}>
              <TextField
                label="Amount"
                name="amount"
                type="number"
                variant="outlined"
                fullWidth
                value={expenseData.amount}
                onChange={onChange}
              />
            </Box>

            <Box mb={3}>
              <TextField
                label="Category"
                name="category"
                variant="outlined"
                fullWidth
                value={expenseData.category}
                onChange={onChange}
              />
            </Box>

            <Box mb={3}>
              <TextField
                label="Description"
                name="description"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={expenseData.description}
                onChange={onChange}
              />
            </Box>

            <Box mb={3}>
              <InputLabel>Date</InputLabel>
              <TextField
                name="date"
                type="date"
                fullWidth
                value={expenseData.date}
                onChange={onChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              size="large"
              disabled={loading}
            >
              Add Expense
            </Button>
          </Box>
        </form>
      </Grid>

      <Grid item xs={12} md={8}>
        <TextField
          label="Filter by Title"
          variant="outlined"
          fullWidth
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ marginBottom: "16px" }}
        />

        <ExpenseTable
          expenses={filteredExpenses}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Grid>
    </Grid>
  );
}
