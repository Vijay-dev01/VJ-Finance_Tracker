import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getExpense,
  createNewExpense,
  updateExpense,
  clearExpenseCreatedData,
  deleteExpense,
} from "../../actions/TransactionsAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import ExpenseTable from "./ExpenseTable";

export default function AddExpense() {
  const [expenseData, setExpenseData] = useState({
    title: "",
    amount: "",
    category: "General",
    description: "",
    date: "",
  });
  const [isEditMode, setIsEditMode] = useState(false); // Track edit mode
  const [editExpenseId, setEditExpenseId] = useState(null); // Store ID of income to edit
  const [filter, setFilter] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isExpenseCreated, expenses } = useSelector(
    (state) => state.expenseState
  );

  const onChange = (e) => {
    setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (isEditMode) {
      dispatch(updateExpense(editExpenseId, expenseData)).then(() => {
        toast("Income updated successfully!", {
          position: "bottom-center",
          type: "success",
        });
        dispatch(getExpense());
        setIsEditMode(false); // Reset to add mode
        setExpenseData({
          title: "",
          amount: "",
          category: "",
          description: "",
          date: "",
        });
      });
    } else {
      dispatch(createNewExpense(expenseData));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteExpense(id)).then(() => {
      toast("Expense deleted successfully!", {
        position: "bottom-center",
        type: "success",
      });
    });
  };

  const handleEdit = (id) => {
    const expenseToEdit = expenses.find((income) => income._id === id);
    setExpenseData({
      title: expenseToEdit.title,
      amount: expenseToEdit.amount,
      category: expenseToEdit.category,
      description: expenseToEdit.description,
      date: expenseToEdit.date,
    });
    setEditExpenseId(id);
    setIsEditMode(true);
  };

  useEffect(() => {
    dispatch(getExpense());

    if (isExpenseCreated) {
      toast("Expense added successfully!", {
        position: "bottom-center",
        type: "success",
        onClose: () => {
          setExpenseData({
            title: "",
            amount: "",
            category: "",
            description: "",
            date: "",
          });
          dispatch(clearExpenseCreatedData());
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

  const filteredExpenses = Array.isArray(expenses)
    ? expenses.filter((expense) =>
        expense.title.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      style={{ marginTop: "50px" }}
    >
      <Grid item xs={12} md={4}>
        <form onSubmit={submitHandler}>
          <Box p={4} boxShadow={3} borderRadius={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              {isEditMode ? "Edit Expense" : "Add New Expense"}
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
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  label="Category"
                  value={expenseData.category}
                  onChange={onChange}
                >
                  <MenuItem value="General">General</MenuItem>
                  <MenuItem value="Food">Food</MenuItem>
                  <MenuItem value="Fuel">Fuel</MenuItem>
                  <MenuItem value="Grocery">Grocery</MenuItem>
                  <MenuItem value="Shopping">Shopping</MenuItem>
                  <MenuItem value="Travel">Travel</MenuItem>
                  <MenuItem value="Fun">Fun</MenuItem>
                  <MenuItem value="UnKnown_Expenses">UnKnown Expenses</MenuItem>
                  <MenuItem value="Health_Care">Health Care</MenuItem>
                  <MenuItem value="Stocks">STOCKS</MenuItem>
                  <MenuItem value="Gold_etf">Gold ETF</MenuItem>
                  <MenuItem value="SIP">SIP</MenuItem>
                  <MenuItem value="Sheetu">Sheetu</MenuItem>
                  <MenuItem value="Bussiness">Bussiness savings</MenuItem>
                </Select>
              </FormControl>
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
                InputLabel={{
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
              {isEditMode ? "Update Expense" : "Add Expense"}
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
