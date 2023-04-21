import CourseGrid from "../CourseItems/CourseGrid";
import CourseProvider from "../CourseItems/CourseProvider";

const Course = () => {
  return (
    <CourseProvider>
      <CourseGrid />
    </CourseProvider>
  );
};

export default Course;
