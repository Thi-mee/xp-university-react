import DepartmentProvider from "../DepartmentItems/DepartmentProvider";
import DepartmentGrid from "../DepartmentItems/DepartmentGrid";

function Department() {
  return (
    <DepartmentProvider>
      <DepartmentGrid />
    </DepartmentProvider>
  );
}

export default Department;
