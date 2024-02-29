import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as _ from "lodash";
import { CreateResumeDto } from "./dto/create-resume.dto";
import { UpdateResumeDto } from "./dto/update-resume.dto";
import { User } from "@/user/schema/user.schema";
import { Resume } from "./schema/resume.schema";
import {
  OMIT_KEY_PRESET,
  genBaseErr,
  genBaseSuccess,
  genOmitKey,
} from "@/utils";

@Injectable()
export class ResumeService {
  constructor(
    @InjectModel(Resume.name) private ResumeModel: Model<Resume>,
    @InjectModel(User.name) private UserModel: Model<User>,
  ) {}

  async create(createResumeDto: CreateResumeDto, userId: string) {
    const { resumeName, resumeConfig } = createResumeDto;
    try {
      await this.ResumeModel.create({
        user: userId,
        resumeName,
        resumeConfig,
      });
      return "创建成功";
    } catch (e) {
      return genBaseErr(e);
    }
  }

  async findAll(userId: string) {
    try {
      const res = await this.ResumeModel.find(
        { user: userId },
        genOmitKey(OMIT_KEY_PRESET.V),
      ).populate("user");
      return _.isNil(res)
        ? genBaseErr("id不存在")
        : genBaseSuccess(res, "查询成功");
    } catch (e) {
      return genBaseErr(e);
    }
  }

  async findOne(_id: string) {
    try {
      const res = await this.ResumeModel.findById(
        _id,
        genOmitKey(OMIT_KEY_PRESET.V),
      ).populate("user");
      return _.isNil(res)
        ? genBaseErr("id不存在")
        : genBaseSuccess(res, "查询成功");
    } catch (e) {
      return genBaseErr(e);
    }
  }

  async delete(_id: string) {
    try {
      const res = await this.ResumeModel.deleteOne({ _id });
      return _.isNil(res)
        ? genBaseErr("id不存在")
        : genBaseSuccess(res, "删除成功");
    } catch (e) {
      return genBaseErr(e);
    }
  }

  async update(_id: string, updateResumeDto: UpdateResumeDto) {
    try {
      const res = await this.ResumeModel.findByIdAndUpdate(
        _id,
        updateResumeDto,
        {
          new: true,
        },
      );
      return _.isNil(res)
        ? genBaseErr("id不存在")
        : genBaseSuccess(res, "更新成功");
    } catch (e) {
      return genBaseErr(e);
    }
  }
}
