import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcryptjs from "bcryptjs";

import { SignupDTO } from "./dto/signUp.dto";
import { LoginDTO } from "./dto/login.dto";
import { User } from "./schema/user.schema";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async signUp(signupData: SignupDTO) {
    const { password, username } = signupData;
    if (!password || !username) return "信息不完整";
    const encryptedPassword = bcryptjs.hashSync(password, 10);
    const findUser = await this.UserModel.find({
      username,
    }).exec();
    if (findUser.length) return "用户已经存在";
    const createdUser = await this.UserModel.create({
      username,
      password: encryptedPassword,
    });
    if (!createdUser) return "用户创建失败";
    return createdUser;
  }

  login(loginData: LoginDTO) {
    return "u r login";
  }
}
