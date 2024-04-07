/* eslint-disable no-undef */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as _ from "lodash";
import { readFile, unlink } from "fs/promises";
import { Response } from "express";
import { join } from "path";
import { Readable } from "stream";
import { UpdateFileDto } from "./dto/update-file.dto";
import { User } from "@/user/schema/user.schema";
import { FileTag } from "./schema/fileTag.schema";
import { genBaseErr, genBaseSuccess, OMIT_KEY_PRESET } from "@/utils";
import { File } from "./schema/file.schema";
import { genOmitKey } from "../utils/utils";

@Injectable()
export class FileService {
  constructor(
    @InjectModel(FileTag.name) private FileTagModel: Model<FileTag>,
    @InjectModel(File.name) private FileModel: Model<File>,
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

  async uploadFiles(
    files: Express.Multer.File[],
    tags: string[],
    userId: string,
  ) {
    try {
      for (const file of files) {
        const { originalname, mimetype, path, size } = file;
        await this.FileModel.create({
          user: userId,
          tags,
          fileName: originalname,
          filePath: path,
          fileSize: size,
          fileType: mimetype,
        });
      }
      return "上传成功";
    } catch (e) {
      return genBaseErr(e);
    }
  }

  async findFile(_id: string) {
    try {
      const file = await this.FileModel.findById(_id);
      if (_.isNil(file)) return genBaseErr("未找到该文件");
      return file;
    } catch (e) {
      return genBaseErr(e);
    }
  }

  async findFileByName(fileName: string) {
    try {
      const file = await this.FileModel.find({
        fileName,
      });
      if (_.isNil(file)) return false;
      return true;
    } catch (e) {
      return genBaseErr(e);
    }
  }

  async findFiles(userId: string, tags: string[]) {
    try {
      let res: File[] = [];
      if (tags.length === 0) {
        res = await this.FileModel.find({
          user: userId,
        });
      } else {
        res = await this.FileModel.find(
          {
            user: userId,
          },
          genOmitKey(OMIT_KEY_PRESET.V_USER),
        );
        res = res.filter((file) =>
          tags.every((tag) =>
            file.tags.map((tag) => tag.toString()).includes(tag),
          ),
        );
      }
      return _.isNil(res)
        ? genBaseErr("查询失败")
        : genBaseSuccess(res, "查询成功");
    } catch (e) {
      return genBaseErr(e);
    }
  }

  async deleteFile(_id: string) {
    try {
      const file = await this.FileModel.findById(_id);
      if (_.isNil(file)) genBaseErr("未找到该文件");
      const { filePath } = file;
      await unlink(filePath);
      const res = await this.FileModel.findByIdAndDelete(_id);
      return _.isNil(res) ? genBaseErr("删除失败") : "删除成功";
    } catch (e) {
      return genBaseErr(e);
    }
  }

  async deleteFiles(ids: string[]) {
    try {
      for (const id of ids) {
        await this.deleteFile(id);
      }
      return "删除成功";
    } catch (e) {
      return genBaseErr(e);
    }
  }

  async downloadFile(_id: string, res: Response) {
    try {
      const file = await this.FileModel.findById(_id);
      if (_.isNil(file)) genBaseErr("未找到该文件");
      const { filePath, fileName } = file;
      const path = join(__dirname, "..", "..", filePath);
      return res.download(path, fileName);
    } catch (e) {
      return genBaseErr(e);
    }
  }

  async downloadFiles(ids: string[], res: Response) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
      const AdmZip = require("adm-zip");
      const zip = new AdmZip();
      for (const id of ids) {
        const file = await this.FileModel.findById(id);
        const filePath = join(__dirname, "..", "..", file?.filePath);
        const renamedFileName = file?.fileName; // 修改后的文件名

        // 读取文件内容
        const fileData = await readFile(filePath);

        // 向压缩包中添加文件，并设置修改后的文件名
        console.log("renamedFileName", renamedFileName);
        zip.addFile(renamedFileName, fileData);
      }

      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader("Content-Disposition", `attachment}`);

      // 将压缩包内容转换为可读流，并将其输出给响应流
      const zipData = zip.toBuffer();
      const zipStream = new Readable();
      zipStream.push(zipData);
      zipStream.push(null);
      return zipStream.pipe(res);
    } catch (e) {
      return genBaseErr(e);
    }
  }

  async checkFileUnique(fileNames: string[], userId: string) {
    try {
      const repeatNames = [];
      for (const name of fileNames) {
        const file = await this.FileModel.find({
          user: userId,
          fileName: name,
        });
        if (file.length) repeatNames.push(file[0]?.fileName);
      }
      return genBaseSuccess({ repeatNames });
    } catch (e) {
      return genBaseErr(e);
    }
  }
}
