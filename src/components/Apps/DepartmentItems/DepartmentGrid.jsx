import { useState, memo } from "react";
import Header from "../shared/Header";
import XPModal, { useXPModal } from "../../Common/XPModal";
import DepartmentForm, { formDef } from "./DepartmentForm";
import DepartmentTable from "./DepartmentTable";

function DepartmentGrid() {
  const { isShown, toggle: toggleModal } = useXPModal();
  const [formState, setFormState] = useState({
    formObj: formDef,
    title: "",
  });

  const onRequestModal = (department) => {
    if (!!department) {
      setFormState({ formObj: department, title: "Update Department" });
    } else {
      setFormState({ formObj: formDef, title: "Add Department" });
    }
    toggleModal(true);
  };

  return (
    <>
      <XPModal isShown={isShown} title={formState.title} onClose={toggleModal}>
        <DepartmentForm
          onToggleModal={toggleModal}
          formObj={formState.formObj}
        />
      </XPModal>
      <Header
        title="Departments"
        buttonText="Add Department"
        onRequestAdd={onRequestModal}
      />
      <DepartmentTable onRequestModal={onRequestModal} />
    </>
  );
}

export default memo(DepartmentGrid);
