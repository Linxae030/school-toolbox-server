import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as _ from "lodash";
import * as bcrypt from "bcryptjs";
import { UserService } from "@/user/user.service";
import { LoginDTO } from "@/user/dto/login.dto";
import { User } from "@/user/schema/user.schema";
import { genBaseErr, genBaseSuccess } from "@/utils/utils";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // 验证用户有效性，这个在local策略里用到
  async validateUser(loginUserDto: LoginDTO): Promise<any> {
    const { account, password } = loginUserDto;

    if (_.isEmpty(account) || _.isEmpty(password)) {
      return genBaseErr("信息不完整");
    }

    const user = await this.userService.findOne(account);
    if (!user || _.isEmpty(user)) return genBaseErr("未找到该用户");

    const isValidPwd = await bcrypt.compare(password, user.password);

    if (!isValidPwd) {
      return genBaseErr("密码不匹配");
    }

    const sanitizedUser = {
      _id: user._id,
      account: user.account,
      nickname: user.nickname,
    };
    return sanitizedUser;
  }

  // 登录接口服务层
  async login(user: User) {
    const payload = {
      account: user.account,
      nickname: user.nickname,
      // @ts-expect-error 有的啊
      _id: user._id,
    };
    const token = this.jwtService.sign(payload);
    return genBaseSuccess({ token, ...payload }, "登陆成功");
  }
}
