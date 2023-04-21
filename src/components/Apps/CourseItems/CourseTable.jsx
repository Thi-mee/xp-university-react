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
  useCourseContext,
  useCourseDispatchContext,
  useDepartmentContext,
} from "./CourseProvider";

const header = (
  <tr>
    <th>#</th>
    <th>Name</th>
    <th>Department</th>
    <th>Code</th>
    <th>UniqueId</th>
    <th>Status</th>
    <th>Actions</th>
  </tr>
);

const getTableData = ({
  courses,
  departments,
  onRequestModal,
  onDeleteClick,
}) => {
  return courses.map((course, index) => {
    const department = departments.find((d) => d.id === course.departmentId);
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{course.name}</td>
        <td>{department.name}</td>
        <td>{course.code}</td>
        <td>{course.uniqueId}</td>
        <td>{course.isActive ? "Active" : "In-Active"}</td>
        <td>
          <EditButton onClick={() => onRequestModal(course)} />{" "}
          <DeleteButton
            onClick={() => onDeleteClick(course, XPCrudType.Delete)}
          />
        </td>
      </tr>
    );
  });
};

const CourseTable = ({ onRequestModal }) => {
  const { courses, prevUpdateSuccess } = useCourseContext();
  const departments = useDepartmentContext();
  const dispatch = useCourseDispatchContext();

  const onDeleteClick = (course, crudType) => {
    const alertObj = XPAlertObj();
    alertObj.title = "Delete Confirmation";
    alertObj.message = `Are you sure you want to delete ${course.name}?`;
    alertObj.icon = XPAlertIcon.byType(XPAlertType.Warning);
    alertObj.callback = processDelete.bind(null, course);
    XPConfirmAlert(alertObj);
  };

  const processDelete = (course) => {
    const actionObj = new ActionObject(XPCrudType.Delete.toString(), course, "courses");
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
          courses,
          departments,
          onRequestModal,
          onDeleteClick,
        })}
      </tbody>
    </Table>
  );
};

export default CourseTable;
