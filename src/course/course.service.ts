import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as _ from "lodash";
import { CreateCourseDto } from "./dto/create-course.dto";
import { Course } from "./schema/course.schema";
import { User } from "@/user/schema/user.schema";
import {
  OMIT_KEY_PRESET,
  genBaseErr,
  genBaseSuccess,
  genOmitKey,
} from "@/utils";
import { DeleteCourseDto } from "./dto/delete-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private CourseModel: Model<Course>,
    @InjectModel(User.name) private UserModel: Model<User>,
  ) {}

  async create(createCourseDto: CreateCourseDto, userId: string) {
    try {
      const res = await this.CourseModel.find({ user: userId });
      if (res.length === 0) {
        const cre = await this.CourseModel.create({
          user: userId,
          ...createCourseDto,
        });
        console.log("cre", cre);
      } else {
        await this.CourseModel.updateOne(
          { user: userId },
          { $set: createCourseDto },
        );
      }
      return "创建成功";
    } catch (e) {
      return genBaseErr(e);
    }
  }

  async findAll(userId: string) {
    try {
      const res = await this.CourseModel.find(
        { user: userId },
        genOmitKey(OMIT_KEY_PRESET.V),
      ).populate("user");
      return _.isNil(res)
        ? genBaseErr("id不存在")
        : genBaseSuccess(res[0], "查询成功");
    } catch (e) {
      return genBaseErr(e);
    }
  }

  async update(updateCourseDto: UpdateCourseDto, userId: string) {
    const { id, week, course } = updateCourseDto;
    try {
      const courseInfo = await this.CourseModel.findOne({
        user: userId,
      });
      if (!courseInfo) return genBaseErr("用户课程表不存在");
      const updateIndex = courseInfo[week].findIndex(
        (item) => item._id.toString() === id,
      );
      if (updateIndex === -1) return genBaseErr("课程不存在");
      courseInfo[week][updateIndex] = course;
      await courseInfo.save();
      return "更新成功";
    } catch (e) {
      return genBaseErr(e);
    }
  }

  async delete(deleteCourseDto: DeleteCourseDto, userId: string) {
    const { id, week } = deleteCourseDto;
    try {
      const courseInfo = await this.CourseModel.findOne({
        user: userId,
      });
      if (!courseInfo) return genBaseErr("用户课程表不存在");
      const deleteIndex = courseInfo[week].findIndex(
        (item) => item._id.toString() === id,
      );
      if (deleteIndex === -1) return genBaseErr("课程不存在");
      courseInfo[week].splice(deleteIndex, 1);
      return genBaseSuccess(await courseInfo.save(), "删除成功");
    } catch (e) {
      return genBaseErr(e);
    }
  }
}
