import { memo } from "react";
import { Table } from "react-bootstrap";
import EditButton from "../../Common/EditButton";
import DeleteButton from "../../Common/DeleteButton";
import {
  XPAlertIcon,
  XPAlertType,
  XPCrudType,
} from "../../../Utils/Common/Enums/alertEnums";
import {
  XPAlertObj,
  XPConfirmAlert,
} from "../../../Utils/Common/Utils/xpAlerts";
import { ActionObject } from "../../../Utils/Common/Utils/xpReducer";
import {
  useDepartmentContext,
  useDepartmentDispatchContext,
  useFacultyContext,
} from "./DepartmentProvider";

const header = (
  <tr>
    <th>#</th>
    <th>Name</th>
    <th>Faculty</th>
    <th>Code</th>
    <th>UniqueId</th>
    <th>Status</th>
    <th>Actions</th>
  </tr>
);

const getTableData = ({
  departments,
  faculties,
  onRequestModal,
  onDeleteClick,
}) => {
  return departments.map((department, index) => {
    const faculty = faculties.find((f) => f.id === department.facultyId);
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{department.name}</td>
        <td>{faculty.name}</td>
        <td>{department.code}</td>
        <td>{department.uniqueId}</td>
        <td>{department.isActive ? "Active" : "In-Active"}</td>
        <td>
          <EditButton onClick={() => onRequestModal(department)} />{" "}
          <DeleteButton
            onClick={() => onDeleteClick(department, XPCrudType.Delete)}
          />
        </td>
      </tr>
    );
  });
};

const DepartmentTable = ({ onRequestModal }) => {
  const { departments, prevUpdateSuccess } = useDepartmentContext();
  const faculties = useFacultyContext();
  const dispatch = useDepartmentDispatchContext();

  const onDeleteClick = (department) => {
    const alertObj = XPAlertObj();
    alertObj.icon = XPAlertIcon.byType(XPAlertType.Warning);
    alertObj.message = `Department Item: <b>${department.name} </b> would be deleted! <br /> Are you sure?`;
    alertObj.title = "Delete Confirmation";
    alertObj.callback = processDelete.bind(null, department);
    XPConfirmAlert(alertObj);
  };

  const processDelete = (department) => {
    const actionObject = new ActionObject(
      XPCrudType.Delete.toString(),
      department,
      "departments"
    );
    dispatch(actionObject);
  };

  return (
    <Table striped bordered hover>
      {!prevUpdateSuccess && (
        <caption>
          <span className="text-danger">Duplicate entry detected</span>
        </caption>
      )}
      <thead>{header}</thead>
      <tbody>
        {getTableData({
          departments,
          faculties,
          onRequestModal,
          onDeleteClick,
        })}
      </tbody>
    </Table>
  );
};

export default memo(DepartmentTable);
