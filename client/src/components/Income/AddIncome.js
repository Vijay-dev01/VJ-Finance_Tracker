import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getIncomes,
  createNewIncome,
  updateIncome, // New action to update income
  clearIncomeCreatedData,
  deleteIncome,
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
import IncomeTable from "./IncomeTable";

export default function AddIncome() {
  const [incomeData, setIncomeData] = useState({
    title: "",
    amount: "",
    category: "General",
    description: "",
    date: "",
  });
  const [isEditMode, setIsEditMode] = useState(false); // Track edit mode
  const [editIncomeId, setEditIncomeId] = useState(null); // Store ID of income to edit
  const [filter, setFilter] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isIncomeCreated, incomes } = useSelector(
    (state) => state.incomeState
  );

  const onChange = (e) => {
    setIncomeData({ ...incomeData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (isEditMode) {
      dispatch(updateIncome(editIncomeId, incomeData)).then(() => {
        toast("Income updated successfully!", {
          position: "bottom-center",
          type: "success",
        });
        dispatch(getIncomes());
        setIsEditMode(false); // Reset to add mode
        setIncomeData({ title: "", amount: "", category: "", description: "", date: "" });
      });
    } else {
      dispatch(createNewIncome(incomeData));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteIncome(id)).then(() => {
      toast("Income deleted successfully!", {
        position: "bottom-center",
        type: "success",
      });
    });
  };

  const handleEdit = (id) => {
    const incomeToEdit = incomes.find((income) => income._id === id);
    setIncomeData({
      title: incomeToEdit.title,
      amount: incomeToEdit.amount,
      category: incomeToEdit.category,
      description: incomeToEdit.description,
      date: incomeToEdit.date,
    });
    setEditIncomeId(id);
    setIsEditMode(true);
  };

  useEffect(() => {
    dispatch(getIncomes());

    if (isIncomeCreated) {
      toast("Income added successfully!", {
        position: "bottom-center",
        type: "success",
        onClose: () => {
          setIncomeData({
            title: "",
            amount: "",
            category: "",
            description: "",
            date: "",
          });
          dispatch(clearIncomeCreatedData());
          navigate("/homescreen");
        },
      });
    }

    if (error) {
      toast(error, {
        position: "bottom-center",
        type: "error",
        onClose: () => {
          dispatch(clearIncomeCreatedData());
        },
      });
    }
  }, [isIncomeCreated, error, dispatch, navigate]);

  const filteredIncomes = Array.isArray(incomes)
    ? incomes.filter((income) =>
        income.title.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  return (
    <Grid container spacing={2} justifyContent="center" style={{ marginTop: "50px" }}>
      <Grid item xs={10} md={4}>
        <form onSubmit={submitHandler}>
          <Box p={4} boxShadow={3} borderRadius={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              {isEditMode ? "Edit Income" : "Add New Income"}
            </Typography>

            <Box mb={3}>
              <TextField
                label="Title"
                name="title"
                variant="outlined"
                fullWidth
                value={incomeData.title}
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
                value={incomeData.amount}
                onChange={onChange}
              />
            </Box>
            <Box mb={3}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  label="Category"
                  value={incomeData.category}
                  onChange={onChange}
                >
                  <MenuItem value="General">General</MenuItem>
                  <MenuItem value="Salary">Salary</MenuItem>
                  <MenuItem value="Investment">Investment</MenuItem>
                  <MenuItem value="Freelance">Freelance</MenuItem>
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
                value={incomeData.description}
                onChange={onChange}
              />
            </Box>

            <Box mb={3}>
              <InputLabel>Date</InputLabel>
              <TextField
                name="date"
                type="date"
                fullWidth
                value={incomeData.date}
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
              {isEditMode ? "Update Income" : "Add Income"}
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

        <IncomeTable incomes={filteredIncomes} onEdit={handleEdit} onDelete={handleDelete} />
      </Grid>
    </Grid>
  );
}
