import { useState, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import ErrorAlert from "../../Common/ErrorAlert";
import {
  useCourseOfStudyContext,
  useCourseOfStudyDispatchContext,
  useDepartmentContext,
} from "./CourseOfStudyProvider";
import {
  ActionObject,
  isCourseOfStudyDuplicate,
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
  shortName: "",
  departmentId: 0,
  uniqueId: "",
  award: "",
  duration: 0,
  requiredCreditUnits: 0,
  advisor: "",
  isActive: false,
};

export const useCourseOfStudyForm = ({ formObj }) => {
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

    // Handle Course of Study Name
    if (!form.name || form.name.length === "") {
      errors.name = "Kindly supply Course of Study name";
    } else if (form.name.length < 3) {
      errors.name = "Course of study name should be at least 3 characters";
    } else if (form.name.length > 50) {
      errors.name = "Course of study name should be less than 30 characters";
    }
    // Handle Course of Study Short Name
    if (!form.shortName || form.shortName.length === "") {
      errors.shortName = "Kindly supply Course of Study shortName";
    } else if (form.shortName.length < 3) {
      errors.shortName =
        "Course of study shortName should be at least 3 characters";
    } else if (form.shortName.length > 10) {
      errors.shortName =
        "Course of study shortName should be less than 30 characters";
    }
    // Handle Department Select
    if (!form.departmentId || form.departmentId.length === "") {
      errors.departmentId = "Kindly select a Department";
    }
    // Handle Course of Study UniqueId
    if (!form.uniqueId || form.uniqueId.length === "") {
      errors.uniqueId = "Kindly supply UniqueId";
    } else if (form.uniqueId.length < 3) {
      errors.uniqueId = "UniqueId must be at least 3 characters";
    } else if (form.uniqueId.length > 10) {
      errors.uniqueId = "UniqueId should not be greater 30 characters";
    }
    // Handle Course of Study Award
    if (!form.award || form.award.length === "") {
      errors.award = "Kindly supply Course of Study award";
    } else if (form.award.length < 10) {
      errors.award = "Course of study award should be at least 10 characters";
    } else if (form.award.length > 100) {
      errors.award =
        "Course of study award shouldnot be more that 100 characters";
    }
    // Handle Course of Study Duration
    if (!form.duration || form.duration === 0) {
      errors.duration = "Kindly supply Course of Study duration";
    } else if (form.duration < 1) {
      errors.duration = "Course of study duration should be at least 1 year";
    } else if (form.duration > 7) {
      errors.duration =
        "Course of study duration should not be more than 7 years";
    }
    // Handle Course of Study Required Credit Units
    if (!form.requiredCreditUnits || form.requiredCreditUnits === 0) {
      errors.requiredCreditUnits =
        "Kindly supply Course of Study requiredCreditUnits";
    } else if (form.requiredCreditUnits < 1) {
      errors.requiredCreditUnits =
        "Course of study requiredCreditUnits should be at least 1 unit";
    } else if (form.requiredCreditUnits > 200) {
      errors.requiredCreditUnits =
        "Course of study requiredCreditUnits should not be more than 200 units";
    }
    // Handle Course of Study Advisor
    if (!form.advisor || form.advisor.length === "") {
      errors.advisor = "Kindly supply Course of Study advisor";
    } else if (form.advisor.length < 3) {
      errors.advisor =
        "Course of study advisor should be at least 3 characters";
    } else if (form.advisor.length > 50) {
      errors.advisor =
        "Course of study advisor should not be more than 50 characters";
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

const CourseOfStudyForm = ({ onToggleModal, formObj }) => {
  const departments = useDepartmentContext();
  const { coursesOfStudy } = useCourseOfStudyContext();
  const dispatch = useCourseOfStudyDispatchContext();
  const {
    form,
    handleValueChange,
    formErrors: errors,
    validateForm,
    initForm,
    dupError,
    setDupError,
  } = useCourseOfStudyForm({ formObj });

  const onSubmit = (e) => {
    e.preventDefault();

    const alertObj = XPAlertObj();
    alertObj.icon = XPAlertIcon.byType(XPAlertType.Success);
    // Validate inputs
    if (!validateForm()) return false;
    const retVal = isCourseOfStudyDuplicate(coursesOfStudy, form);
    if (retVal.status) {
      setDupError(retVal.error);
      return false;
    }

    if (form.id > 0) {
      // Update Course of Study
      const actionObj = new ActionObject(
        XPCrudType.Update.toString(),
        form,
        "coursesOfStudy"
      );
      dispatch(actionObj);
      alertObj.title = "Course of Study Updated";
      alertObj.text = "Course of Study has been updated successfully";
      alertObj.callback = onToggleModal;
      XPInfoAlert(alertObj);
    } else {
      // Add Course of Study
      const actionObj = new ActionObject(
        XPCrudType.Add.toString(),
        form,
        "coursesOfStudy"
      );
      dispatch(actionObj);
      alertObj.title = "Course of Study Added";
      alertObj.text = "Course of Study has been added successfully";
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
        <Form.Label>Course of Study Name</Form.Label>
        <Form.Control
          name="name"
          type="text"
          placeholder="Enter Course of Study Name"
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
        <Form.Group controlId="ShortName" className="col-sm-6 mb-2">
          <Form.Label>Short Name</Form.Label>
          <Form.Control
            name="shortName"
            type="text"
            placeholder="Enter Short Name"
            value={form.shortName}
            onChange={handleValueChange}
            isInvalid={!!errors.shortName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.shortName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="UniqueId" className="col-sm-6 mb-2">
          <Form.Label>UniqueId</Form.Label>
          <Form.Control
            name="uniqueId"
            type="text"
            placeholder="Enter UniqueId"
            value={form.uniqueId}
            onChange={handleValueChange}
            isInvalid={!!errors.uniqueId}
          />
          <Form.Control.Feedback type="invalid">
            {errors.uniqueId}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      <Form.Group controlId="Award" className="mb-2">
        <Form.Label>Award</Form.Label>
        <Form.Control
          name="award"
          as="textarea"
          rows={1}
          placeholder="Enter Award"
          value={form.award}
          onChange={handleValueChange}
          isInvalid={!!errors.award}
        />
        <Form.Control.Feedback type="invalid">
          {errors.award}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="row">
        <Form.Group controlId="Duration" className="col-sm-6 mb-2">
          <Form.Label>Duration</Form.Label>
          <Form.Control
            name="duration"
            type="number"
            placeholder="Enter Duration"
            value={form.duration}
            onChange={handleValueChange}
            isInvalid={!!errors.duration}
          />
          <Form.Control.Feedback type="invalid">
            {errors.duration}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="RequiredCreditUnits" className="col-sm-6 mb-2">
          <Form.Label>Required Credit Units</Form.Label>
          <Form.Control
            name="requiredCreditUnits"
            type="number"
            placeholder="Enter Required Credit Units"
            value={form.requiredCreditUnits}
            onChange={handleValueChange}
            isInvalid={!!errors.requiredCreditUnits}
          />
          <Form.Control.Feedback type="invalid">
            {errors.requiredCreditUnits}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      <Form.Group controlId="Advisor" className="mb-2">
        <Form.Label>Advisor</Form.Label>
        <Form.Control
          name="advisor"
          type="text"
          placeholder="Enter Advisor"
          value={form.advisor}
          onChange={handleValueChange}
          isInvalid={!!errors.advisor}
        />
        <Form.Control.Feedback type="invalid">
          {errors.advisor}
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

export default CourseOfStudyForm;
