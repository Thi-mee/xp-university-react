
export class ActionObject {
  type = "";
  payload = {};
  name = "";
  constructor(type, payload, name) {
    this.type = type;
    this.payload = payload;
    this.name = name;
  }
}



export const isLecturerDuplicate = (lecturers, newLecturerObj) => {
  let error = "";
  let item = "";
  const dupStaffId = lecturers.filter(
    (l) => l.staffId.toLowerCase() === newLecturerObj.staffId.toLowerCase()
  );
  if (
    (newLecturerObj.id === 0 && dupStaffId.length > 0) ||
    (newLecturerObj.id > 0 && dupStaffId.length > 1)
  ) {
    error = `Lecturer with staffId ${newLecturerObj.staffId} already exists`;
    item = "uniqueId";
    return { status: true, error, item };
  }
  return { status: false, error, item };
}

export const isCourseOfStudyDuplicate = (coursesOS, newCourseOSObj) => {
  let error = "";
  let item = "";
  const dupName = coursesOS.filter(
    (c) => c.name.toLowerCase() === newCourseOSObj.name.toLowerCase()
  );
  if (
    (newCourseOSObj.id === 0 && dupName.length > 0) ||
    (newCourseOSObj.id > 0 && dupName.length > 1)
  ) {
    error = "Course Of Study name already exists";
    item = "name";
    return { status: true, error, item };
  }
  const dupShortName = coursesOS.filter(
    (c) => c.shortName.toLowerCase() === newCourseOSObj.shortName.toLowerCase()
  );
  if (
    (newCourseOSObj.id === 0 && dupShortName.length > 0) ||
    (newCourseOSObj.id > 0 && dupShortName.length > 1)
  ) {
    error = "Course Of Study shortName already exists";
    item = "shortName";
    return { status: true, error, item };
  }

  const dupUniqueId = coursesOS.filter(
    (d) => d.uniqueId.toLowerCase() === newCourseOSObj.uniqueId.toLowerCase()
  );
  if (
    (newCourseOSObj.id === 0 && dupUniqueId.length > 0) ||
    (newCourseOSObj.id > 0 && dupUniqueId.length > 1)
  ) {
    error = "Course Of Study UniqueId already exists";
    item = "uniqueId";
    return { status: true, error, item };
  }
  return { status: false, error, item };
};

export const isDuplicate = (all, newObj) => {
  let error = "";
  let item = "";
  const dupName = all.filter(
    (f) => f.name.toLowerCase() === newObj.name.toLowerCase()
  );
  if (
    (newObj.id === 0 && dupName.length > 0) ||
    (newObj.id > 0 && dupName.length > 1)
  ) {
    error = "Faculty name already exists";
    item = "name";
    return { status: true, error, item };
  }

  const dupCode = all.filter(
    (f) => f.code.toLowerCase() === newObj.code.toLowerCase()
  );
  if (
    (newObj.id === 0 && dupCode.length > 0) ||
    (newObj.id > 0 && dupCode.length > 1)
  ) {
    error = "Faculty code already exists";
    item = "code";
    return { status: true, error, item };
  }

  const dupUniqueId = all.filter(
    (f) => f.uniqueId.toLowerCase() === newObj.uniqueId.toLowerCase()
  );
  if (
    (newObj.id === 0 && dupUniqueId.length > 0) ||
    (newObj.id > 0 && dupUniqueId.length > 1)
  ) {
    error = "Faculty Unique Id already exists";
    item = "uniqueId";
    return { status: true, error, item };
  }
  return { status: false, error, item };
}

const isPayloadDuplicate = (allData, payload, name) => {
  if (name === "lecturers") return isLecturerDuplicate(allData, payload);
  if (name === "coursesOfStudy") return isCourseOfStudyDuplicate(allData, payload);
  else return isDuplicate(allData, payload);
}

export const reducer = (currState, action) => {
  switch (action.type) {
    case "Add":
      // validate the payload
      const retVal = isPayloadDuplicate(currState[action.name], action.payload, action.name);
      if (!retVal.status) {
        action.payload.id = currState[action.name].length + 1;
        return { [action.name]: [...currState[action.name], action.payload], prevUpdateSuccess: true };
      }
      return { [action.name]: currState[action.name], prevUpdateSuccess: false };
    case "Update":
      // validate the payload
      const retVal2 = isPayloadDuplicate(currState[action.name], action.payload, action.name);
      if (!retVal2.status) {
        return {
          [action.name]: currState[action.name].map((item) =>
            (item.id === action.payload.id ? action.payload : item)),
          prevUpdateSuccess: true
        };
      }
      return { [action.name]: currState[action.name], prevUpdateSuccess: false };
    case "Delete":
      const newArray = currState[action.name].filter((item) => item.id !== action.payload.id);
      return { [action.name]: newArray, prevUpdateSuccess: true };
    default:
      return currState;
  }
};
