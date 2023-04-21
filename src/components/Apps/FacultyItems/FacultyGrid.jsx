import { memo, useState } from "react";
import XPModal, { useXPModal } from "../../Common/XPModal";
import FacultyForm, { formDef } from "./FacultyForm";
import Header from "../shared/Header";
import FacultyTable from "./FacultyTable";

const FacultyGrid = () => {
  const { isShown, toggle: toggleModal } = useXPModal();
  const [formState, setFormState] = useState({
    formObj: formDef,
    title: "",
  });

  const onRequestModal = (faculty) => {
    if (!!faculty) {
      setFormState({ formObj: faculty, title: "Update Faculty" });
    } else {
      setFormState({ formObj: formDef, title: "Add Faculty" });
    }
    toggleModal(true);
  };

  return (
    <>
      <XPModal isShown={isShown} title={formState.title} onClose={toggleModal}>
        <FacultyForm onToggleModal={toggleModal} formObj={formState.formObj} />
      </XPModal>
      <Header
        title="Faculties"
        buttonText="Add Faculty"
        onRequestAdd={onRequestModal}
      />
      <FacultyTable onRequestModal={onRequestModal} />
    </>
  );
};

export default memo(FacultyGrid);
