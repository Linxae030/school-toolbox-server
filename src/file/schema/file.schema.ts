import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { LinkIconDisplayModeEnum } from "./types";

@Schema({
  timestamps: true,
  collection: "file",
})
export class File {
  @Prop({
    description: "所属用户",
    required: true,
    ref: "User",
    immutable: true,
    type: mongoose.Schema.Types.ObjectId,
  })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({
    description: "文件名",
    required: true,
    type: String,
  })
  fileName: string;

  @Prop({
    description: "文件包含标签",
    required: true,
    ref: "fileTag",
    type: [mongoose.Schema.Types.ObjectId],
  })
  tags: mongoose.Schema.Types.ObjectId[];

  @Prop({
    description: "文件路径",
    required: true,
    type: String,
  })
  filePath: string;

  @Prop({
    description: "文件大小",
    required: true,
    type: Number,
  })
  fileSize: number;

  @Prop({
    description: "文件类型",
    required: true,
    type: String,
  })
  fileType: string;
}
export const FileSchema = SchemaFactory.createForClass(File);
