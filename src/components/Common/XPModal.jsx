import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useState } from "react";

export const useXPModal = () => {
  const [isShown, setIsShown] = useState(false);

  const toggle = () => setIsShown(!isShown);

  return { isShown, toggle };
};

function XPModal(props) {
  return (
    <Modal show={props.isShown} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.content}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={props.onSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default XPModal;
