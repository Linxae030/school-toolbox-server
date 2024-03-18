import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CourseService } from "./course.service";
import { CourseController } from "./course.controller";
import { User, UserSchema } from "@/user/schema/user.schema";
import { Course, CourseSchema } from "./schema/course.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
