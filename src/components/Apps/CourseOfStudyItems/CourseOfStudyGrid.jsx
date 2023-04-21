import { useState } from "react";
import Header from "../shared/Header";
import XPModal, { useXPModal } from "../../Common/XPModal";
import CourseOfStudyForm, { formDef } from "./CourseOfStudyForm";
import CourseOfStudyTable from "./CourseOfStudyTable";

const CourseOfStudyGrid = () => {
  const { isShown, toggle: toggleModal } = useXPModal();
  const [formState, setFormState] = useState({
    formObj: formDef,
    title: "",
  });

  const onRequestModal = (courseObj) => {
    if (!!courseObj) {
      setFormState({ formObj: courseObj, title: "Update Course of Study" });
    } else {
      setFormState({ formObj: formDef, title: "Add Course of Study" });
    }
    toggleModal(true);
  };

  return (
    <>
      <XPModal isShown={isShown} title={formState.title} onClose={toggleModal}>
        <CourseOfStudyForm onToggleModal={toggleModal} formObj={formState.formObj} />
      </XPModal>
      <Header
        title="Courses Of Study"
        buttonText="Add Course Of Study"
        onRequestAdd={onRequestModal}
      />
      <CourseOfStudyTable onRequestModal={onRequestModal} />
    </>
  );
};

export default CourseOfStudyGrid;