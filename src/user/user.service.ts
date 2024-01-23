import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcryptjs from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

import { SignupDTO } from "./dto/signUp.dto";
import { LoginDTO } from "./dto/login.dto";
import { User } from "./schema/user.schema";
import { genBaseErr, genBaseSuccess } from "@/utils/utils";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private readonly JwtService: JwtService,
  ) {}

  async signUp(signupData: SignupDTO) {
    const { password, account, nickname } = signupData;

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

    return genBaseSuccess({}, "注册成功");
  }

  async login(loginData: LoginDTO) {
    const { account, password } = loginData;
    const findUser = await this.UserModel.findOne({ account }).exec();
    if (!findUser) return genBaseErr("尚未注册");
    // 找到了对比密码
    const compareRes: boolean = bcryptjs.compareSync(
      password,
      findUser.password,
    );
    // 密码不正确
    if (!compareRes) return genBaseErr("密码不正确");

    const payload = { account };
    return genBaseSuccess(
      {
        token: this.JwtService.sign(payload),
      },
      "登录成功",
    );
  }
}
