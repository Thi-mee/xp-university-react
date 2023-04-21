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
  useLecturerContext,
  useLecturerDispatchContext,
  useDepartmentContext,
} from "./LecturerProvider";

const header = (
  <tr>
    <th>#</th>
    <th>Surname</th>
    <th>First Name</th>
    <th>Department</th>
    <th>Staff Id</th>
    <th>Status</th>
    <th>Actions</th>
  </tr>
);

const getTableData = ({
  lecturers,
  departments,
  onRequestModal,
  onDeleteClick,
}) => {
  return lecturers.map((lecturer, index) => {
    const department = departments.find((d) => d.id === lecturer.departmentId);
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{lecturer.surname}</td>
        <td>{lecturer.firstName}</td>
        <td>{department.name}</td>
        <td>{lecturer.staffId}</td>
        <td>{lecturer.isActive ? "Active" : "In-Active"}</td>
        <td>
          <EditButton onClick={() => onRequestModal(lecturer)} />{" "}
          <DeleteButton
            onClick={() => onDeleteClick(lecturer, XPCrudType.Delete)}
          />
        </td>
      </tr>
    );
  });
};

const LecturerTable = ({ onRequestModal }) => {
  const { lecturers, prevUpdateSuccess } = useLecturerContext();
  const departments = useDepartmentContext();
  const dispatch = useLecturerDispatchContext();

  const onDeleteClick = (lecturer, crudType) => {
    const alertObj = XPAlertObj();
    alertObj.title = "Delete Confirmation";
    alertObj.message = `Are you sure you want to delete ${lecturer.name}?`;
    alertObj.icon = XPAlertIcon.byType(XPAlertType.Warning);
    alertObj.callback = processDelete.bind(null, lecturer);
    XPConfirmAlert(alertObj);
  };

  const processDelete = (lecturer) => {
    const actionObj = new ActionObject(
      XPCrudType.Delete.toString(),
      lecturer,
      "lecturers"
    );
    dispatch(actionObj);
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
          lecturers,
          departments,
          onRequestModal,
          onDeleteClick,
        })}
      </tbody>
    </Table>
  );
};

export default LecturerTable;
