import { useContext } from "react";
import {
  getAllFaculties,
  updateFaculties,
} from "../../../services/Apps/FacultyService";
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
import { FacultyContext } from "../pages/Faculty";

const header = (
  <tr>
    <th>#</th>
    <th>Name</th>
    <th>Code</th>
    <th>UniqueId</th>
    <th>Status</th>
    <th>Actions</th>
  </tr>
);

const getTableData = ({ faculties, onRequestModal, onDeleteClick }) => {
  return faculties.map((faculty, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{faculty.name}</td>
      <td>{faculty.code}</td>
      <td>{faculty.uniqueId}</td>
      <td>{faculty.isActive ? "Active" : "In-Active"}</td>
      <td>
        <EditButton onClick={() => onRequestModal(faculty)} />{" "}
        <DeleteButton
          onClick={() => onDeleteClick(faculty, XPCrudType.Delete)}
        />
      </td>
    </tr>
  ));
};

const FacultyTable = ({ onRequestModal }) => {
  const [ faculties, setFaculties ] = useContext(FacultyContext);

  const onDeleteClick = (faculty) => {
    const alertObj = XPAlertObj();
    alertObj.icon = XPAlertIcon.byType(XPAlertType.Warning);
    alertObj.message = `Faculty Item: <b>${faculty.name} </b> would be deleted! <br /> Are you sure?`;
    alertObj.title = "Delete Confirmation";
    alertObj.callback = processDelete.bind(null, faculty);
    XPConfirmAlert(alertObj);
  };

  const processDelete = (faculty) => {
    updateFaculties(faculty, XPCrudType.Delete);
    setFaculties(getAllFaculties());
  };

  return (
    <Table striped bordered hover>
      <thead>{header}</thead>
      <tbody>
        {console.log("faculties Table rendered")}
        {getTableData({ faculties, onRequestModal, onDeleteClick })}
      </tbody>
    </Table>
  );
};

export default FacultyTable;
