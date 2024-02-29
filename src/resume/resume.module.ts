import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ResumeService } from "./resume.service";
import { ResumeController } from "./resume.controller";
import { Resume, ResumeSchema } from "./schema/resume.schema";
import { User, UserSchema } from "@/user/schema/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Resume.name, schema: ResumeSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ResumeController],
  providers: [ResumeService],
})
export class ResumeModule {}
