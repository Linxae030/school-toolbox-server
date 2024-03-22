import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export enum DayOfWeekEnum {
  Monday = 0,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

export interface CourseInfo {
  courseName: string;
  day: DayOfWeekEnum;
  classroom: string;
  start: [number, number];
  end: [number, number];
  teacher: string;
  weekRange: [number, number];
}

const weekDayCourseType = {
  courseName: { type: String },
  day: { type: Number },
  classroom: { type: String },
  start: { type: [Number] },
  end: { type: [Number] },
  teacher: { type: String },
  weekRange: { type: [Number] },
};

@Schema({
  timestamps: true,
  collection: "course",
})
export class Course {
  @Prop({
    description: "所属用户",
    required: true,
    ref: "User",
    immutable: true,
    type: mongoose.Schema.Types.ObjectId,
  })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({
    description: "当前周数",
    required: true,
    type: String,
  })
  currentWeek: string;

  @Prop({
    required: true,
    type: [weekDayCourseType],
  })
  mondayCourses: CourseInfo[];

  @Prop({
    required: true,
    type: [weekDayCourseType],
  })
  tuesdayCourses?: CourseInfo[];

  @Prop({
    required: true,
    type: [weekDayCourseType],
  })
  wednesdayCourses?: CourseInfo[];

  @Prop({
    required: true,
    type: [weekDayCourseType],
  })
  thursdayCourses?: CourseInfo[];

  @Prop({
    required: true,
    type: [weekDayCourseType],
  })
  fridayCourses?: CourseInfo[];

  @Prop({
    required: true,
    type: [weekDayCourseType],
  })
  saturdayCourses?: CourseInfo[];

  @Prop({
    required: true,
    type: [weekDayCourseType],
  })
  sundayCourses?: CourseInfo[];
}
export const CourseSchema = SchemaFactory.createForClass(Course);
