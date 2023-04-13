import { XPCrudType } from '../../Utils/Common/Enums/alertEnums';
import Data from './db.json';

export const getAllFaculties = () => Data.faculties;

export const updateFaculties = (faculty, crudType) => {
  switch (crudType) {
    case XPCrudType.Add:
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
