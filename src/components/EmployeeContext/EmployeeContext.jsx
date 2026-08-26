import React, { createContext, useContext, useState, useMemo } from 'react';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Ram', salary: 85000 },
    { id: 2, name: 'Kumar', salary: 72000 },
    { id: 3, name: 'Amit', salary: 110000 },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const addEmployee = (name, salary) => {
    const newEmployee = {
      id: Date.now(),
      name,
      salary: Number(salary),
    };
    setEmployees((prev) => [...prev, newEmployee]);
  };

  const deleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const updateEmployeeSalary = (id, newSalary) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, salary: Number(newSalary) } : emp
      )
    );
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEmployees = employees.length;

  const highestSalaryEmployee = employees.reduce(
    (max, emp) => (emp.salary > (max?.salary || 0) ? emp : max),
    null
  );

  return (
    <EmployeeContext.Provider
      value={{
        filteredEmployees,
        totalEmployees,
        highestSalaryEmployee,
        searchTerm,
        setSearchTerm,
        addEmployee,
        deleteEmployee,
        updateEmployeeSalary,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => useContext(EmployeeContext);
