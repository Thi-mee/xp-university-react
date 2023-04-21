import { useState, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import ErrorAlert from "../../Common/ErrorAlert";
import {
  useCourseContext,
  useCourseDispatchContext,
  useDepartmentContext,
} from "./CourseProvider";
import {
  ActionObject,
  isDuplicate,
} from "../../../Utils/Common/Utils/xpReducer";
import {
  XPAlertIcon,
  XPAlertType,
  XPCrudType,
} from "../../../Utils/Common/Enums/alertEnums";
import { XPAlertObj, XPInfoAlert } from "../../../Utils/Common/Utils/xpAlerts";

export const formDef = {
  id: 0,
  name: "",
  departmentId: 0,
  code: "",
  uniqueId: "",
  units: 0,
  semester: 0,
  level: 0,
  isActive: false,
};

export const useCourseForm = ({ formObj }) => {
  const [form, setForm] = useState(formObj);
  const [formErrors, setFormErrors] = useState({});
  const [dupError, setDupError] = useState("");

  const handleValueChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      if (e.target.type === "checkbox") {
        setForm({ ...form, [name]: e.target.checked });
      } else if (e.target.type === "select-one") {
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

    // Handle Course Name
    if (!form.name || form.name.length === "") {
      errors.name = "Kindly supply Course name";
    } else if (form.name.length < 3) {
      errors.name = "Course name must be at least 3 characters";
    } else if (form.name.length > 50) {
      errors.name = "Course name must be less than 50 characters";
    }

    // Handle Department Select
    if (!form.departmentId || form.departmentId.length === "") {
      errors.departmentId = "Kindly select a Department";
    }

    // Handle Course Code
    if (!form.code || form.code.length === "") {
      errors.code = "Kindly supply Course code";
    } else if (form.code.length < 2) {
      errors.code = "Course code must be at least 2 characters";
    } else if (form.code.length > 10) {
      errors.code = "Course code must be less than 10 characters";
    }

    // Handle Course UniqueId
    if (!form.uniqueId || form.uniqueId.length === "") {
      errors.uniqueId = "Kindly supply Course UniqueId";
    } else if (form.uniqueId.length < 4) {
      errors.uniqueId = "Course UniqueId must be at least 4 characters";
    } else if (form.uniqueId.length > 10) {
      errors.uniqueId = "Course UniqueId must be less than 10 characters";
    }

    // Handle Semester Select
    if (!form.semester || form.semester.length === "") {
      errors.semester = "Kindly select a Semester";
    }

    // Handle Level Select
    if (!form.level || form.level.length === "") {
      errors.level = "Kindly select a Level";
    }

    // Handle Course Units
    if (!form.units || form.units === 0) {
      errors.units = "Kindly supply Course UniqueId";
    } else if (form.units < 1) {
      errors.units = "Invalid Course Units";
    } else if (form.units > 5) {
      errors.units = "Course units cannot be more than 5";
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

const semesters = [
  { id: 1, name: "First Semester" },
  { id: 2, name: "Second Semester" },
];
const levels = [
  { id: 1, name: "100 Level" },
  { id: 2, name: "200 Level" },
  { id: 3, name: "300 Level" },
  { id: 4, name: "400 Level" },
  { id: 5, name: "500 Level" },
  { id: 6, name: "600 Level" },
];

const CourseForm = ({ onToggleModal, formObj }) => {
  const departments = useDepartmentContext();
  const { courses } = useCourseContext();
  const dispatch = useCourseDispatchContext();
  const {
    form,
    handleValueChange,
    formErrors: errors,
    validateForm,
    initForm,
    dupError,
    setDupError,
  } = useCourseForm({ formObj });

  const onSubmit = (e) => {
    e.preventDefault();

    const alertObj = XPAlertObj();
    alertObj.icon = XPAlertIcon.byType(XPAlertType.Success);
    // Validate inputs
    if (!validateForm()) return false;
    const retVal = isDuplicate(courses, form);
    if (retVal.status) {
      setDupError(retVal.error);
      return false;
    }

    if (form.id > 0) {
      // Update Course
      const actionObj = new ActionObject(
        XPCrudType.Update.toString(),
        form,
        "courses"
      );
      dispatch(actionObj);
      alertObj.title = "Course Updated";
      alertObj.text = "Course has been updated successfully";
      alertObj.callback = onToggleModal;
      XPInfoAlert(alertObj);
    } else {
      // Add Course
      const actionObj = new ActionObject(
        XPCrudType.Add.toString(),
        form,
        "courses"
      );
      dispatch(actionObj);
      alertObj.title = "Course Added";
      alertObj.text = "Course has been added successfully";
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
      <Form.Group controlId="Name" className="mb-2">
        <Form.Label>Course Name</Form.Label>
        <Form.Control
          name="name"
          type="text"
          placeholder="Enter Course Name"
          value={form.name}
          onChange={handleValueChange}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name}
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
      <div className="row">
        <Form.Group controlId="Code" className="col-sm-6 mb-2">
          <Form.Label>Course Code</Form.Label>
          <Form.Control
            name="code"
            type="text"
            placeholder="Enter Course Code"
            value={form.code}
            onChange={handleValueChange}
            isInvalid={!!errors.code}
          />
          <Form.Control.Feedback type="invalid">
            {errors.code}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="UniqueId" className="col-sm-6 mb-2">
          <Form.Label>Course UniqueId</Form.Label>
          <Form.Control
            name="uniqueId"
            type="text"
            placeholder="Enter Course UniqueId"
            value={form.uniqueId}
            onChange={handleValueChange}
            isInvalid={!!errors.uniqueId}
          />
          <Form.Control.Feedback type="invalid">
            {errors.uniqueId}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      <div className="row">
        <Form.Group controlId="Semester" className="col-sm-5 mb-2">
          <Form.Label>Semester</Form.Label>
          <Form.Control
            name="semester"
            as="select"
            value={form.semester}
            onChange={handleValueChange}
            isInvalid={!!errors.semester}>
            <option value="">Select Semester</option>
            {semesters.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.semester}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="Level" className="col-sm-4 mb-2">
          <Form.Label>Level</Form.Label>
          <Form.Control
            name="level"
            as="select"
            value={form.level}
            onChange={handleValueChange}
            isInvalid={!!errors.level}>
            <option value="">Select Level</option>
            {levels.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.level}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="Units" className="col-sm-3 mb-2">
          <Form.Label>Units</Form.Label>
          <Form.Control
            name="units"
            type="number"
            placeholder="Enter Units"
            value={form.units}
            onChange={handleValueChange}
            isInvalid={!!errors.units}
          />
          <Form.Control.Feedback type="invalid">
            {errors.units}
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
};

export default CourseForm;
