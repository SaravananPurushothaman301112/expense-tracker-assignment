import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Paper, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const response = await axios.get('http://localhost:5000/api/expenses');
    setExpenses(response.data);
  };

  const deleteExpense = async (id) => {
    await axios.delete(`http://localhost:5000/api/expenses/${id}`);
    fetchExpenses();
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Button variant="contained" color="primary" component={Link} to="/add" style={{ marginBottom: '20px' }}>
        Add Expense
      </Button>
      <Button variant="outlined" component={Link} to="/dashboard" style={{ marginLeft: '10px', marginbottom: '19px' }}>
        View Dashboard
      </Button>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense._id}>
                <TableCell>${expense.amount}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/edit/${expense._id}`} color="primary">Edit</Button>
                  <Button onClick={() => deleteExpense(expense._id)} color="secondary">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ExpenseList;