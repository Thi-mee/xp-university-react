import {useState} from 'react'
import { Form } from 'react-bootstrap';


export const useXPForm = ({ formObj }) => {
  const [form, setForm] = useState(formObj);
  const [formErrors, setFormErrors] = useState({});

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "checkbox") {
      setForm({ ...form, [name]: e.target.checked });
    } else {
      setForm({ ...form, [name]: value });
    }

    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };

  const validateForm = () => {
    const errors = {};

    // Handle Department Name
    if(!form.name || form.name.length === "") {
      errors.name = "Kindly supply Faculty name";
    } else if (form.name.length < 3) {
      errors.name = "Faculty name must be at least 3 characters";
    } else if (form.name.length > 50) {
      errors.name = "Faculty name must be less than 50 characters";
    }

    // Handle Faculty Select
    if(!form.facultyId || form.facultyId.length === "") {
      errors.facultyId = "Kindly select a Faculty";
    }

    // Handle Department Code
    if(!form.code || form.code.length === "") {
      errors.code = "Kindly supply Faculty code";
    } else if (form.code.length < 2) {
      errors.code = "Faculty code must be at least 2 characters";
    } else if (form.code.length > 10) {
      errors.code = "Faculty code must be less than 10 characters";
    }
    // Handle Department UniqueId
    if(!form.uniqueId || form.uniqueId.length === "") {
      errors.uniqueId = "Kindly supply Faculty UniqueId";
    } else if (form.uniqueId.length < 4) {
      errors.uniqueId = "Faculty UniqueId must be at least 4 characters";
    } else if (form.uniqueId.length > 10) {
      errors.uniqueId = "Faculty UniqueId must be less than 10 characters";
    }
    
    return errors;
  };

  const initForm = (form) => {
    setForm(form);
    setFormErrors({});
  };

  return {form, handleValueChange, formErrors, validateForm, initForm, setFormErrors};
}


function DepartmentForm({ form, handleValueChange, errors, faculties}) {
  return (
    <Form className="container mb-3 mt-3">
      <input
        type="hidden"
        id="fct_id"
        name="id"
        value={form.id}
        onChange={handleValueChange}
      />
      <Form.Group controlId="Name" className="mb-2">
        <Form.Label>Faculty Name</Form.Label>
        <Form.Control
          name="name"
          type="text"
          placeholder="Enter Faculty Name"
          value={form.name}
          onChange={handleValueChange}
        />
      </Form.Group>
      <Form.Group controlId="FacultyId" className="mb-2">
        <Form.Label>Faculty</Form.Label>
        <Form.Control
          name="facultyId"
          as="select"
          value={form.facultyId}
          onChange={handleValueChange}>
          <option value="">Select Faculty</option>
          {faculties.map((faculty) => (
            <option key={faculty.id} value={faculty.id}>
              {faculty.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <div className="row">
        <Form.Group controlId="Code" className="col-sm-6 mb-2">
          <Form.Label>Faculty Code</Form.Label>
          <Form.Control
            name="code"
            type="text"
            placeholder="Enter Faculty Code"
            value={form.code}
            onChange={handleValueChange}
          />
        </Form.Group>
        <Form.Group controlId="UniqueId" className="col-sm-6 mb-2">
          <Form.Label>Faculty UniqueId</Form.Label>
          <Form.Control
            name="uniqueId"
            type="text"
            placeholder="Enter Faculty UniqueId"
            value={form.uniqueId}
            onChange={handleValueChange}
          />
        </Form.Group>
      </div>
      <Form.Check
        name="isActive"
        type="checkbox"
        label="Active"
        checked={form.isActive}
        onChange={handleValueChange}
      />
    </Form>
  );
}

export default DepartmentForm;