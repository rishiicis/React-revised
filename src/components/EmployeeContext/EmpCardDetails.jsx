import React, { useState } from 'react';
import { useEmployeeContext } from './EmployeeContext';

export const EmployeeDetails = ({ employee }) => {
  const { deleteEmployee, updateEmployeeSalary } = useEmployeeContext();
  const [newSalary, setNewSalary] = useState(employee.salary);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = () => {
    updateEmployeeSalary(employee.id, newSalary);
    setIsEditing(false);
  };

  return (
    <div>
      <p>ID: {employee.id}</p>
      <p>Name: {employee.name}</p>
      {isEditing ? (
        <>
          <input
            type="number"
            value={newSalary}
            onChange={(e) => setNewSalary(e.target.value)}
          />
          <button onClick={handleUpdate}>save</button>
        </>
      ) : (
        <p>Salary: {employee.salary}</p>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel' : 'Update salary'}
      </button>
      <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
    </div>
  );
};

export const EmployeeCard = ({ employee }) => {
  return (
    <>
      <EmployeeDetails employee={employee} />
    </>
  );
};

export const EmployeeList = () => {
  const {
    filteredEmployees,
    totalEmployees,
    highestSalaryEmployee,
    searchTerm,
    setSearchTerm,
    addEmployee,
  } = useEmployeeContext();

  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !salary) return;
    addEmployee(name, salary);
    setName('');
    setSalary('');
  };

  return (
    <>
      <div>
        <p>Total Employee: {totalEmployees}</p>
        <p>
          Higest Salary :{' '}
          {highestSalaryEmployee
            ? `${highestSalaryEmployee.name} - ${highestSalaryEmployee.salary}`
            : ' '}
        </p>

        <h3>Search Employee</h3>
        <input
          type="text"
          placeholder="Search name.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <h3>Add Employee</h3>
        <form onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="name.."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="salary.."
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <button> Add Employee</button>
        </form>

        <h3>Employee List</h3>
        {filteredEmployees.map((emp) => (
          <EmployeeCard key={emp.id} employee={emp} />
        ))}
      </div>
    </>
  );
};
