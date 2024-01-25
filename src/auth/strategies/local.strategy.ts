import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "@/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    console.log("local init");
    super({
      usernameField: "account",
      passwordField: "password",
    });
  }

  // 重写validate方法
  async validate(account: string, password: string) {
    console.log("validate start");

    // 调用在服务层验证的方法
    const user = await this.authService.validateUser({ account, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
