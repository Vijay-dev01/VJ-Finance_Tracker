import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewExpense, clearExpenseCreatedData } from "../../actions/TransactionsAction";
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

export default function AddExpense() {
  const [expenseData, setExpenseData] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isExpenseCreated } = useSelector((state) => state.expenseState);

  const onChange = (e) => {
    setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNewExpense(expenseData));
  };

  useEffect(() => {
    if (isExpenseCreated) {
      toast("Expense added successfully!", {
        position: "bottom-center",
        type: "success",
        onClose: () => {
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

  return (
    <Grid container justifyContent="center" style={{ marginTop: "50px" }}>
      <Grid item xs={12} md={6}>
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
    </Grid>
  );
}
