import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Apps/pages/Home';
import Course from '../components/Apps/pages/Course';
import Department from '../components/Apps/pages/Department';
import Faculty from '../components/Apps/pages/Faculty';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/course" element={<Course />} />
      <Route path="/department" element={<Department />} />
      <Route path="/faculty" element={<Faculty />} />
    </Routes>
  )
}

export default AppRoutes