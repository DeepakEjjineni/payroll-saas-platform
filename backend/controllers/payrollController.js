const payrollService = require("../services/payrollService");
const db = require("../config/db");

exports.calculatePayroll = async (req, res) => {
  try {
    const { employee_id, month } = req.body;

    if (!employee_id || !month) {
      return res.status(400).json({
        message: "Employee ID and month are required",
      });
    }

    const result = await payrollService.calculatePayroll(
      employee_id,
      month
    );

    res.status(201).json({
      message: "Payroll calculated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getPayrollByEmployee = async (req, res) => {
  try {
    const { employee_id } = req.params;

    const [rows] = await db.promise().query(
      "SELECT * FROM payroll WHERE employee_id = ? ORDER BY created_at DESC",
      [employee_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "No payroll records found",
      });
    }

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
