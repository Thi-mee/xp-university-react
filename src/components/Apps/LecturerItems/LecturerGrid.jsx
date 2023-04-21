import { useState } from "react";
import Header from "../shared/Header";
import XPModal, { useXPModal } from "../../Common/XPModal";
import LecturerForm, { formDef } from "./LecturerForm";
import LecturerTable from "./LecturerTable";

const LecturerGrid = () => {
  const { isShown, toggle: toggleModal } = useXPModal();
  const [formState, setFormState] = useState({
    formObj: formDef,
    title: "",
  });

  const onRequestModal = (courseObj) => {
    if (!!courseObj) {
      setFormState({ formObj: courseObj, title: "Update Lecturer" });
    } else {
      setFormState({ formObj: formDef, title: "Add Lecturer" });
    }
    toggleModal(true);
  };

  return (
    <>
      <XPModal isShown={isShown} title={formState.title} onClose={toggleModal}>
        <LecturerForm onToggleModal={toggleModal} formObj={formState.formObj} />
      </XPModal>
      <Header
        title="Lecturers"
        buttonText="Add Lecturer"
        onRequestAdd={onRequestModal}
      />
      <LecturerTable onRequestModal={onRequestModal} />
    </>
  );
};

export default LecturerGrid;
