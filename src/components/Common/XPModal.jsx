import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useState } from "react";

export const useXPModal = () => {
  const [isShown, setIsShown] = useState(false);

  const toggle = () => setIsShown(!isShown);

  return { isShown, toggle };
};

function XPModal({ title, isShown, onClose, children }) {
  return (
    <Modal show={isShown} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save Changes
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default XPModal;
