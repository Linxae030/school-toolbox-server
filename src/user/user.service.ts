import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcryptjs from "bcryptjs";
import { User } from "./schema/user.schema";
import { genBaseErr } from "@/utils/utils";

import type { SignupDTO } from "./dto/signUp.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async signUp(signupData: SignupDTO) {
    const { password, account, nickname } = signupData;
    console.log("signupData", signupData);

    if (!password || !nickname || !account) return genBaseErr("信息不完整");

    const findUser = await this.UserModel.findOne({
      account,
    }).exec();
    if (findUser) return genBaseErr("用户已经存在");

    // 密码加密
    const encryptedPassword = bcryptjs.hashSync(password, 10);
    const createdUser = await this.UserModel.create({
      account,
      nickname,
      password: encryptedPassword,
    });
    if (!createdUser) return genBaseErr("用户注册失败");

    return "注册成功";
  }

  async findOne(account: string) {
    const findUser = await this.UserModel.findOne(
      { account },
      {
        account: 1,
        nickname: 1,
        password: 1,
      },
    ).exec();
    if (!findUser) return genBaseErr("未找到用户");
    return findUser;
  }
}
