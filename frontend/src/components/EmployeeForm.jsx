import { useEffect, useState } from "react";

const emptyForm = {
  id: null,
  name: "",
  email: "",
  phone: "",
  department: "",
  salary: "",
};

function EmployeeForm({ onAdd, onUpdate, selectedEmployee }) {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedEmployee) {
      setFormData(selectedEmployee);
    }
  }, [selectedEmployee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name required";
    if (!formData.email) newErrors.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";

    if (!formData.phone) newErrors.phone = "Phone required";
    if (!formData.department) newErrors.department = "Department required";
    if (!formData.salary) newErrors.salary = "Salary required";
    else if (isNaN(formData.salary))
      newErrors.salary = "Salary must be numeric";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (formData.id) {
      onUpdate(formData);
    } else {
      onAdd(formData);
    }

    setFormData(emptyForm);
    setErrors({});
  };

  const handleReset = () => {
    setFormData(emptyForm);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{formData.id ? "Edit Employee" : "Add Employee"}</h2>

      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
      {errors.name && <p>{errors.name}</p>}

      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      {errors.email && <p>{errors.email}</p>}

      <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
      {errors.phone && <p>{errors.phone}</p>}

      <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} />
      {errors.department && <p>{errors.department}</p>}

      <input name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} />
      {errors.salary && <p>{errors.salary}</p>}

      <button type="submit">{formData.id ? "Update" : "Submit"}</button>
      <button type="button" onClick={handleReset}>Reset</button>
    </form>
  );
}

export default EmployeeForm;
