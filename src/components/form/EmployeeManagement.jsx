import React, { useState, useEffect } from 'react';

const INITIAL_FORM_STATE = {
  id: '',
  name: '',
  email: '',
  salary: '',
  department: 'IT',
  role: 'Full-Time',
  agreeTerms: false,
  techStack: '',
};
const EmployeeManagement = () => {
  //with localStorage
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('employees');
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  //handle form data
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  //form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.salary || Number(formData.salary) <= 0) {
      newErrors.salary = 'Salary must be greater than 0';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isEditing) {
      setEmployees(
        employees.map((emp) => (emp.id === formData.id ? formData : emp))
      );
      setIsEditing(false);
    } else {
      setEmployees([...employees, { ...formData, id: Date.now().toString() }]);
    }
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
  };

  const handleEdit = (employee) => {
    setFormData(employee);
    setIsEditing(true);
  };

  //delete if id matched
  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  //employees statue by salary
  const getEmployeeStatus = (salary) => {
    const num = Number(salary);
    if (num > 80000) return 'Senior Employee';
    if (num > 50000) return 'Regular Employee';
    return 'Junior Employee';
  };

  //filter employee
  const processedEmployees = employees
    .filter((emp) => {
      const byName = emp.name.toLowerCase().includes(searchQuery.toLowerCase());
      const byDept =
        filterDepartment === 'All' || emp.department === filterDepartment;
      return byName && byDept;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'salaryAsc') {
        return Number(a.salary) - Number(b.salary);
      }
      if (sortBy === 'salaryDesc') {
        return Number(b.salary) - Number(a.salary);
      }
    });

  return (
    <div>
      <h1>Manage Employee Record</h1>
      <form onSubmit={handleSubmit} className="block">
        <div className="row">
          <input
            type="text"
            placeholder="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error"> {errors.name}</span>}
        </div>
        <div className="row">
          <input
            type="text"
            placeholder="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error"> {errors.email}</span>}
        </div>
        <div className="row">
          <input
            type="number"
            placeholder="Salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
          {errors.salary && <span className="error"> {errors.salary}</span>}
        </div>

        <div className="row">
          <label>Department: </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        <div className="row">
          <label> Role:</label>
          <label>
            <input
              type="radio"
              name="role"
              value="Full-Time"
              checked={formData.role === 'Full-Time'}
              onChange={handleChange}
            />
            Full-Time
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="Contract"
              checked={formData.role === 'Contract'}
              onChange={handleChange}
            />
            Contract
          </label>
        </div>

        <div className="row">
          <label>
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            I Agree
          </label>
        </div>

        {['IT', 'HR','Finance', 'Marketing'].includes(formData.department) && (
          <div className="row">
            <p>Conditional Text:</p>
            <input
              type="text"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              placeholder="e.g. React, Node, Servers"
            />
          </div>
        )}
        <div>
          <button type="submit">
            {isEditing ? 'Update Employee' : 'Add Employee'}
          </button>
          {isEditing && (
            <button onClick={() => setIsEditing(false)}>cancel</button>
          )}
        </div>
      </form>

      <div className="block">
        <h3>Filter Employee </h3>
        <input
          type="text"
          placeholder="search by Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
        >
          <option value="All">All Department</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="default">Sort By ...</option>
          <option value="name">By Name</option>
          <option value="salaryAsc">By Salary Low to High</option>
          <option value="salaryDesc">By Salary High to Low</option>
        </select>
      </div>

      <h3>Display Total Employee: {employees.length} </h3>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Department</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {processedEmployees.length > 0 ? (
            processedEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.salary}</td>
                <td>{emp.department}</td>
                <td>{getEmployeeStatus(emp.salary)}</td>
                <td>
                  <button onClick={() => handleEdit(emp)}>Edit</button>
                  <button onClick={() => handleDelete(emp.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeManagement;