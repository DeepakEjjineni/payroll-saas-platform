import { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import { calculatePayroll, getPayrollByEmployee } from "../services/payrollService";

import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [payrollData, setPayrollData] = useState(null);
  
  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };
  
  useEffect(() => {
  const loadEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  loadEmployees();
  }, []);



  const handleAdd = async (employee) => {
    try {
      await addEmployee(employee);
      fetchEmployees();
    } catch (error) {
      alert(error.response?.data?.message || "Error adding employee");
    }
  };

  const handleUpdate = async (employee) => {
    try {
      await updateEmployee(employee.id, employee);
      setSelectedEmployee(null);
      fetchEmployees();
    } catch (error) {
      alert(error.response?.data?.message || "Error updating employee");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      fetchEmployees();
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting employee");
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCalculate = async (employeeId) => {
  try {
    await calculatePayroll({
      employee_id: employeeId,
      month: "September",
    });

    const res = await getPayrollByEmployee(employeeId);
    setPayrollData(res.data[0]);
  } catch (error) {
    alert(error.response?.data?.message || "Payroll calculation failed");
  }
};

  return (
    <div>
      <EmployeeForm
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        selectedEmployee={selectedEmployee}
      />
      <hr />
      <EmployeeTable
        employees={employees}
        payrollData={payrollData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCalculate={handleCalculate}
      />
    </div>
  );
}

export default EmployeeManagement;
