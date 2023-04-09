import React, { useState, useContext } from "react";
import Layout from "../components/Apps/shared/Layout";
import { DepartmentDataContext } from "../contexts/DepartmentContext";
import { Alert, Table } from "react-bootstrap";
import ModalForm from "../components/Apps/DepartmentModalForm";
import EditButton from "../components/Common/EditButton";
import DeleteButton from "../components/Common/DeleteButton";
import AddButton from "../components/Common/AddButton";
import { FacultyDataContext } from "../contexts/FacultyContext";

function Department() {
  const {
    allDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    successMessage,
    errorMessage,
  } = useContext(DepartmentDataContext);
  const { allFaculties } = useContext(FacultyDataContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const handleShowModal = (index) => {
    if (index !== undefined) setSelectedDepartment(allDepartments[index]);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setSelectedDepartment(null);
    setShowModal(false);
  };
  const handleUpdateDepartment = (requestData, actionId) => {
    if (actionId === 1) addDepartment(requestData);
    if (actionId === 2) updateDepartment(requestData);
    if (actionId === 3) deleteDepartment(requestData);
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between">
        <h1 className="h3 mb-0 text-gray-800">Departments</h1>
        <AddButton onClick={() => handleShowModal()}>New Department</AddButton>
      </div>
      <hr />
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Faculty</th>
            <th>Code</th>
            <th>UniqueId</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allDepartments &&
            allDepartments.map((department, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{department.Name}</td>
                <td>
                  {allFaculties &&
                    allFaculties.find(
                      (f) => f.FacultyId === department.FacultyId
                    ).Name}
                </td>
                <td>{department.Code}</td>
                <td>{department.UniqueId}</td>
                <td>
                  {department.Status === 0 ? (
                    <span className="text-danger">Inactive</span>
                  ) : (
                    <span className="text-success">Active</span>
                  )}
                </td>
                <td>
                  <EditButton onClick={() => handleShowModal(index)} />
                  <DeleteButton
                    onClick={() =>
                      handleUpdateDepartment(department.DepartmentId, 3)
                    }
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <ModalForm
        show={showModal}
        onHide={handleCloseModal}
        handleUpdate={handleUpdateDepartment}
        data={selectedDepartment}
        faculties={allFaculties}
      />
    </Layout>
  );
}

export default Department;
