import {useContext, createContext, useReducer} from 'react'
import {reducer} from '../../../Utils/Common/Utils/xpReducer'
import { getCourses } from '../../../services/Apps/CourseService'
import { getAllDepartments } from '../../../services/Apps/DepartmentService'


const CourseContext = createContext(null)
const DepartmentContext = createContext(null)
const CourseDispatchContext = createContext(null)

function CourseProvider({children}) {
  const [courseDT, dispatch] = useReducer(reducer, {
    courses: getCourses(),
    prevUpdateSuccess: true,
  });
  return (
    <CourseContext.Provider value={courseDT}>
      <CourseDispatchContext.Provider value={dispatch}>
        <DepartmentContext.Provider value={getAllDepartments()}>
          {children}
        </DepartmentContext.Provider>
      </CourseDispatchContext.Provider>
    </CourseContext.Provider>
  )
}

export const useCourseContext = () => useContext(CourseContext)
export const useCourseDispatchContext = () => useContext(CourseDispatchContext)
export const useDepartmentContext = () => useContext(DepartmentContext)

export default CourseProvider