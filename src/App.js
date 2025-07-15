import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    }
  }, []);

  const handleFormSubmit = (employee) => {
    const updatedEmployees = [...employees, employee];
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  return (
    <div className="App">
      <nav className="nav-bar">
        <Link to="/">Add Employee</Link>
        <Link to="/list">Employee List</Link>
      </nav>

      <Routes>
        <Route path="/" element={<EmployeeForm onSubmit={handleFormSubmit} />} />
        <Route path="/list" element={<EmployeeList employees={employees} />} />
      </Routes>
    </div>
  );
}

export default App;


