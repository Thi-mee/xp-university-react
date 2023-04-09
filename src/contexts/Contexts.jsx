import React from "react";
import FacultyContext from "./FacultyContext";
import DepartmentContext from "./DepartmentContext";

function Contexts({ children }) {
  return (
    <FacultyContext>
      <DepartmentContext>{children}</DepartmentContext>
    </FacultyContext>
  );
}

export default Contexts;
