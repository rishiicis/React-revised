// Pass the employee array as props to EmployeeList.
// EmployeeList should display all employees.
// Create a separate EmployeeCard component.
// Pass individual employee objects from EmployeeList to EmployeeCard.
// Display employees with salary greater than ₹60,000 in green color.

import React from 'react';
import EmployeeCard from './EmployeeCard';
const DisplayUserData = () => {
  const userData = [
    { id: 101, name: 'Amit', salary: 50000, department: 'IT' },
    { id: 102, name: 'Priya', salary: 60000, department: 'HR' },
    { id: 103, name: 'Rahul', salary: 70000, department: 'Finance' },
  ];
  return (
    <>
      {userData.map((emp) => (
        <EmployeeCard key={emp.id} employee={emp} />
      ))}
    </>
  );
};

export default DisplayUserData;
