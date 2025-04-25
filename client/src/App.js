import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExpenseList from './Components/ExpenseList';
import AddExpense from './Components/AddExpense';
import Dashboard from './Components/Dashboard';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ExpenseList />} />
          <Route path="/add" element={<AddExpense />} />
          <Route path="/edit/:id" element={<AddExpense />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
