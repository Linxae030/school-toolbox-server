import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Req,
  Request,
} from "@nestjs/common";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthService } from "./auth.service";
import { genBaseSuccess } from "@/utils/utils";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 登录接口
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // 查询个人信息
  @UseGuards(JwtAuthGuard)
  @Post("profile")
  getProfile(@Request() req) {
    const { iat, exp, ...ret } = req.user ?? {};
    return genBaseSuccess(ret, "查询成功");
  }
}
