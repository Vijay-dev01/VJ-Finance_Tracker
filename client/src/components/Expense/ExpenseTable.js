import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export default function ExpenseTable({ expenses, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
      {expenses.length === 0 ? (
        <Typography variant="h6" align="center" style={{ padding: "16px" }}>
          No Expenses
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sl. No</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense, index) => (
              <TableRow key={expense._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{expense.title}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => onEdit(expense._id)}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(expense._id)}
                    color="secondary"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
