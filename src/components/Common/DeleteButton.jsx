import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

function DeleteButton({ onClick }) {
  return (
    <Button variant="danger" size="sm" onClick={onClick}>
      Delete
    </Button>
  );
}

DeleteButton.propTypes = {
  onClick: PropTypes.func,
};

DeleteButton.defaultProps = {
  onClick: () => console.log("Delete button clicked"),
};

export default DeleteButton;
