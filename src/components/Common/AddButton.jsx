import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

function AddButton({ onClick, children }) {
  if (children) {
    return (
      <Button size="sm" variant="primary" onClick={onClick}>
        {children}
      </Button>
    );
  }
  return (
    <Button size="sm" variant="primary" onClick={onClick}>
      New
    </Button>
  );
}

AddButton.propTypes = {
  onClick: PropTypes.func,
};

AddButton.defaultProps = {
  onClick: () => console.log("Add button clicked"),
};

export default AddButton;
