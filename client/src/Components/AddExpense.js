import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Paper, Typography, MenuItem } from '@mui/material';

const categories = ['Food', 'Transportation', 'Housing', 'Entertainment', 'Utilities', 'Healthcare', 'Other'];

const AddExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (id) {
      const fetchExpense = async () => {
        const response = await axios.get(`http://localhost:5000/api/expenses/${id}`);
        setExpense({
          ...response.data,
          date: new Date(response.data.date).toISOString().split('T')[0]
        });
      };
      fetchExpense();
    }
  }, [id]);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`http://localhost:5000/api/expenses/${id}`, expense);
      console.log(id)
    } else {
      await axios.post('http://localhost:5000/api/expenses', expense);
    }
    navigate('/');
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px', maxWidth: '500px' }}>
      <Typography variant="h6" gutterBottom>
        {id ? 'Edit Expense' : 'Add New Expense'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Amount"
          name="amount"
          type="number"
          value={expense.amount}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Category"
          name="category"
          select
          value={expense.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Description"
          name="description"
          value={expense.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          value={expense.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          {id ? 'Update' : 'Save'}
        </Button>
      </form>
    </Paper>
  );
};

export default AddExpense;