import { useState, useEffect, createContext } from "react";
import FacultyService from "../services/Apps/FacultyService";

export const FacultyDataContext = createContext([]);

function FacultyContext({ children }) {
  const [allFaculties, setAllFaculties] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getAllFaculties = async () => {
    const retVal = await FacultyService.getAllFaculties();
    if (retVal.ErrorMsg) {
      return console.log(retVal.ErrorMsg);
    }
    setAllFaculties(retVal.Data);
  };
  useEffect(() => {
    getAllFaculties();
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

  const addFaculty = async (faculty) => {
    const retVal = await FacultyService.createFaculty(faculty);
    console.log(retVal);
    if (retVal?.ErrorMsg) {
      return showMessage(retVal.ErrorMsg, 2);
    }
    const newFaculty = { ...faculty, FacultyId: retVal.FacultyId };
    setAllFaculties([...allFaculties, newFaculty]);
    showMessage("Faculty added successfully", 1);
  };

  const updateFaculty = async (faculty) => {
    const retVal = await FacultyService.updateFaculty(faculty);
    console.log(retVal);
    if (retVal?.ErrorMsg) {
      return showMessage(retVal.ErrorMsg, 2);
    }
    setAllFaculties((allFaculties) =>
      allFaculties.map((f) => (f.FacultyId === faculty.FacultyId ? faculty : f))
    );
    showMessage("Faculty updated successfully", 1);
  };

  const deleteFaculty = async (facultyId) => {
    const retVal = await FacultyService.deleteFaculty(facultyId);
    console.log(retVal);
    if (retVal?.ErrorMsg) {
      return showMessage(retVal.ErrorMsg, 2);
    }
    setAllFaculties(allFaculties.filter((f) => f.FacultyId !== facultyId));
    showMessage("Faculty deleted successfully", 1);
  };

  return (
    <FacultyDataContext.Provider
      value={{
        allFaculties,
        addFaculty,
        updateFaculty,
        deleteFaculty,
        successMessage,
        errorMessage,
      }}>
      {children}
    </FacultyDataContext.Provider>
  );
}

export default FacultyContext;