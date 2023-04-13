import EditButton from "../../Common/EditButton";
import DeleteButton from "../../Common/DeleteButton";
import { XPCrudType } from "../../../Utils/Common/Enums/alertEnums";

export const formDef = {
  id: 0,
  name: "",
  code: "",
  uniqueId: "",
  isActive: true,
};


export const getGridHeader = () => {
  return (
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Code</th>
      <th>UniqueId</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  );
};

export const getGridData = ({ allFaculties, onRequestUpdate, onFacultyChanged }) => {
  return allFaculties.map((faculty, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{faculty.name}</td>
      <td>{faculty.code}</td>
      <td>{faculty.uniqueId}</td>
      <td>{faculty.isActive ? "Active" : "In-Active"}</td>
      <td>
        <EditButton onClick={() => onRequestUpdate(faculty)} />
        <DeleteButton onClick={() => onFacultyChanged(faculty, XPCrudType.Delete)} />
      </td>
    </tr>
  ));
};
