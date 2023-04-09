import { useState, useEffect, createContext } from "react";
import DepartmentService from "../services/Apps/DepartmentService";

export const DepartmentDataContext = createContext([]);

function DepartmentContext({ children }) {
  const [allDepartments, setAllDepartments] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getAllDepartments = async () => {
    const retVal = await DepartmentService.getAllDepartments();
    if (retVal.ErrorMsg) {
      return console.log(retVal.ErrorMsg);
    }
    setAllDepartments(retVal.Data);
  };
  useEffect(() => {
    getAllDepartments();
  }, []);

  const showMessage = (msg, type) => {
    if (type === 1) {
      setSuccessMessage(msg);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } else {
      setErrorMessage(msg);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const addDepartment = async (department) => {
    const retVal = await DepartmentService.createDepartment(department);
    console.log(retVal);
    if (retVal?.ErrorMsg) {
      return showMessage(retVal.ErrorMsg, 2);
    }
    const newDepartment = { ...department, DepartmentId: retVal.DepartmentId };
    setAllDepartments([...allDepartments, newDepartment]);
    showMessage("Department added successfully", 1);
  };

  const updateDepartment = async (department) => {
    const retVal = await DepartmentService.updateDepartment(department);
    console.log(retVal);
    if (retVal?.ErrorMsg) {
      return showMessage(retVal.ErrorMsg, 2);
    }
    setAllDepartments((allDepartments) =>
      allDepartments.map((d) =>
        d.DepartmentId === department.DepartmentId ? department : d
      )
    );
    showMessage("Department updated successfully", 1);
  };

  const deleteDepartment = async (departmentId) => {
    const retVal = await DepartmentService.deleteDepartment(departmentId);
    console.log(retVal);
    if (retVal?.ErrorMsg) {
      return showMessage(retVal.ErrorMsg, 2);
    }
    setAllDepartments((allDepartments) =>
      allDepartments.filter((d) => d.DepartmentId !== departmentId)
    );
    showMessage("Department deleted successfully", 1);
  };

  return (
    <DepartmentDataContext.Provider
      value={{
        allDepartments,
        addDepartment,
        updateDepartment,
        deleteDepartment,
        successMessage,
        errorMessage,
      }}>
      {children}
    </DepartmentDataContext.Provider>
  );
}

export default DepartmentContext;