const db = require("../config/db");

exports.calculatePayroll = async (employeeId, month) => {
  const [existing] = await db.promise().query(
    "SELECT * FROM payroll WHERE employee_id = ? AND month = ?",
    [employeeId, month]
  );

  if (existing.length > 0) {
    throw new Error("Payroll already calculated for this month");
  }

  const [employeeRows] = await db.promise().query(
    "SELECT salary FROM employees WHERE id = ?",
    [employeeId]
  );

  if (employeeRows.length === 0) {
    throw new Error("Employee not found");
  }

  const salary = employeeRows[0].salary;

  const gross = salary;
  const deductions = salary * 0.1;
  const net = gross - deductions;

  await db.promise().query(
    `INSERT INTO payroll 
    (employee_id, month, gross_salary, deductions, net_salary) 
    VALUES (?, ?, ?, ?, ?)`,
    [employeeId, month, gross, deductions, net]
  );

  return {
    gross_salary: gross,
    deductions,
    net_salary: net,
  };
};
