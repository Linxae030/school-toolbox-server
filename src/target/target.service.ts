import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import dayjs from "dayjs";
import * as _ from "lodash";
import { CreateTargetDto } from "./dto/create-target.dto";
import { User } from "@/user/schema/user.schema";
import { Stage, StageStatus, Target } from "./schema/target.schema";
import {
  OMIT_KEY_PRESET,
  genBaseErr,
  genBaseSuccess,
  genOmitKey,
} from "@/utils";

@Injectable()
export class TargetService {
  constructor(
    @InjectModel(Target.name) private TargetModel: Model<Target>,
    @InjectModel(User.name) private UserModel: Model<User>,
  ) {}

  async create(targetName: string, userId: string) {
    try {
      await this.TargetModel.create(this.getDefaultTarget(targetName, userId));
      return "创建成功";
    } catch (e) {
      return genBaseErr(e);
    }
  }

  async findAll(userId: string) {
    try {
      const res = await this.TargetModel.find(
        { user: userId },
        genOmitKey(OMIT_KEY_PRESET.V),
      ).populate("user");
      return _.isNil(res)
        ? genBaseErr("id不存在")
        : genBaseSuccess(res, "查询成功");
    } catch (e) {
      return genBaseErr(e);
    }
  }

  async update(targetId: string, target: Target) {
    try {
      const res = await this.TargetModel.findByIdAndUpdate(targetId, target, {
        new: true,
      });
      return _.isNil(res)
        ? genBaseErr("id不存在")
        : genBaseSuccess(res, "更新成功");
    } catch (e) {
      return genBaseErr(e);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} target`;
  }

  async delete(targetId: string) {
    try {
      const res = await this.TargetModel.findByIdAndDelete(targetId);
      return _.isNil(res)
        ? genBaseErr("id不存在")
        : genBaseSuccess(res, "删除成功");
    } catch (e) {
      return genBaseErr(e);
    }
  }

  async completeStage(targetId: string, stageId: string) {
    try {
      const res = await this.TargetModel.findById(targetId);
      const { stages } = res;
      if (_.isNil(res)) return genBaseErr("目标不存在");

      const findStageIndex = res.stages.findIndex(
        (stage) => stage._id.toString() === stageId,
      );
      if (findStageIndex === -1) {
        return genBaseErr("未找到该阶段");
      }
      /** 完成stage */
      stages[findStageIndex].status = StageStatus.DONE;
      stages[findStageIndex].innerStepConfig.current =
        stages[findStageIndex].innerStepConfig.items.length;
      // 将下一个赋为正在做
      if (findStageIndex !== stages.length - 1)
        stages[findStageIndex + 1].status = StageStatus.DOING;
      await res.save();
      return "阶段已完成";
    } catch (e) {
      return genBaseErr(e);
    }
  }

  async completeStep(targetId: string, stageId: string) {
    try {
      const res = await this.TargetModel.findById(targetId);

      if (_.isNil(res)) return genBaseErr("目标不存在");

      const findStage = res.stages.find(
        (stage) => stage._id.toString() === stageId,
      );
      if (!findStage) {
        return genBaseErr("未找到该阶段");
      }
      /** 完成stage */
      findStage.innerStepConfig.current += 1;
      if (
        findStage.innerStepConfig.current ===
        findStage.innerStepConfig.items.length
      ) {
        await this.completeStage(targetId, stageId);
      }
      await res.save();
      return "步骤已完成";
    } catch (e) {
      return genBaseErr(e);
    }
  }

  getDefaultTarget(targetName: string, userId: string): Target {
    const now = new Date();
    const stageTime = `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`;
    return {
      user: userId as unknown as ObjectId,
      targetName,
      stages: [
        {
          stageName: "阶段1",
          stageTime,
          status: StageStatus.DOING,
        },
      ] as Stage[],
    };
  }

  updateStageStatus() {}
}
