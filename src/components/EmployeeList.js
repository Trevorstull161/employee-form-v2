import React from 'react';
import './EmployeeList.css';

function EmployeeList({ employees }) {
  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      {employees.length === 0 ? (
        <p>No employees added yet.</p>
      ) : (
        <ul>
          {employees.map((employee, index) => (
            <li key={index}>
              {employee.firstName} {employee.lastName} - {employee.jobTitle} ({employee.department})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EmployeeList;


