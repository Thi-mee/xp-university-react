import { useState } from "react";
import Header from "../shared/Header";
import XPModal, { useXPModal } from "../../Common/XPModal";
import CourseForm, { formDef } from "./CourseForm";
import CourseTable from "./CourseTable";

const CourseGrid = () => {
  const { isShown, toggle: toggleModal } = useXPModal();
  const [formState, setFormState] = useState({
    formObj: formDef,
    title: "",
  });

  const onRequestModal = (courseObj) => {
    if (!!courseObj) {
      setFormState({ formObj: courseObj, title: "Update Course" });
    } else {
      setFormState({ formObj: formDef, title: "Add Course" });
    }
    toggleModal(true);
  };

  return (
    <>
      <XPModal isShown={isShown} title={formState.title} onClose={toggleModal}>
        <CourseForm
          onToggleModal={toggleModal}
          formObj={formState.formObj}
        />
      </XPModal>
      <Header
        title="Courses"
        buttonText="Add Course"
        onRequestAdd={onRequestModal}
      />
      <CourseTable onRequestModal={onRequestModal} />
    </>
  );
};

export default CourseGrid;
