import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export default function IncomeTable({ incomes, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
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
          {incomes.map((income, index) => (
            <TableRow key={income._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{income.title}</TableCell>
              <TableCell>{income.category}</TableCell>
              <TableCell>{income.date}</TableCell>
              <TableCell>{income.amount}</TableCell>
              <TableCell>{income.description}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => onEdit(income._id)}>
                  <Edit />
                </IconButton>
                <IconButton color="secondary" onClick={() => onDelete(income._id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
