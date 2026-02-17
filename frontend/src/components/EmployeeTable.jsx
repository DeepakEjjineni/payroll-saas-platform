function EmployeeTable({ employees, payrollData, onEdit, onDelete, onCalculate }) {
  return (
    <div>
      <h2>Employee List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="6">No employees found</td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.salary}</td>
                <td>
                  <button onClick={() => onEdit(emp)}>Edit</button>
                  <button onClick={() => onCalculate(emp.id)}>
                    Calculate Salary
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm("Delete this employee?")) {
                        onDelete(emp.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {payrollData && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
          <h3>Salary Breakdown</h3>
          <p><strong>Gross Salary:</strong> ₹{payrollData.gross_salary}</p>
          <p><strong>Deductions:</strong> ₹{payrollData.deductions}</p>
          <p><strong>Net Salary:</strong> ₹{payrollData.net_salary}</p>
        </div>
      )}

    </div>
  );
}

export default EmployeeTable;
