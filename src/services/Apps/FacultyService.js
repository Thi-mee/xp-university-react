import Data from './db.json';

export const getAllFaculties = () => Data.faculties;

export const isFacultyDuplicate = (faculty) => {
  let error = "";
  let item = "";
  const dupName = Data.faculties.filter((f) => f.name.toLowerCase() === faculty.name.toLowerCase());
  if ((faculty.id === 0 && dupName.length > 0) || (faculty.id > 0 && dupName.length > 1)) {
    error = "Faculty name already exists";
    item = "name";
    return { status: true, error, item };
  }

  const dupCode = Data.faculties.filter((f) => f.code.toLowerCase() === faculty.code.toLowerCase());
  if ((faculty.id === 0 && dupCode.length > 0) || (faculty.id > 0 && dupCode.length > 1)) {
    error = "Faculty code already exists";
    item = "code";
    return { status: true, error, item };
  }

  const dupUniqueId = Data.faculties.filter((f) => f.uniqueId.toLowerCase() === faculty.uniqueId.toLowerCase());
  if ((faculty.id === 0 && dupUniqueId.length > 0) || (faculty.id > 0 && dupUniqueId.length > 1)) {
    error = "Faculty Unique Id already exists";
    item = "uniqueId";
    return { status: true, error, item };
  }
  return { status: false, error, item };
};
