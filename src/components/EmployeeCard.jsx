import React from 'react';
const EmployeeCard = ({ employee }) => {
  const isHeigherSalary = employee.salary > 60000;
  return (
    <div>
      <h1>{employee.name}</h1>
      <p>ID: {employee.id}</p>
      <p>Department: {employee.department}</p>

      <p>
        Salary:
        {isHeigherSalary ? (
          <span className="green">{employee.salary}</span>
        ) : (
          <span>{employee.salary}</span>
        )}
      </p>
    </div>
  );
};

export default EmployeeCard;
