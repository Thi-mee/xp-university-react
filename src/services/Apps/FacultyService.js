import { XPCrudType } from '../../Utils/Common/Enums/alertEnums';
import Data from './db.json';

export const getAllFaculties = () => Data.faculties;

export const updateFaculties = (faculty, crudType) => {
  switch (crudType) {
    case XPCrudType.Add:
      faculty.id = Data.faculties.length + 1;
      Data.faculties.push(faculty);
      return true;
    case XPCrudType.Update:
      const index = Data.faculties.findIndex((m) => m.id === faculty.id);
      if (index !== -1) {
        Data.faculties[index] = faculty;
      }
      return true;
    case XPCrudType.Delete:
      Data.faculties = Data.faculties.filter((m) => m.id !== faculty.id);
      return true;
    default:
      return false;
  }
}

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
