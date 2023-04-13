import { XPCrudType } from '../../Utils/Common/Enums/alertEnums';
import Data from './db.json';

export const getAllDepartments = () => Data.departments;

export const updateDepartments = (department, crudType) => {
  switch (crudType) {
    case XPCrudType.Add:
      Data.departments.push(department);
      return true;
    case XPCrudType.Update:
      const index = Data.departments.findIndex((m) => m.id === department.id);
      if (index !== -1) {
        Data.departments[index] = department;
      }
      return true;
    case XPCrudType.Delete:
      Data.departments = Data.departments.filter((m) => m.id !== department.id);
      return true;
    default:
      return false;
  }
}