import React, { useState } from 'react';
import './EmployeeForm.css';

function EmployeeForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    department: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setSubmitted(false);
    setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      formData.firstName.trim() === '' ||
      formData.lastName.trim() === '' ||
      formData.email.trim() === '' ||
      formData.jobTitle.trim() === '' ||
      formData.department.trim() === ''
    ) {
      setError(true);
      setSubmitted(false);
      return;
    }

    console.log('Form submitted:', formData);
    setSubmitted(true);
    setError(false);

    // Reset the form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      jobTitle: '',
      department: ''
    });
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2>Add New Employee</h2>

      {submitted && <p className="success-message">Employee successfully added!</p>}
      {error && <p className="error-message">Please fill out all fields before submitting.</p>}

      <label>
        First Name:
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
      </label>
      <label>
        Last Name:
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Job Title:
        <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
      </label>
      <label>
        Department:
        <input type="text" name="department" value={formData.department} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default EmployeeForm;

