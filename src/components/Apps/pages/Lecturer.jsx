import LecturerGrid from "../LecturerItems/LecturerGrid";
import LecturerProvider from "../LecturerItems/LecturerProvider";

const Lecturer = () => {
  return (
    <LecturerProvider>
      <LecturerGrid />
    </LecturerProvider>
  );
};

export default Lecturer;
