import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { LinkIconDisplayModeEnum } from "./types";

@Schema({
  timestamps: true,
  collection: "link",
})
export class Link {
  @Prop({
    description: "所属用户",
    required: true,
    ref: "user",
    immutable: true,
  })
  account: string;

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
    description: "链接图标展示方式",
    default: LinkIconDisplayModeEnum.FirstChar,
  })
  displayMode: LinkIconDisplayModeEnum;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
