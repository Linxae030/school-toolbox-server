import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({
  timestamps: true,
  collection: "fileTag",
})
export class FileTag {
  @Prop({
    description: "所属用户",
    required: true,
    ref: "User",
    immutable: true,
    type: mongoose.Schema.Types.ObjectId,
  })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({
    description: "标签名",
    required: true,
  })
  name: string;
}

export const FileTagSchema = SchemaFactory.createForClass(FileTag);
