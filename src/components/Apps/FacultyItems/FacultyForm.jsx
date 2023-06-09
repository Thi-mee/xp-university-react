import { useState, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import ErrorAlert from "../../Common/ErrorAlert";
import { XPAlertObj, XPInfoAlert } from "../../../Utils/Common/Utils/xpAlerts";
import {
  XPAlertIcon,
  XPAlertType,
  XPCrudType,
} from "../../../Utils/Common/Enums/alertEnums";
import { useFacultyContext, useFacultyDispatchContext } from "./FacultyProvider";
import { ActionObject, isDuplicate } from "../../../Utils/Common/Utils/xpReducer";


export const formDef = {
  id: 0,
  name: "",
  code: "",
  uniqueId: "",
  isActive: false,
};

export const useFacultyForm = ({ formObj }) => {
  const [form, setForm] = useState(formObj);
  const [formErrors, setFormErrors] = useState({});
  const [dupError, setDupError] = useState("");

  const handleValueChange = useCallback((e) => {
    const { name, value } = e.target;
    if (e.target.type === "checkbox") {
      setForm({ ...form, [name]: e.target.checked });
    } else {
      setForm({ ...form, [name]: value });
    }

    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  }, [form, formErrors]);

  const validateForm = () => {
    const errors = {};

    // Handle faculty Name
    if (!form.name || form.name.length === "") {
      errors.name = "Kindly supply Faculty name";
    } else if (form.name.length < 3) {
      errors.name = "Faculty name must be at least 3 characters";
    } else if (form.name.length > 50) {
      errors.name = "Faculty name must be less than 50 characters";
    }
    // Handle faculty Code
    if (!form.code || form.code.length === "") {
      errors.code = "Kindly supply Faculty code";
    } else if (form.code.length < 2) {
      errors.code = "Faculty code must be at least 2 characters";
    } else if (form.code.length > 10) {
      errors.code = "Faculty code must be less than 10 characters";
    }
    // Handle faculty UniqueId
    if (!form.uniqueId || form.uniqueId.length === "") {
      errors.uniqueId = "Kindly supply Faculty UniqueId";
    } else if (form.uniqueId.length < 4) {
      errors.uniqueId = "Faculty UniqueId must be at least 4 characters";
    } else if (form.uniqueId.length > 10) {
      errors.uniqueId = "Faculty UniqueId must be less than 10 characters";
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
    setDupError
  };
};

function FacultyForm({ onToggleModal, formObj }) {
  const {faculties} = useFacultyContext()
  const dispatch = useFacultyDispatchContext()
  const {
    form,
    handleValueChange,
    formErrors: errors,
    validateForm,
    initForm,
    dupError,
    setDupError
  } = useFacultyForm({ formObj });


  const onSubmitForm = (e) => {
    e.preventDefault();
    const alertObj = XPAlertObj();
    alertObj.icon = XPAlertIcon.byType(XPAlertType.Success);

    //ValidateInputs
    if (!validateForm()) return false;
    const retVal = isDuplicate(faculties, form);
    if (retVal.status) {
      setDupError(retVal.error);
      return false;
    }

    if (form.id > 0) {
      //Update
      const actionObject = new ActionObject(XPCrudType.Update.toString(), form, "faculties")
      dispatch(actionObject)
      alertObj.message = "Faculty Was Updated Suuccessfully";
      alertObj.title = "Faculty Updated";
      alertObj.callback = onToggleModal;
      XPInfoAlert(alertObj);
    } else {
      //Add
      const actionObject = new ActionObject(XPCrudType.Add.toString(), form, "faculties")
      dispatch(actionObject);
      alertObj.message = "Faculty Was Added Suuccessfully";
      alertObj.title = "Faculty Added";
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
      <Form.Group controlId="Name">
        <Form.Label>Faculty Name</Form.Label>
        <Form.Control
          name="name"
          type="text"
          placeholder="Enter Faculty Name"
          value={form.name}
          onChange={handleValueChange}
          isInvalid={!!errors["name"]}
        />
        <Form.Control.Feedback type="invalid">
          {errors["name"]}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="Code">
        <Form.Label>Faculty Code</Form.Label>
        <Form.Control
          name="code"
          type="text"
          placeholder="Enter Faculty Code"
          value={form.code}
          onChange={handleValueChange}
          isInvalid={!!errors.code}
        />
        <Form.Control.Feedback type="invalid">
          {errors.code}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="UniqueId">
        <Form.Label>Faculty UniqueId</Form.Label>
        <Form.Control
          name="uniqueId"
          type="text"
          placeholder="Enter Faculty UniqueId"
          value={form.uniqueId}
          onChange={handleValueChange}
          isInvalid={!!errors.uniqueId}
        />
        <Form.Control.Feedback type="invalid">
          {errors.uniqueId}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Check
        name="isActive"
        type="checkbox"
        label="Active"
        checked={form.isActive}
        onChange={handleValueChange}
      />
      <Button variant="primary" onClick={onSubmitForm}>
        Save Changes
      </Button>
    </Form>
  );
}



export default FacultyForm;



