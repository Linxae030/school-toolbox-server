import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as _ from "lodash";
import { UpdateLinkDto } from "./dto/updateLink.dto";
import { Link, LinkSchema } from "./schema/link.schema";
import {
  OMIT_KEY_PRESET,
  checkArrayValues,
  checkKeysInSchema,
  genBaseErr,
  genBaseSuccess,
  genOmitKey,
} from "@/utils";
import { LinkCate, LinkCateSchema } from "./schema/linkCate.schema";
import { UpdateCateDto } from "./dto/updateCate.dto";
import { CreateCateDto } from "./dto/createCate.dto";
import { CreateLinkDto } from "./dto/createLink.dto";

@Injectable()
export class LinkService {
  constructor(
    @InjectModel(Link.name) private LinkModel: Model<Link>,
    @InjectModel(LinkCate.name) private LinkCateModel: Model<LinkCate>,
  ) {}

  async createLink(createLinkDto: CreateLinkDto, account: string) {
    const { name, direction, displayMode, bgColor, categoryId } = createLinkDto;
    if (checkArrayValues([name, direction, displayMode, bgColor, categoryId])) {
      try {
        const link = new this.LinkModel({
          account,
          ...createLinkDto,
        });
        const cate = await this.LinkCateModel.findById(categoryId);
        // 保存至 link 集合
        await link.save();
        // 保存至 cate 集合
        await this.updateCate(categoryId, {
          links: [...cate.links, link],
        });
        return "创建成功";
      } catch (e) {
        return genBaseErr(e);
      }
    }
    return genBaseErr("信息不完整");
  }

  async findAllLink(account: string) {
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

  async findLink(_id: string) {
    try {
      const res = await this.LinkModel.findById(_id);

      return _.isNil(res)
        ? genBaseErr("id不存在")
        : genBaseSuccess(res, "查询成功");
    } catch (e) {
      return genBaseErr(e);
    }
  }

  async updateLink(_id: string, updateLinkDto: UpdateLinkDto) {
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

  async deleteLink(_id: string) {
    try {
      const link = await this.LinkModel.findById(_id);
      // 删除该链接
      const res = await this.LinkModel.deleteOne({ _id });
      // 从分类中删除
      await this.LinkCateModel.findByIdAndUpdate(link.categoryId, {
        $pull: {
          links: { _id: link._id },
        },
      });
      return _.isNil(res)
        ? genBaseErr("id不存在")
        : genBaseSuccess(res, "删除成功");
    } catch (e) {
      return genBaseErr(e);
    }
  }

  /** cate */

  async createCate(createCateDto: CreateCateDto, account: string) {
    const { name } = createCateDto;
    if (checkArrayValues([name])) {
      try {
        await this.LinkCateModel.create({
          account,
          ...createCateDto,
        });
        return "创建成功";
      } catch (e) {
        return genBaseErr(e);
      }
    }
    return genBaseErr("信息不完整");
  }

  async findAllCate(account: string) {
    try {
      const res = await this.LinkCateModel.find(
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

  async findCate(_id: string) {
    try {
      const res = await this.LinkCateModel.findById(_id);

      return _.isNil(res)
        ? genBaseErr("id不存在")
        : genBaseSuccess(res, "查询成功");
    } catch (e) {
      return genBaseErr(e);
    }
  }

  async updateCate(_id: string, updateCateDto: UpdateCateDto) {
    try {
      if (!checkKeysInSchema(LinkCateSchema, updateCateDto, ["account"])) {
        return genBaseErr("存在不合法键");
      }
      const res = await this.LinkCateModel.findByIdAndUpdate(
        _id,
        updateCateDto,
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

  async deleteCate(_id: string) {
    try {
      const res = await this.LinkCateModel.findByIdAndDelete(_id);
      return _.isNil(res)
        ? genBaseErr("id不存在")
        : genBaseSuccess(res, "删除成功");
    } catch (e) {
      return genBaseErr(e);
    }
  }
}
