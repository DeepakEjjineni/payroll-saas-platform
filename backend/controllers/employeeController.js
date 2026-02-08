const db = require("../config/db");

exports.createEmployee = async (req, res) => {
  const { name, email, phone, department, salary } = req.body;

  if (!name || !email || !phone || !department || !salary) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const [exists] = await db.query(
    "SELECT id FROM employees WHERE email = ?",
    [email]
  );

  if (exists.length > 0) {
    return res.status(400).json({ message: "Email already exists" });
  }

  await db.query(
    `INSERT INTO employees (name, email, phone, department, salary)
     VALUES (?, ?, ?, ?, ?)`,
    [name, email, phone, department, salary]
  );

  res.status(201).json({ message: "Employee created" });
};

exports.getEmployees = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM employees");
  res.status(200).json(rows);
};

exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;

  const [rows] = await db.query(
    "SELECT * FROM employees WHERE id = ?",
    [id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.status(200).json(rows[0]);
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, department, salary } = req.body;

  if (!name || !email || !phone || !department || !salary) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const [employee] = await db.query(
    "SELECT id FROM employees WHERE id = ?",
    [id]
  );

  if (employee.length === 0) {
    return res.status(404).json({ message: "Employee not found" });
  }

  const [emailUsed] = await db.query(
    "SELECT id FROM employees WHERE email = ? AND id != ?",
    [email, id]
  );

  if (emailUsed.length > 0) {
    return res.status(400).json({ message: "Email already exists" });
  }

  await db.query(
    `UPDATE employees
     SET name=?, email=?, phone=?, department=?, salary=?
     WHERE id=?`,
    [name, email, phone, department, salary, id]
  );

  res.status(200).json({ message: "Employee updated" });
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;

  const [result] = await db.query(
    "DELETE FROM employees WHERE id = ?",
    [id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.status(200).json({ message: "Employee deleted" });
};
