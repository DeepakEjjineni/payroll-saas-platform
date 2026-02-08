const express = require("express");
require("dotenv").config();
const app = express();
const employeeRoutes = require("./routes/employeeRoutes");

app.use(express.json());

app.use("/api/employees", employeeRoutes)

app.listen(3000, () => console.log("Server running on port 3000"));