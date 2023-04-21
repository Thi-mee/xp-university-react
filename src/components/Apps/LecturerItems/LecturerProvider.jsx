import { useContext, createContext, useReducer } from "react";
import { reducer } from "../../../Utils/Common/Utils/xpReducer";
import { getLecturers } from "../../../services/Apps/LecturerService";
import { getAllDepartments } from "../../../services/Apps/DepartmentService";

const LecturerContext = createContext(null);
const DepartmentContext = createContext(null);
const LecturerDispatchContext = createContext(null);

function LecturerProvider({ children }) {
  const [lecturerDT, dispatch] = useReducer(reducer, {
    lecturers: getLecturers(),
    prevUpdateSuccess: true,
  });
  return (
    <LecturerContext.Provider value={lecturerDT}>
      <LecturerDispatchContext.Provider value={dispatch}>
        <DepartmentContext.Provider value={getAllDepartments()}>
          {children}
        </DepartmentContext.Provider>
      </LecturerDispatchContext.Provider>
    </LecturerContext.Provider>
  );
}

export const useLecturerContext = () => useContext(LecturerContext);
export const useLecturerDispatchContext = () =>
  useContext(LecturerDispatchContext);
export const useDepartmentContext = () => useContext(DepartmentContext);

export default LecturerProvider;
