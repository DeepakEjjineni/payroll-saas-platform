import { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
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
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default EmployeeManagement;
