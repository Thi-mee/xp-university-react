import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Course from '../pages/Course';
import Department from '../pages/Department';
import CourseOfStudy from '../pages/CourseOfStudy';
import Faculty from '../pages/Faculty';
import Lecturer from '../pages/Lecturer';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/course" element={<Course />} />
      <Route path="/department" element={<Department />} />
      <Route path="/course-of-study" element={<CourseOfStudy />} />
      <Route path="/faculty" element={<Faculty />} />
      <Route path="/lecturer" element={<Lecturer />} />
    </Routes>
  )
}

export default AppRoutes