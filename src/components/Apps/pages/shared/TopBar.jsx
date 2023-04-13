import React from "react";
import { Button, Dropdown, Form, NavDropdown, Badge } from "react-bootstrap";
import { Nav, Navbar } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faBell,
  faUser,
  faCogs,
  faList,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../../../services/Apps/AuthService";

function TopBar() {
  const handleLogout = () => {
    logout
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Navbar
      bg="white"
      expand="md"
      className="topbar mb-3 static-top shadow justify-content-between">
      {/* <!-- Sidebar Toggle (Topbar) --> */}
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3">
        Balablu
      </button>

      {/* <!-- Topbar Search --> */}
      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
          <input
            type="text"
            className="form-control bg-light border-0 small"
            placeholder="Search for..."
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <FaSearch />
            </button>
          </div>
        </div>
      </form>

      {/* <!-- Topbar Navbar --> */}
      <Nav className="ml-auto mx-xl-5">
        {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
        <li className="nav-item dropdown no-arrow d-sm-none">
          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={Nav.Link} id="dropdown-basic">
              <FaSearch />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Form>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className="bg-light"
                  />
                  <Button variant="primary" type="submit">
                    Search
                  </Button>
                </Form.Group>
              </Form>
            </Dropdown.Menu>
          </Dropdown>
        </li>

        {/* <!-- Nav Item - Alerts --> */}
        <NavDropdown
          className="nav-item mx-1"
          title={
            <span>
              <FontAwesomeIcon icon={faBell} />
              <Badge className="badge-danger badge-counter">3+</Badge>
            </span>
          }
          id="alertsDropdown">
          <NavDropdown.Header>Alerts Center</NavDropdown.Header>
          <NavDropdown.Item>
            <div className="d-flex align-items-center">
              <div className="mr-3">
                <div className="icon-circle bg-primary">
                  <i className="fas fa-file-alt text-white"></i>
                </div>
              </div>
              <div>
                <div className="small text-gray-500">New Admission List</div>
                <span className="font-weight-bold">
                  Merit admission list for students!
                </span>
              </div>
            </div>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <div className="d-flex align-items-center">
              <div className="mr-3">
                <div className="icon-circle bg-success">
                  <i className="fas fa-donate text-white"></i>
                </div>
              </div>
              <div>
                <div className="small text-gray-500">Facult Screening</div>
                Faculty screening process for all students on the merit list!
              </div>
            </div>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <div className="d-flex align-items-center">
              <div className="mr-3">
                <div className="icon-circle bg-warning">
                  <i className="fas fa-exclamation-triangle text-white"></i>
                </div>
              </div>
              <div>
                <div className="small text-gray-500">
                  Inter-Science Competition
                </div>
                Inter-School Science Competition for all medical and physical
                sciences.
              </div>
            </div>
          </NavDropdown.Item>
          <NavDropdown.Item className="text-center small text-gray-500">
            Show All Alerts
          </NavDropdown.Item>
        </NavDropdown>

        {/* <!-- Nav Item - Messages --> */}

        <NavDropdown
          className="nav-item mx-1"
          title={
            <span>
              <FontAwesomeIcon icon={faEnvelope} />
              <Badge className="badge-danger badge-counter">7</Badge>
            </span>
          }
          id="messagesDropdown">
          <NavDropdown.Header>Message Center</NavDropdown.Header>
          <NavDropdown.Item>
            <div className="d-flex align-items-center">
              <div className="dropdown-list-image mr-3">
                <img
                  className="rounded-circle"
                  src="https://static-00.iconduck.com/assets.00/profile-pic-illustration-512x512-slyqduy6.png"
                  alt="profile"
                />
                <div className="status-indicator bg-success"></div>
              </div>
              <div className="font-weight-bold">
                <div className="text-truncate">
                  Hi all, have you seen the new list?
                </div>
                <div className="small text-gray-500">
                  Admission Officer · 58m
                </div>
              </div>
            </div>
          </NavDropdown.Item>
          <NavDropdown.Item className="text-center small text-gray-500">
            Read More Messages
          </NavDropdown.Item>
        </NavDropdown>

        <div className="topbar-divider d-none d-sm-block"></div>

        {/* <!-- Nav Item - User Information --> */}
        <NavDropdown
          title={
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              System Admin
            </span>
          }
          id="userDropdown">
          <NavDropdown.Item href="#">
            <FontAwesomeIcon
              icon={faUser}
              className="fa-sm fa-fw mr-2 text-gray-400"
            />
            Profile
          </NavDropdown.Item>
          <NavDropdown.Item href="#">
            <FontAwesomeIcon
              icon={faCogs}
              className="fa-sm fa-fw mr-2 text-gray-400"
            />
            Settings
          </NavDropdown.Item>
          <NavDropdown.Item href="#">
            <FontAwesomeIcon
              icon={faList}
              className="fa-sm fa-fw mr-2 text-gray-400"
            />
            Activity Log
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#" onClick={handleLogout}>
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="fa-sm fa-fw mr-2 text-gray-400"
            />
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

export default TopBar;
