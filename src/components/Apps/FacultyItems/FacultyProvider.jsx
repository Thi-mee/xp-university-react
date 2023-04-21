import { createContext, useContext, useReducer } from "react";
import { getAllFaculties } from "../../../services/Apps/FacultyService";
import { reducer } from "../../../Utils/Common/Utils/xpReducer";

export const FacultyContext = createContext(null);
export const FacultyDispatchContext = createContext(null);

const FacultyProvider = ({ children }) => {
  const [facultyDt, dispatch] = useReducer(reducer, initialState);
  return (
    <FacultyContext.Provider value={facultyDt}>
      <FacultyDispatchContext.Provider value={dispatch}>
        {children}
      </FacultyDispatchContext.Provider>
    </FacultyContext.Provider>
  );
};

const initialState = { faculties: getAllFaculties(), prevUpdateSuccess: true };


// const reducer = (currState, action) => {
//   switch (action.type) {
//     case "Add":
//       return [...currState, action.payload];
//     case "Update":
//       return currState.map((faculty) =>
//         faculty.id === action.payload.id ? action.payload : faculty
//       );
//     case "Delete":
//       return currState.filter((faculty) => faculty.id !== action.payload.id);
//     default:
//       return currState;
//   }
// };

export const useFacultyContext = () => useContext(FacultyContext);

export const useFacultyDispatchContext = () =>
  useContext(FacultyDispatchContext);

export default FacultyProvider;
