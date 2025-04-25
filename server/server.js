const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',  // Replace with the specific origin if needed
}));
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const expenseRoutes = require('./routes/expenses');
app.use('/api/expenses', expenseRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Welcome to My Expense Tracker App!</h1><p>Server is running and connected to MongoDB.</p>');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}. Visit http://localhost:${PORT} to see the message.`));
