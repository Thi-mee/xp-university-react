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
  useCourseOfStudyContext,
  useCourseOfStudyDispatchContext,
  useDepartmentContext,
} from "./CourseOfStudyProvider";

const header = (
  <tr>
    <th>#</th>
    <th>Name</th>
    <th>Short name</th>
    <th>Department</th>
    <th>UniqueId</th>
    <th>Status</th>
    <th>Actions</th>
  </tr>
);

const getTableData = ({
  coursesOfStudy,
  departments,
  onRequestModal,
  onDeleteClick,
}) => {
  return coursesOfStudy.map((courseOfStudy, index) => {
    const department = departments.find(
      (d) => d.id === courseOfStudy.departmentId
    );
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{courseOfStudy.name}</td>
        <td>{courseOfStudy.shortName}</td>
        <td>{department.name}</td>
        <td>{courseOfStudy.uniqueId}</td>
        <td>{courseOfStudy.isActive ? "Active" : "In-Active"}</td>
        <td>
          <EditButton onClick={() => onRequestModal(courseOfStudy)} />{" "}
          <DeleteButton
            onClick={() => onDeleteClick(courseOfStudy, XPCrudType.Delete)}
          />
        </td>
      </tr>
    );
  });
};

const CourseOfStudyTable = ({ onRequestModal }) => {
  const { coursesOfStudy, prevUpdateSuccess } = useCourseOfStudyContext();
  const departments = useDepartmentContext();
  const dispatch = useCourseOfStudyDispatchContext();

  const onDeleteClick = (courseOfStudy, crudType) => {
    const alertObj = XPAlertObj();
    alertObj.title = "Delete Confirmation";
    alertObj.message = `Are you sure you want to delete ${courseOfStudy.name}?`;
    alertObj.icon = XPAlertIcon.byType(XPAlertType.Warning);
    alertObj.callback = processDelete.bind(null, courseOfStudy);
    XPConfirmAlert(alertObj);
  };

  const processDelete = (courseOfStudy) => {
    const actionObj = new ActionObject(
      XPCrudType.Delete.toString(),
      courseOfStudy,
      "coursesOfStudy"
    );
    dispatch(actionObj);
  };

  return (
    <Table striped bordered hover size="big">
      {!prevUpdateSuccess && (
        <caption>
          <span className="text-danger">Duplicate entry detected</span>
        </caption>
      )}
      <thead>{header}</thead>
      <tbody>
        {getTableData({
          coursesOfStudy,
          departments,
          onRequestModal,
          onDeleteClick,
        })}
      </tbody>
    </Table>
  );
};

export default CourseOfStudyTable;
