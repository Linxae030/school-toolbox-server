import { Course } from "../schema/course.schema";

export type UpdateCourseDto = {
  course: Course;
  week: string;
  id: string;
};
