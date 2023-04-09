import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

function EditButton({ onClick }) {
  return (
    <Button variant="primary" size="sm" onClick={onClick}>
      Edit
    </Button>
  );
}

EditButton.propTypes = {
  onClick: PropTypes.func,
};

EditButton.defaultProps = {
  onClick: () => {
    console.log("Edit button clicked");
  },
};

export default EditButton;
