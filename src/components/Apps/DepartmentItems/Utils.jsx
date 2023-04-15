import EditButton from "../../Common/EditButton";
import DeleteButton from "../../Common/DeleteButton";
import { XPCrudType } from "../../../Utils/Common/Enums/alertEnums";

export const formDef = {
  id: 0,
  name: "",
  facultyId: 0,
  code: "",
  uniqueId: "",
  isActive: false,
};

export const getGridHeader = () => {
  return (
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
};

export const getGridData = ({
  departments,
  faculties,
  onRequestUpdate,
  onDeptChanged,
}) => {
  return departments.map((department, index) => {
    const faculty = faculties.find((f) => f.id === department.facultyId);
    console.log(faculty.name);
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{department.name}</td>
        <td>{faculty.name}</td>
        <td>{department.code}</td>
        <td>{department.uniqueId}</td>
        <td>{department.isActive ? "Active" : "In-Active"}</td>
        <td>
          <EditButton onClick={() => onRequestUpdate(department)} />
          {"  "}
          <DeleteButton
            onClick={() => onDeptChanged(department, XPCrudType.Delete)}
          />
        </td>
      </tr>
    );
  });
};
