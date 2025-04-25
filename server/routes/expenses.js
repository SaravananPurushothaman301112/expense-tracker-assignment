const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Add new Expense
router.post('/', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).send(expense);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    console.log(expenses)
    res.send(expenses);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get expense by ID
router.get('/:id', async (req, res) => {
  try {
    // Find the expense by its ID
    const expense = await Expense.findById(req.params.id);
    
    // If no expense is found with the given ID, return 404
    if (!expense) return res.status(404).send({ message: 'Expense not found' });

    // If found, send the expense data as a response
    res.send(expense);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Update expense
router.put('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!expense) return res.status(404).send();
    res.send(expense);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete expense
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).send();
    res.send(expense);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;