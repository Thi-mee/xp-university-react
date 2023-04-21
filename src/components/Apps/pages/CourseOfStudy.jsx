import CourseOfStudyGrid from "../CourseOfStudyItems/CourseOfStudyGrid";
import CourseOfStudyProvider from "../CourseOfStudyItems/CourseOfStudyProvider";

const CourseOfStudy = () => {
  return (
    <CourseOfStudyProvider>
      <CourseOfStudyGrid />
    </CourseOfStudyProvider>
  );
};

export default CourseOfStudy;
