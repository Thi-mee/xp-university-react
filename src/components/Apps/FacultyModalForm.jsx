import React, { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";

const emptyFormObj = {
  Name: "",
  Code: "",
  UniqueId: "",
  Status: 1 ,
  FacultyId: null,
};

function ModalForm({ show, data, onHide, handleUpdateFaculty }) {
  const [formInput, setFormInput] = useState(emptyFormObj);
  const [errorMessage, setErrorMessage] = useState("");

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  const validateInput = (data) => {
    if (data.Name === "" || data.Name.length < 3) {
      showErrorMessage("Faculty Name is empty or invalid");
      return false;
    }
    if (data.FacultyId === 0) {
      showErrorMessage("Faculty must be selected");
      return false;
    }
    if (data.Code === "" || data.Code.length < 2) {
      showErrorMessage("Faculty Code is empty or invalid");
      return false;
    }
    if (data.UniqueId === "" || data.UniqueId.length < 4) {
      showErrorMessage("Faculty UniqueId is empty or invalid");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput(formInput)) return;

    const facultyReq = { ...formInput };
    if (data) {
      // update faculty
      handleUpdateFaculty(facultyReq, 2);
    } else {
      // add faculty
      delete facultyReq.FacultyId;
      handleUpdateFaculty(facultyReq, 1);
    }
  };

  useEffect(() => {
    if (data) {
      setFormInput({
        Name: data.Name,
        Code: data.Code,
        UniqueId: data.UniqueId,
        Status: data.Status,
        FacultyId: data.FacultyId,
      });
    } else {
      setFormInput(emptyFormObj);
    }
  }, [data]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{data ? "Edit Faculty" : "New Faculty"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="Name">
            <Form.Label>Faculty Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Faculty Name"
              value={formInput.Name}
              onChange={(e) =>
                setFormInput({ ...formInput, Name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="Code">
            <Form.Label>Faculty Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Faculty Code"
              value={formInput.Code}
              onChange={(e) =>
                setFormInput({ ...formInput, Code: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="UniqueId">
            <Form.Label>Faculty UniqueId</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Faculty UniqueId"
              value={formInput.UniqueId}
              onChange={(e) =>
                setFormInput({ ...formInput, UniqueId: e.target.value })
              }
            />
          </Form.Group>
          <Form.Check
            type="checkbox"
            label="Active"
            checked={formInput.Status === 1 ? true : false}
            onChange={(e) =>
              setFormInput({ ...formInput, Status: e.target.checked ? 1 : 0 })
            }
          />
        </Form>
        <div className="d-flex flex-row-reverse">
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalForm;
