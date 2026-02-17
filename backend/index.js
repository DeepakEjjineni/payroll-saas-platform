const express = require("express");
require("dotenv").config();
const app = express();
const employeeRoutes = require("./routes/employeeRoutes");
const payrollRoutes = require("./routes/payrollRoutes");

app.use(express.json());

app.use("/api/employees", employeeRoutes);
app.use("/api/payroll", payrollRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));