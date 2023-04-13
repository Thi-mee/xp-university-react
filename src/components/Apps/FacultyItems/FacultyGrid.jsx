import { useState } from "react";
import AddButton from "../../Common/AddButton";
import XPModal, { useXPModal } from "../../Common/XPModal";
import { Table } from "react-bootstrap";
import {
  getAllFaculties,
  updateFaculties,
} from "../../../services/Apps/FacultyService";
import { getGridData, getGridHeader, formDef } from "./Utils";
import FacultyForm, { useXPForm } from "./FacultyForm";
import {
  XPAlertObj,
  XPConfirmAlert,
  XPInfoAlert,
} from "../../../Utils/Common/Utils/xpAlerts";
import {
  XPAlertIcon,
  XPAlertType,
  XPCrudType,
} from "../../../Utils/Common/Enums/alertEnums";

function FacultyGrid() {
  const [allFaculties, setAllFaculties] = useState(getAllFaculties);
  const [formTitle, setFormTitle] = useState("");
  const { isShown, toggle: onToggleModal } = useXPModal();
  const {
    form,
    handleValueChange,
    errors,
    initForm,
    validateForm,
    setFormErrors,
  } = useXPForm({ formObj: formDef });

  const onSubmitForm = (e) => {
    e.preventDefault();
    const alertObj = XPAlertObj();
    alertObj.icon = XPAlertIcon.byType(XPAlertType.Success);

    //ValidateInputs
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return false;
    }

    if (form.id > 0) {
      //Update
      onFacultyChanged(form, XPCrudType.Update);
      alertObj.message = "Faculty Was Updated Suuccessfully";
      alertObj.title = "Faculty Updated";
      alertObj.callback = onToggleModal;
      XPInfoAlert(alertObj);
    } else {
      //Add
      form.stat_id = allFaculties.length + 1;
      onFacultyChanged(form, XPCrudType.Add);
      alertObj.message = "Faculty Was Added Suuccessfully";
      alertObj.title = "Faculty Added";
      XPInfoAlert(alertObj);
    }
    initForm(formDef);
  };

  const onFacultyChanged = (faculty, crudType) => {
    if (crudType === XPCrudType.Delete) {
      // Confirm Delete
      const alertObj = XPAlertObj();
      alertObj.icon = XPAlertIcon.byType(XPAlertType.Warning);
      alertObj.message = `Faculty Item: <b>${faculty.name} </b> would be deleted! <br /> Are you sure?`;
      alertObj.title = "Delete Confirmation";
      alertObj.callback = processItem.bind(null, faculty, crudType);
      XPConfirmAlert(alertObj);
      return false;
    }
    processItem(faculty, crudType);
  };

  const processItem = (faculty, crudType) => {
    updateFaculties(faculty, crudType);
    setAllFaculties(getAllFaculties);
  };

  const onRequestAdd = () => {
    //initialize form
    initForm(formDef);
    setFormTitle("Add Faculty");
    //show modal
    onToggleModal();
  };

  const onRequestUpdate = (faculty) => {
    //initialize form
    initForm(faculty);
    setFormTitle("Update Faculty");
    //show modal
    onToggleModal();
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h1 className="h3 mb-0 text-gray-800">Faculties</h1>
        <AddButton onClick={onRequestAdd}>New Faculty</AddButton>
      </div>
      <hr />
      {/* {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} */}
      <Table striped bordered hover>
        <thead>{getGridHeader()}</thead>
        <tbody>
          {getGridData({ allFaculties, onRequestUpdate, onFacultyChanged })}
        </tbody>
      </Table>
      <XPModal
        isShown={isShown}
        title={formTitle}
        onClose={onToggleModal}
        onSave={onSubmitForm}
        content={
          <FacultyForm
            form={form}
            handleValueChange={handleValueChange}
            errors={errors}
          />
        }
      />
    </>
  );
}

export default FacultyGrid;
