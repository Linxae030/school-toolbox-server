import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({
  timestamps: true,
  collection: "linkCate",
})
export class LinkCate {
  @Prop({
    description: "所属用户",
    required: true,
    ref: "User",
    immutable: true,
    type: mongoose.Schema.Types.ObjectId,
  })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({
    description: "分类名",
    required: true,
  })
  name: string;

  @Prop({
    description: "分类中包含的链接",
    required: true,
    ref: "Link",
    type: [mongoose.Schema.Types.ObjectId],
  })
  links: mongoose.Schema.Types.ObjectId[];
}

export const LinkCateSchema = SchemaFactory.createForClass(LinkCate);
