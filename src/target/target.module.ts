import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TargetService } from "./target.service";
import { TargetController } from "./target.controller";
import { User, UserSchema } from "@/user/schema/user.schema";
import { Target, TargetSchema } from "./schema/target.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Target.name, schema: TargetSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [TargetController],
  providers: [TargetService],
})
export class TargetModule {}
