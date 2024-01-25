import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as _ from "lodash";
import { CreateLinkDto } from "./dto/create-link.dto";
import { UpdateLinkDto } from "./dto/update-link.dto";
import { Link, LinkSchema } from "./schema/link.schema";
import {
  OMIT_KEY_PRESET,
  checkArrayValues,
  checkKeysInSchema,
  genBaseErr,
  genBaseSuccess,
  genOmitKey,
} from "@/utils";

@Injectable()
export class LinkService {
  constructor(@InjectModel(Link.name) private LinkModel: Model<Link>) {}

  async create(createLinkDto: CreateLinkDto, account: string) {
    const { name, direction, displayMode } = createLinkDto;
    if (checkArrayValues([name, direction, displayMode])) {
      try {
        await this.LinkModel.create({
          account,
          ...createLinkDto,
        });
        return "创建成功";
      } catch (e) {
        return genBaseErr(e);
      }
    }
    return genBaseErr("信息不完整");
  }

  async findAll(account: string) {
    try {
      const res = await this.LinkModel.find(
        { account },
        genOmitKey(OMIT_KEY_PRESET.V),
      );
      return _.isNil(res)
        ? genBaseErr("id不存在")
        : genBaseSuccess(res, "查询成功");
    } catch (e) {
      return genBaseErr(e);
    }
  }

  async findOne(_id: string) {
    try {
      const res = await this.LinkModel.findById(_id);

      return _.isNil(res)
        ? genBaseErr("id不存在")
        : genBaseSuccess(res, "查询成功");
    } catch (e) {
      return genBaseErr(e);
    }
  }

  async update(_id: string, updateLinkDto: UpdateLinkDto) {
    try {
      if (!checkKeysInSchema(LinkSchema, updateLinkDto, ["account"])) {
        return genBaseErr("存在不合法键");
      }
      const res = await this.LinkModel.findByIdAndUpdate(_id, updateLinkDto, {
        new: true,
      });
      return _.isNil(res)
        ? genBaseErr("id不存在")
        : genBaseSuccess(res, "更新成功");
    } catch (e) {
      return genBaseErr(e);
    }
  }

  async remove(_id: string) {
    try {
      const res = await this.LinkModel.findByIdAndDelete(_id);
      return _.isNil(res)
        ? genBaseErr("id不存在")
        : genBaseSuccess(res, "删除成功");
    } catch (e) {
      return genBaseErr(e);
    }
  }
}
