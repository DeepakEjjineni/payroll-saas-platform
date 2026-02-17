import axios from "axios";

const API_URL = "http://localhost:3000/api/payroll";

export const calculatePayroll = (data) => {
  return axios.post(`${API_URL}/calculate`, data);
};

export const getPayrollByEmployee = (employeeId) => {
  return axios.get(`${API_URL}/${employeeId}`);
};
