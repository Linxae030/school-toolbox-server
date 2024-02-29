import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

/** 性别 */
export enum Gender {
  /** 男 0 */
  Male,
  /** 女 1 */
  Female,
}

export interface DividedPart<T> {
  leftPart: T;
  rightPart: T;
}

export interface WithIcon<T> {
  icon?: string;
  content: T;
}

export type TextContent = string;
export type ListContent = string[];
export type TagContent = string;

export type GroupDetail = ListContent;
export type GroupDesc = ListContent;

/** 内容项时间范围 */
export type TimeRange = string[];

/** 分组内容配置 */
export interface GroupContent {
  /** 内容标题 */
  contentTitle?: string;
  /** 内容标签 */
  tags?: TagContent[];
  /** 内容时间范围 */
  timeRange?: TimeRange;
  /** 内容详情 */
  detail?: GroupDetail;
  /** 内容描述 */
  description?: GroupDesc;
}

/** 分组配置 */
export interface GroupConfig {
  /** 分组标题 */
  subtitle: string;
  /** 分组内容 */
  contents: GroupContent[];
}

/** 简历配置 */
export interface ResumeConfig {
  /** 简历标题 */
  title: string;
  /** 分组配置 */
  groupConfig: GroupConfig[];
  /** 个人信息 */
  personalInfo: DividedPart<WithIcon<string>[]>;
}

/** 简历 */
export interface ResumeType {
  /** 简历名称 */
  resumeName: string;
  /** 简历配置 */
  resumeConfig: ResumeConfig;
}

@Schema({
  timestamps: true,
  collection: "resume",
})
export class Resume {
  @Prop({
    description: "所属用户",
    required: true,
    ref: "User",
    immutable: true,
    type: mongoose.Schema.Types.ObjectId,
  })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({
    description: "简历名称",
    required: true,
  })
  resumeName: string;

  @Prop({
    description: "简历配置",
    required: true,
    type: {
      title: { type: String, required: true },
      groupConfig: [
        {
          subtitle: { type: String, required: true },
          contents: [
            {
              contentTitle: { type: String },
              tags: [{ type: String }],
              timeRange: [{ type: String }],
              detail: [{ type: String }],
              description: [{ type: String }],
            },
          ],
        },
      ],
      personalInfo: {
        leftPart: [
          {
            icon: { type: String },
            content: { type: String },
            clickAble: { type: Boolean },
          },
        ],
        rightPart: [
          {
            icon: { type: String },
            content: { type: String },
          },
        ],
      },
    },
  })
  resumeConfig: ResumeConfig;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
