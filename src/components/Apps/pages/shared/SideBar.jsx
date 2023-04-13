import React from "react";
import { Accordion } from "react-bootstrap";
import AccordionItem from "./AccordionItem";
import { Link } from "react-router-dom";
import { FaLaughWink } from "react-icons/fa";
import style from "../../../../styles/SideBar.module.css";

function SideBar() {
  return (
    <aside className="navbar-nav">
      {/* <!-- Sidebar - Brand --> */}
      <Link className={style.SideBarTitle} to="/">
        <FaLaughWink
          fill="#fff"
          size={35}
          style={{ transform: "rotate(-15deg)" }}
        />
        <div>
          XP Portal <sup>TM</sup>
        </div>
      </Link>

      {/* <!-- Divider --> */}
      <hr className="my-0" />

      {/* <!-- Nav Item - Dashboard --> */}
      <li className="nav-item active">
        <a className="nav-link" href="/index.html">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </a>
      </li>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider" />

      {/* <!-- Heading --> */}
      <div className="sidebar-heading">Academics</div>

      {/* <Accordion.Item eventKey="0"> */}
      <Accordion>
        <AccordionItem
          eventKey="0"
          header="Setup"
          body={[
            { name: "Faculties", path: "/faculty" },
            { name: "Departments", path: "/department" },
            { name: "Courses", path: "/course" },
            { name: "CoursesOfStudy", path: "/courseOfStudy" },
            { name: "Lecturers", path: "/lecturer" },
          ]}
        />
        <AccordionItem
          eventKey="1"
          header="Management"
          body={[
            { name: "Faculties", path: "/faculty" },
            { name: "Departments", path: "/department" },
            { name: "Courses", path: "/course" },
            { name: "CoursesOfStudy", path: "/courseOfStudy" },
            { name: "Lecturers", path: "/lecturer" },
          ]}
        />
      </Accordion>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider d-none d-md-block" />
      <FaLaughWink />
      {/* <!-- Sidebar Toggler (Sidebar) --> */}
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
    </aside>
  );
}

export default SideBar;
