import { useContext, createContext, useReducer } from "react";
import { reducer } from "../../../Utils/Common/Utils/xpReducer";
import { getCoursesOfStudy } from "../../../services/Apps/CourseOfStudyService";
import { getAllDepartments } from "../../../services/Apps/DepartmentService";

const CourseOfStudyContext = createContext(null);
const DepartmentContext = createContext(null);
const CourseOfStudyDispatchContext = createContext(null);

function CourseOfStudyProvider({ children }) {
  const [courseOfStudyDT, dispatch] = useReducer(reducer, {
    coursesOfStudy: getCoursesOfStudy(),
    prevUpdateSuccess: true,
  });
  return (
    <CourseOfStudyContext.Provider value={courseOfStudyDT}>
      <CourseOfStudyDispatchContext.Provider value={dispatch}>
        <DepartmentContext.Provider value={getAllDepartments()}>
          {children}
        </DepartmentContext.Provider>
      </CourseOfStudyDispatchContext.Provider>
    </CourseOfStudyContext.Provider>
  );
}

export const useCourseOfStudyContext = () => useContext(CourseOfStudyContext);
export const useCourseOfStudyDispatchContext = () =>
  useContext(CourseOfStudyDispatchContext);
export const useDepartmentContext = () => useContext(DepartmentContext);

export default CourseOfStudyProvider;
