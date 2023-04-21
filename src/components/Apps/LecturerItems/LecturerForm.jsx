import { useState, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import ErrorAlert from "../../Common/ErrorAlert";
import {
  useLecturerContext,
  useLecturerDispatchContext,
  useDepartmentContext,
} from "./LecturerProvider";
import {
  ActionObject,
  isLecturerDuplicate,
} from "../../../Utils/Common/Utils/xpReducer";
import {
  XPAlertIcon,
  XPAlertType,
  XPCrudType,
} from "../../../Utils/Common/Enums/alertEnums";
import { XPAlertObj, XPInfoAlert } from "../../../Utils/Common/Utils/xpAlerts";

export const formDef = {
  id: 0,
  firstName: "",
  surname: "",
  otherNames: "",
  departmentId: 0,
  StaffId: "",
  isActive: false,
};

export const useLecturerForm = ({ formObj }) => {
  const [form, setForm] = useState(formObj);
  const [formErrors, setFormErrors] = useState({});
  const [dupError, setDupError] = useState("");

  const handleValueChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      if (e.target.type === "checkbox") {
        setForm({ ...form, [name]: e.target.checked });
      } else if (e.target.type === "select-one" || e.target.type === "number") {
        setForm({ ...form, [name]: parseInt(value) });
      } else {
        setForm({ ...form, [name]: value });
      }

      if (formErrors[name]) {
        setFormErrors({ ...formErrors, [name]: null });
      }
    },
    [form, formErrors]
  );

  const validateForm = () => {
    const errors = {};

    // Handle Lecturer Name
    if (!form.firstName || form.firstName.length === "") {
      errors.firstName = "Kindly supply Lecturer's First Name";
    } else if (form.firstName.length < 3) {
      errors.firstName = "First Name should be at least 3 characters";
    } else if (form.firstName.length > 20) {
      errors.firstName = "First Name cannot be greater than 20 characters";
    }
    if (!form.surname || form.surname.length === "") {
      errors.surname = "Kindly supply Lecturer's Surname";
    } else if (form.surname.length < 3) {
      errors.surname = "Surname should be at least 3 characters";
    } else if (form.surname.length > 20) {
      errors.surname = "Surname cannot be greater than 20 characters";
    }
    if (form.otherName?.length > 0 && form.otherName.length < 3) {
      errors.otherName = "Other Name should be at least 3 characters";
    } else if (form.otherName?.length > 20) {
      errors.otherName = "Surname cannot be greater than 20 characters";
    }

    // Handle Department Select
    if (!form.departmentId || form.departmentId.length === "") {
      errors.departmentId = "Kindly select a Department";
    }

    // Handle Course StaffId
    if (!form.staffId || form.staffId.length === "") {
      errors.staffId = "Kindly supply Lecturer StaffId";
    } else if (form.staffId.length < 4) {
      errors.staffId = "Lecturer StaffId must be at least 4 characters";
    } else if (form.staffId.length > 10) {
      errors.staffId = "Lecturer StaffId must be less than 10 characters";
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
    setDupError("");
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

const LecturerForm = ({ onToggleModal, formObj }) => {
  const departments = useDepartmentContext();
  const { lecturers } = useLecturerContext();
  const dispatch = useLecturerDispatchContext();
  const {
    form,
    handleValueChange,
    formErrors: errors,
    validateForm,
    initForm,
    dupError,
    setDupError,
  } = useLecturerForm({ formObj });

  const onSubmit = (e) => {
    e.preventDefault();

    const alertObj = XPAlertObj();
    alertObj.icon = XPAlertIcon.byType(XPAlertType.Success);
    // Validate inputs
    if (!validateForm()) return false;
    const retVal = isLecturerDuplicate(lecturers, form);
    if (retVal.status) {
      setDupError(retVal.error);
      return false;
    }

    if (form.id > 0) {
      // Update Lecturer
      const actionObj = new ActionObject(
        XPCrudType.Update.toString(),
        form,
        "lecturers"
      );
      dispatch(actionObj);
      alertObj.title = "Lecturer Updated";
      alertObj.text = "Lecturer has been updated successfully";
      alertObj.callback = onToggleModal;
      XPInfoAlert(alertObj);
    } else {
      // Add Lecturer
      const actionObj = new ActionObject(
        XPCrudType.Add.toString(),
        form,
        "lecturers"
      );
      dispatch(actionObj);
      alertObj.title = "Lecturer Added";
      alertObj.text = "Lecturer has been added successfully";
      XPInfoAlert(alertObj);
    }
    initForm(formDef);
  };
  return (
    <Form className="container mb-3 mt-2">
      {dupError.length > 0 ? <ErrorAlert text={dupError} /> : null}
      <input
        type="hidden"
        id="fct_id"
        name="id"
        value={form.id}
        onChange={handleValueChange}
      />
      <div className="row">
        <Form.Group controlId="FirstName" className="mb-2 col-sm-6">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            name="firstName"
            type="text"
            placeholder="Enter First Name"
            value={form.firstName}
            onChange={handleValueChange}
            isInvalid={!!errors.firstName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="Surname" className="mb-2 col-sm-6">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            name="surname"
            type="text"
            placeholder="Enter Surname"
            value={form.surname}
            onChange={handleValueChange}
            isInvalid={!!errors.surname}
          />
          <Form.Control.Feedback type="invalid">
            {errors.surname}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      <Form.Group controlId="OtherName" className="mb-2">
        <Form.Label>Other Name</Form.Label>
        <Form.Control
          name="otherName"
          type="text"
          placeholder="Enter Other Name"
          value={form.otherName}
          onChange={handleValueChange}
          isInvalid={!!errors.otherName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.otherName}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="DepartmentId" className="mb-2">
        <Form.Label>Department</Form.Label>
        <Form.Control
          name="departmentId"
          as="select"
          value={form.departmentId}
          onChange={handleValueChange}
          isInvalid={!!errors.departmentId}>
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors.departmentId}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="StaffId" className="mb-2">
        <Form.Label>StaffId</Form.Label>
        <Form.Control
          name="staffId"
          type="text"
          placeholder="Enter StaffId"
          value={form.staffId}
          onChange={handleValueChange}
          isInvalid={!!errors.staffId}
        />
        <Form.Control.Feedback type="invalid">
          {errors.staffId}
        </Form.Control.Feedback>
      </Form.Group>
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
};

export default LecturerForm;
