import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Link } from "./link.schema";

@Schema({
  timestamps: true,
  collection: "linkCate",
})
export class LinkCate {
  @Prop({
    description: "所属用户",
    required: true,
    ref: "user",
    immutable: true,
  })
  account: string;

  @Prop({
    description: "分类名",
    required: true,
  })
  name: string;

  @Prop({
    description: "分类中包含的链接",
    required: true,
  })
  links: Link[];
}

export const LinkCateSchema = SchemaFactory.createForClass(LinkCate);
