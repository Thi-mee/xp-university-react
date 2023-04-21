import { useState, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import ErrorAlert from "../../Common/ErrorAlert";
import {
  useDepartmentContext,
  useDepartmentDispatchContext,
  useFacultyContext,
} from "./DepartmentProvider";
import { ActionObject, isDuplicate } from "../../../Utils/Common/Utils/xpReducer";
import {
  XPAlertIcon,
  XPAlertType,
  XPCrudType,
} from "../../../Utils/Common/Enums/alertEnums";
import { XPAlertObj, XPInfoAlert } from "../../../Utils/Common/Utils/xpAlerts";

export const formDef = {
  id: 0,
  name: "",
  facultyId: 0,
  code: "",
  uniqueId: "",
  isActive: false,
};

export const useDepartmentForm = ({ formObj }) => {
  const [form, setForm] = useState(formObj);
  const [formErrors, setFormErrors] = useState({});
  const [dupError, setDupError] = useState("");

  const handleValueChange = useCallback((e) => {
    const { name, value } = e.target;
    if (e.target.type === "checkbox") {
      setForm({ ...form, [name]: e.target.checked });
    } else if (e.target.type === "select-one") {
      setForm({ ...form, [name]: parseInt(value) });
    }  else {
      setForm({ ...form, [name]: value });
    }

    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  }, [form, formErrors]);

  const validateForm = () => {
    const errors = {};

    // Handle Department Name
    if (!form.name || form.name.length === "") {
      errors.name = "Kindly supply Department name";
    } else if (form.name.length < 3) {
      errors.name = "Faculty name must be at least 3 characters";
    } else if (form.name.length > 50) {
      errors.name = "Faculty name must be less than 50 characters";
    }

    // Handle Faculty Select
    if (!form.facultyId || form.facultyId.length === "") {
      errors.facultyId = "Kindly select a Department";
    }

    // Handle Department Code
    if (!form.code || form.code.length === "") {
      errors.code = "Kindly supply Department code";
    } else if (form.code.length < 2) {
      errors.code = "Department code must be at least 2 characters";
    } else if (form.code.length > 10) {
      errors.code = "Department code must be less than 10 characters";
    }

    // Handle Department UniqueId
    if (!form.uniqueId || form.uniqueId.length === "") {
      errors.uniqueId = "Kindly supply Department UniqueId";
    } else if (form.uniqueId.length < 4) {
      errors.uniqueId = "Department UniqueId must be at least 4 characters";
    } else if (form.uniqueId.length > 10) {
      errors.uniqueId = "Department UniqueId must be less than 10 characters";
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return false;
    }
    return true;
  };

  const initForm = (form) => {
    setForm(form);
    setFormErrors({});
    setDupError('')
  };

  return {
    form,
    handleValueChange,
    formErrors,
    validateForm,
    initForm,
    dupError,
    setDupError,
  };
};



function DepartmentForm({ onToggleModal, formObj }) {
  const faculties = useFacultyContext();
  const {departments} = useDepartmentContext();
  const dispatch = useDepartmentDispatchContext();
  const {
    form,
    handleValueChange,
    formErrors: errors,
    validateForm,
    initForm,
    dupError,
    setDupError,
  } = useDepartmentForm({ formObj });

  const onSubmit = (e) => {
    e.preventDefault();
    const alertObj = XPAlertObj();
    alertObj.icon = XPAlertIcon.byType(XPAlertType.Success);
    // Validate inputs
    if (!validateForm()) return false;
    const retVal = isDuplicate(departments, form);
    if (retVal.status) {
      setDupError(retVal.error);
      return false;
    }

    if (form.id > 0) {
      // Update Department
      const actionObj = new ActionObject(XPCrudType.Update.toString(), form, "departments");
      dispatch(actionObj);
      alertObj.title = "Department Updated";
      alertObj.text = "Department has been updated successfully";
      alertObj.callback = onToggleModal;
      XPInfoAlert(alertObj);
    } else {
      // Add Department
      const actionObj = new ActionObject(XPCrudType.Add.toString(), form, "departments");
      dispatch(actionObj);
      alertObj.title = "Department Added";
      alertObj.text = "Department has been added successfully";
      XPInfoAlert(alertObj);
    }
    initForm(formDef);
  };

  return (
    <Form className="container mb-3 mt-3">
      {dupError.length > 0 ? <ErrorAlert text={dupError} /> : null}
      <input
        type="hidden"
        id="fct_id"
        name="id"
        value={form.id}
        onChange={handleValueChange}
      />
      <Form.Group controlId="Name" className="mb-2">
        <Form.Label>Department Name</Form.Label>
        <Form.Control
          name="name"
          type="text"
          placeholder="Enter Department Name"
          value={form.name}
          onChange={handleValueChange}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="FacultyId" className="mb-2">
        <Form.Label>Faculty</Form.Label>
        <Form.Control
          name="facultyId"
          as="select"
          value={form.facultyId}
          onChange={handleValueChange}
          isInvalid={!!errors.facultyId}>
          <option value="">Select Faculty</option>
          {faculties.map((faculty) => (
            <option key={faculty.id} value={faculty.id}>
              {faculty.name}
            </option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors.facultyId}
        </Form.Control.Feedback>
      </Form.Group>
      <div className="row">
        <Form.Group controlId="Code" className="col-sm-6 mb-2">
          <Form.Label>Department Code</Form.Label>
          <Form.Control
            name="code"
            type="text"
            placeholder="Enter Department Code"
            value={form.code}
            onChange={handleValueChange}
            isInvalid={!!errors.code}
          />
          <Form.Control.Feedback type="invalid">
            {errors.code}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="UniqueId" className="col-sm-6 mb-2">
          <Form.Label>Department UniqueId</Form.Label>
          <Form.Control
            name="uniqueId"
            type="text"
            placeholder="Enter Department UniqueId"
            value={form.uniqueId}
            onChange={handleValueChange}
            isInvalid={!!errors.uniqueId}
          />
          <Form.Control.Feedback type="invalid">
            {errors.uniqueId}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      <Form.Check
        name="isActive"
        type="checkbox"
        label="Active"
        checked={form.isActive}
        onChange={handleValueChange}
      />
      <Button variant="primary" type="submit" onClick={onSubmit}>
        Submit
      </Button>
    </Form>
  );
}

export default DepartmentForm;
