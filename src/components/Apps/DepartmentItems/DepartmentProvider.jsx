import { createContext, useContext, useReducer } from "react";
import { getAllDepartments } from "../../../services/Apps/DepartmentService";
import { getAllFaculties } from "../../../services/Apps/FacultyService";
import { reducer } from "../../../Utils/Common/Utils/xpReducer";

export const FacultyContext = createContext(null);
export const DepartmentContext = createContext(null);
export const DepartmentDispatchContext = createContext(null);

const DepartmentProvider = ({ children }) => {
  const [departmentDT, dispatch] = useReducer(reducer, {
    departments: getAllDepartments(),
    prevUpdateSuccess: true,
  });

  return (
    <DepartmentContext.Provider value={departmentDT}>
      <DepartmentDispatchContext.Provider value={dispatch}>
        <FacultyContext.Provider value={getAllFaculties()}>
          {children}
        </FacultyContext.Provider>
      </DepartmentDispatchContext.Provider>
    </DepartmentContext.Provider>
  );
};

export const useDepartmentContext = () => useContext(DepartmentContext);

export const useDepartmentDispatchContext = () =>
  useContext(DepartmentDispatchContext);

export const useFacultyContext = () => useContext(FacultyContext);

export default DepartmentProvider;
