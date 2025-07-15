import React, { useState, useEffect } from 'react';
import './EmployeeForm.css';

function EmployeeForm({ onSubmit }) {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('employeeFormData');
    return saved
      ? JSON.parse(saved)
      : {
          firstName: '',
          lastName: '',
          email: '',
          jobTitle: '',
          department: ''
        };
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Save form data to localStorage
  useEffect(() => {
    localStorage.setItem('employeeFormData', JSON.stringify(formData));
  }, [formData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid.';
    }
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required.';
    if (!formData.department.trim()) newErrors.department = 'Department is required.';
    return newErrors;
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(validate());
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
      setSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        jobTitle: '',
        department: ''
      });
      setErrors({});
      setTouched({});
      localStorage.removeItem('employeeFormData');
    } else {
      setErrors(newErrors);
      setSubmitted(false);
    }
  };

  const isFormValid = Object.keys(validate()).length === 0;

  return (
    <form className="employee-form" onSubmit={handleSubmit} noValidate>
      <h2 className="form-heading">Add New Employee</h2>

      {submitted && (
        <div className="message success">Employee successfully added!</div>
      )}

      {['firstName', 'lastName', 'email', 'jobTitle', 'department'].map((field) => (
        <div className="form-group" key={field}>
          <label htmlFor={field}>
            {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          </label>
          <input
            type={field === 'email' ? 'email' : 'text'}
            id={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors[field] && touched[field] ? 'input-error' : ''}
          />
          {errors[field] && touched[field] && (
            <span className="field-error">{errors[field]}</span>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="submit-button"
        disabled={!isFormValid}
      >
        Submit
      </button>
    </form>
  );
}

export default EmployeeForm;





