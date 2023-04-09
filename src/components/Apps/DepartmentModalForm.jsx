import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Alert, Button, Form } from "react-bootstrap";

const emptyFormObj = {
  Name: "",
  Code: "",
  UniqueId: "",
  Status: 1,
  FacultyId: 0,
  DepartmentId: null,
};

function ModalForm({ show, data, onHide, handleUpdateDept, faculties }) {
  const [formInput, setFormInput] = useState(emptyFormObj);
  const [errorMessage, setErrorMessage] = useState("");

  //TODO: Get all faculties from the server
  // const faculties = [
  //   { FacultyId: 1, Name: "Faculty of Engineering" },
  //   { FacultyId: 2, Name: "Faculty of Science" },
  //   { FacultyId: 3, Name: "Faculty of Arts" },
  // ];

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

    const deptReq = { ...formInput };
    if (data) {
      // update faculty
      handleUpdateDept(deptReq, 2);
    } else {
      // add faculty
      delete deptReq.FacultyId;
      handleUpdateDept(deptReq, 1);
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
        DepartmentId: data.DepartmentId,
      });
    } else {
      setFormInput(emptyFormObj);
    }
  }, [data]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{data ? "Edit Department" : "New Department"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="Name">
            <Form.Label>Department Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Department Name"
              value={formInput.Name}
              onChange={(e) =>
                setFormInput({ ...formInput, Name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="FacultyId">
            <Form.Label>Faculties</Form.Label>
            <Form.Control
              as="select"
              value={formInput.Status}
              onChange={(e) =>
                setFormInput({ ...formInput, Status: e.target.value })
              }>
              <option value={formInput.FacultyId} disabled>Select Faculty</option>
              {faculties.map((faculty) => (
                <option key={faculty.FacultyId} value={faculty.FacultyId}>
                  {faculty.Name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="Code">
            <Form.Label>Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Departmrnt Code"
              value={formInput.Code}
              onChange={(e) =>
                setFormInput({ ...formInput, Code: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="UniqueId">
            <Form.Label>UniqueId</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Department UniqueId"
              value={formInput.UniqueId}
              onChange={(e) =>
                setFormInput({ ...formInput, UniqueId: e.target.value })
              }
            />
          </Form.Group>
          <Form.Check
            type="checkbox"
            label="Active"
            checked={formInput.Status === 1}
            onChange={(e) =>
              setFormInput({ ...formInput, Status: e.target.checked ? 1 : 0 })
            }
          />
          <div className="d-flex flex-row-reverse">
            <Button variant="primary" type="submit" className="float-right">
              {data ? "Update Department" : "Add Department"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalForm;
