import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as _ from "lodash";
import { CreateFileDto } from "./dto/create-file.dto";
import { UpdateFileDto } from "./dto/update-file.dto";
import { User } from "@/user/schema/user.schema";
import { FileTag } from "./schema/fileTag.schema";
import { genBaseErr, genBaseSuccess } from "@/utils";

@Injectable()
export class FileService {
  constructor(
    @InjectModel(FileTag.name) private FileTagModel: Model<FileTag>,
    @InjectModel(User.name) private UserModel: Model<User>,
  ) {}

  async addTag(name: string, userId: string) {
    try {
      const findTag = await this.FileTagModel.find({
        user: userId,
        name,
      });
      if (findTag.length !== 0) return genBaseErr("该tag已存在");

      await this.FileTagModel.create({
        user: userId,
        name,
      });
    } catch (e) {
      return genBaseErr(e);
    }
    return "添加成功";
  }

  async findAllTags(userId: string) {
    try {
      const res = await this.FileTagModel.find({
        user: userId,
      });
      return _.isNil(res)
        ? genBaseErr("查询失败")
        : genBaseSuccess(res, "查询成功");
    } catch (e) {
      return genBaseErr(e);
    }
  }

  async updateTag(updateTagDto: UpdateFileDto, userId: string) {
    try {
      const { _id, name } = updateTagDto;
      const findTag = await this.FileTagModel.find({
        user: userId,
        name,
      });

      if (findTag.length !== 0) return genBaseErr("该tag已存在");
      const res = await this.FileTagModel.findByIdAndUpdate(
        _id,
        {
          name,
        },
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

  async deleteTag(_id: string) {
    try {
      const res = await this.FileTagModel.findByIdAndDelete(_id);
      return _.isNil(res) ? genBaseErr("删除失败") : "删除成功";
    } catch (e) {
      return genBaseErr(e);
    }
  }

  create(createFileDto: CreateFileDto) {
    return "This action adds a new file";
  }

  findAll() {
    return `This action returns all file`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
