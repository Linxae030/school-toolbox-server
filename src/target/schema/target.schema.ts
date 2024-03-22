import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export enum StageStatus {
  DOING = "green",
  DONE = "blue",
  TODO = "gray",
  FAIL = "red",
}
export type Stage = {
  _id: string;
  stageName: string;
  stageTime: string;
  status: StageStatus;
  innerStepConfig?: {
    current: number;
    items: {
      title: string;
      description?: string;
    }[];
  };
};
@Schema({
  timestamps: true,
  collection: "target",
})
export class Target {
  @Prop({
    description: "所属用户",
    required: true,
    ref: "User",
    immutable: true,
    type: mongoose.Schema.Types.ObjectId,
  })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({
    description: "目标名称",
    required: true,
  })
  targetName: string;

  @Prop({
    description: "目标阶段数组",
    required: true,
    type: [
      {
        stageName: { type: String, required: true },
        stageTime: { type: String, required: true },
        status: { type: String, required: true },
        innerStepConfig: {
          type: {
            current: { type: Number, required: true },
            items: {
              type: [
                {
                  title: { type: String, required: true },
                  description: { type: String },
                },
              ],
            },
          },
        },
      },
    ],
  })
  stages: Stage[];
}

export const TargetSchema = SchemaFactory.createForClass(Target);
