import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { APP_GUARD } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LinkModule } from "./link/link.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ResumeModule } from "./resume/resume.module";
import { TargetModule } from "./target/target.module";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/school-toolbox"),
    LinkModule,
    UserModule,
    AuthModule,
    ResumeModule,
    TargetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
