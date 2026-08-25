import React, { useState, useMemo } from 'react';
const employees = [
  { id: 101, name: 'Amit', salary: 50000 },
  { id: 102, name: 'Priya', salary: 70000 },
  { id: 103, name: 'Rahul', salary: 90000 },
  { id: 104, name: 'Neha', salary: 65000 },
  { id: 105, name: 'Sneha', salary: 80000 },
];
// Requirements
// Display all employees.
// Add a search box.
// Use useMemo to filter employees.
// Calculate total salary using useMemo
// Calculate average salary using useMemo
// Display highest-paid employee using useMemo
// When the search text changes:
// Filter employees.
// Avoid unnecessary recalculation of salary statistics.
// Show:
// Total Employees
// Total Salary
// Average Salary
// Highest Paid Employee

export default function EmployeeApp() {
  const [search, setSearch] = useState('');

  // search employees
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  //total employees
  const totalEmployees = useMemo(() => {
    return filteredEmployees.length;
  }, [filteredEmployees]);

  //total salary
  const totalSalary = useMemo(() => {
    return filteredEmployees.reduce((acc, emp) => acc + emp.salary, 0);
  }, [filteredEmployees]);

  //average salary
  const averageSalary = useMemo(() => {
    if (totalEmployees === 0) return 0;
    return totalSalary / totalEmployees;
  }, [totalSalary, totalEmployees]);

  // highest-paid
  const highestPaid = useMemo(() => {
    if (filteredEmployees.length === 0) return null;
    return filteredEmployees.reduce(
      (max, emp) => (emp.salary > max.salary ? emp : max),
      filteredEmployees[0]
    );
  }, [filteredEmployees]);

  // highest-paid
  // const highestPaid = useMemo(() => {
  //   if (filteredEmployees.length === 0) return null;
  //   let highPaid = filteredEmployees[0];
  //   for(let topPay of filteredEmployees){
  //       if(topPay.salary > highPaid.salary){
  //         highPaid = topPay;
  //       }
  //   }
  //   return highPaid;

  // }, [filteredEmployees]);
  return (
    <div>
      <h3>Employee Dashboard</h3>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
        <h3>Statistics</h3>
        <p>Total Employees: {totalEmployees}</p>
        <p>Total Salary: Rs{totalSalary}</p>
        <p>Average Salary: Rs{averageSalary.toFixed(2)}</p>
        <p>
          Highest Paid Employee:
          {highestPaid
            ? `${highestPaid.name} (Rs${highestPaid.salary})`
            : 'None'}
        </p>
      </div>

      <h3>Employee List</h3>
      <ul>
        {filteredEmployees.map((emp) => (
          <li key={emp.id}>
            {emp.name} - Rs{emp.salary}
          </li>
        ))}
      </ul>
    </div>
  );
}
// Requirements
// Display all employees.
// Add a search box.
// Use useMemo to filter employees.
// Calculate total salary using useMemo
// Calculate average salary using useMemo
// Display highest-paid employee using useMemo
// When the search text changes:
// Filter employees.
// Avoid unnecessary recalculation of salary statistics.
// Show:
// Total Employees
// Total Salary
// Average Salary
// Highest Paid Employee
