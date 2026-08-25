import React, { useState, useEffect } from 'react';
const initialData = [
  { id: 101, name: 'Amit', Score: 22 },
  { id: 102, name: 'Priya', Score: 18 },
  { id: 103, name: 'Rahul', Score: 25 },
  { id: 104, name: 'Neha', Score: 15 },
  { id: 105, name: 'Sneha', Score: 20 },
];

export default function StudentScoreApp() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStudents(initialData);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleExamUpdate = () => {
    setStudents((prev) =>
      prev.map((st) => (st.id === 102 ? { ...st, Score: 21 } : st))
    );
  };
  // const foundStudent = students.find(st => st.id === Number(searchId));
  const foundStudent = students.find((st) =>
    st.name.toLowerCase().includes(searchId.toLowerCase())
  );
  const totalStudents = students.length;
  const avgScore = totalStudents
    ? students.reduce((acc, s) => acc + s.Score, 0) / totalStudents
    : 0;
  const excellent = students.filter((s) => s.Score >= 25);
  const poor = students.filter((s) => s.Score < 15);

  if (loading) return <p>Loading ...</p>;

  return (
    <div>
      <h2>Student Score Dashboard</h2>
      <ul>
        {students.map((s) => (
          <li key={s.id}>
            Name: {s.name}, ID: {s.id}, Score: {s.Score}
          </li>
        ))}
      </ul>
      <h3>Search student Score</h3>
      <div>
        <input
          type="text"
          placeholder="Search by NAme"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        {searchId && foundStudent ? (
          <p>
            {foundStudent.name} - Score: {foundStudent.Score}
          </p>
        ) : searchId ? (
          <p>Student not found</p>
        ) : null}
      </div>
      <button onClick={handleExamUpdate}>Simulate New Exam Update</button>
      <div>
        <h3>Statistics</h3>
        <p>Total Students: {totalStudents}</p>
        <p>Average Score: {avgScore}</p>
        <p>
          Excellent score 25 or More:
          {excellent.map((e) => `${e.name}, Score: ${e.Score}`).join(', ') ||
            'None'}
        </p>
        <p>
          Poor score 15 or less:
          {poor.map((p) => `${p.name}, Score: ${p.Score}`).join(', ') || 'None'}
        </p>
      </div>
    </div>
  );
}

// Pass the employee array as props to EmployeeList.
// EmployeeList should display all employees.
// Create a separate EmployeeCard component.
// Pass individual employee objects from EmployeeList to EmployeeCard.
// Display employees with salary greater than ₹60,000 in green color.
