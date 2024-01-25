import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "@/user/user.module";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { AuthController } from "./auth.controller";
import { JWT_CONFIG } from "@/utils";

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: JWT_CONFIG.secret, // 设置私钥
      signOptions: { expiresIn: JWT_CONFIG.expiresIn }, // 过期时间
    }),
  ],
  controllers: [AuthController],
  // 注入策略模块
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
