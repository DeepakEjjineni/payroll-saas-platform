const express = require("express");
const router = express.Router();
const payrollController = require("../controllers/payrollController");

router.post("/calculate", payrollController.calculatePayroll);
router.get("/:employee_id", payrollController.getPayrollByEmployee);

module.exports = router;
