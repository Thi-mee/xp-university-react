import { memo } from "react";
import AddButton from "../../Common/AddButton";

function Header({ onRequestAdd, title, buttonText }) {
  return (
    <div className="d-flex justify-content-between mb-2">
      <h1 className="h3 mb-0 text-gray-800">{title}</h1>
      <AddButton onClick={() => onRequestAdd()}>{buttonText}</AddButton>
    </div>
  );
}

export default memo(Header);
