import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { LinkIconDisplayModeEnum } from "./types";
import { LinkCate } from "./linkCate.schema";

@Schema({
  timestamps: true,
  collection: "link",
})
export class Link {
  @Prop({
    description: "所属用户",
    required: true,
    ref: "User",
    immutable: true,
    type: mongoose.Schema.Types.ObjectId,
  })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({
    description: "链接名",
    required: true,
  })
  name: string;

  @Prop({
    description: "链接指向",
    required: true,
  })
  direction: string;

  @Prop({
    description: "所属分类",
    required: true,
    ref: "LinkCate",
    type: mongoose.Schema.Types.ObjectId,
  })
  categoryId: mongoose.Schema.Types.ObjectId;

  @Prop({
    description: "背景颜色",
    required: true,
  })
  bgColor: string;

  @Prop({
    description: "链接图标展示方式",
    default: LinkIconDisplayModeEnum.FirstChar,
  })
  displayMode: LinkIconDisplayModeEnum;
}
export const LinkSchema = SchemaFactory.createForClass(Link);
