import { useState } from "react";
import AddButton from "../../Common/AddButton";
import XPModal, { useXPModal } from "../../Common/XPModal";
import { Table } from "react-bootstrap";
import { getAllFaculties } from "../../../services/Apps/FacultyService";
import {
  getAllDepartments,
  updateDepartments,
} from "../../../services/Apps/DepartmentService";
import { getGridData, getGridHeader, formDef } from "./Utils";
import DepartmentForm, { useXPForm } from "./DepartmentForm";
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

const faculties = getAllFaculties();

function DepartmentGrid() {
  const [departments, setDepartments] = useState(getAllDepartments);
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
      onDeptChanged(form, XPCrudType.Update);
      alertObj.message = "Department Was Updated Suuccessfully";
      alertObj.title = "Department Updated";
      alertObj.callback = onToggleModal;
      XPInfoAlert(alertObj);
    } else {
      //Add
      form.stat_id = departments.length + 1;
      onDeptChanged(form, XPCrudType.Add);
      alertObj.message = "Department Was Added Suuccessfully";
      alertObj.title = "Department Added";
      XPInfoAlert(alertObj);
    }
    initForm(formDef);
  };

  const onDeptChanged = (dept, crudType) => {
    if (crudType === XPCrudType.Delete) {
      // Confirm Delete
      const alertObj = XPAlertObj();
      alertObj.icon = XPAlertIcon.byType(XPAlertType.Warning);
      alertObj.message = `Department Item: <b>${dept.name} </b> would be deleted! <br /> Are you sure?`;
      alertObj.title = "Delete Confirmation";
      alertObj.callback = processItem.bind(null, dept, crudType);
      XPConfirmAlert(alertObj);
      return false;
    }
    processItem(dept, crudType);
  };

  const processItem = (dept, crudType) => {
    updateDepartments(dept, crudType);
    setDepartments(getAllDepartments);
  };

  const onRequestAdd = () => {
    //initialize form
    initForm(formDef);
    setFormTitle("Add Department");
    //show modal
    onToggleModal();
  };

  const onRequestUpdate = (faculty) => {
    //initialize form
    initForm(faculty);
    setFormTitle("Update Department");
    //show modal
    onToggleModal();
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-2">
        <h1 className="h3 mb-0 text-gray-800">Faculties</h1>
        <AddButton onClick={onRequestAdd}>New Faculty</AddButton>
      </div>
      <Table striped bordered hover>
        <thead>{getGridHeader()}</thead>
        <tbody>
          {getGridData({ departments, faculties, onRequestUpdate, onDeptChanged })}
        </tbody>
      </Table>
      <XPModal
        isShown={isShown}
        title={formTitle}
        onClose={onToggleModal}
        onSave={onSubmitForm}
        content={
          <DepartmentForm
            form={form}
            handleValueChange={handleValueChange}
            errors={errors}
            faculties={faculties}
          />
        }
      />
    </>
  );
}

export default DepartmentGrid;
