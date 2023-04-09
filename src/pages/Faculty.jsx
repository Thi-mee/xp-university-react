import React, { useState, useContext } from "react";
import Layout from "../components/Apps/shared/Layout";
import { FacultyDataContext } from "../contexts/FacultyContext";
import { Alert, Table } from "react-bootstrap";
import ModalForm from "../components/Apps/FacultyModalForm";
import EditButton from "../components/Common/EditButton";
import DeleteButton from "../components/Common/DeleteButton";
import AddButton from "../components/Common/AddButton";

function Faculty() {
  const {
    allFaculties,
    addFaculty,
    updateFaculty,
    deleteFaculty,
    successMessage,
    errorMessage,
  } = useContext(FacultyDataContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const handleShowModal = (index) => {
    if (index !== undefined) setSelectedFaculty(allFaculties[index]);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setSelectedFaculty(null);
    setShowModal(false);
  };
  const handleUpdateFaculty = (requestData, actionId) => {
    if (actionId === 1) addFaculty(requestData);
    if (actionId === 2) updateFaculty(requestData);
    if (actionId === 3) deleteFaculty(requestData);
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between">
        <h1 className="h3 mb-0 text-gray-800">Faculties</h1>
        <AddButton onClick={() => handleShowModal()}>New Faculty</AddButton>
      </div>
      <hr />
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Code</th>
            <th>UniqueId</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allFaculties && allFaculties.map((faculty, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{faculty.Name}</td>
              <td>{faculty.Code}</td>
              <td>{faculty.UniqueId}</td>
              <td>
                {faculty.Status === 0 ? (
                  <span className="text-danger">Inactive</span>
                ) : (
                  <span className="text-success">Active</span>
                )}
              </td>
              <td>
                <EditButton onClick={() => handleShowModal(index)} />
                <DeleteButton
                  onClick={() => handleUpdateFaculty(faculty.FacultyId, 3)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ModalForm
        show={showModal}
        data={selectedFaculty}
        onHide={handleCloseModal}
        handleUpdateFaculty={handleUpdateFaculty}
      />
    </Layout>
  );
}

export default Faculty;
