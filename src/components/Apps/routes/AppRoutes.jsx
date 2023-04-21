import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Course from "../pages/Course";
import Department from "../pages/Department";
import Faculty from "../pages/Faculty";
import CourseOfStudy from "../pages/CourseOfStudy";
import Lecturer from "../pages/Lecturer";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/xp-university-react/" element={<Home />} />
      <Route path="/xp-university-react/course" element={<Course />} />
      <Route path="/xp-university-react/department" element={<Department />} />
      <Route path="/xp-university-react/faculty" element={<Faculty />} />
      <Route
        path="/xp-university-react/course-of-study"
        element={<CourseOfStudy />}
      />
      <Route path="/xp-university-react/lecturer" element={<Lecturer />} />
    </Routes>
  );
}

export default AppRoutes;
