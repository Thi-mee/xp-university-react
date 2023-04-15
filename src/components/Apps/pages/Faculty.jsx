import Layout from "./shared/Layout";
import FacultyGrid from "../FacultyItems/FacultyGrid";
import FacultyTable from "../FacultyItems/FacultyTable";
import FacultyForm from "../FacultyItems/FacultyForm";
import XPModal, { useXPModal } from "../../Common/XPModal";
import Header from "../Header";
import { createContext, useState } from "react";
import { formDef } from "../FacultyItems/Utils";
import { getAllFaculties } from "../../../services/Apps/FacultyService";

export const FacultyContext = createContext([]);

function Faculty() {
  const [faculties, setFaculties] = useState(getAllFaculties);
  const { isShown, toggle: onToggleModal } = useXPModal();
  const [modalTitle, setModalTitle] = useState("");
  const [formState, setFormState] = useState(formDef);

  const onRequestModal = (faculty) => {
    setModalTitle(faculty ? "Update Faculty" : "Add Faculty");
    setFormState(faculty ? faculty : formDef);
    onToggleModal();
  };

  return (
    <Layout>
      <FacultyContext.Provider value={[ faculties, setFaculties ]}>
        <XPModal isShown={isShown} title={modalTitle} onClose={onToggleModal}>
          <FacultyForm onToggleModal={onToggleModal} formObj={formState} />
        </XPModal>
        <FacultyGrid>
          <Header title="Faculties" buttonText="Add Faculty" onRequestAdd={onRequestModal} />
          <FacultyTable onRequestModal={onRequestModal} />
        </FacultyGrid>
      </FacultyContext.Provider>
    </Layout>
  );
}

export default Faculty;
