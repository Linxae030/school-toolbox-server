import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LinkService } from "./link.service";
import { LinkController } from "./link.controller";
import { Link, LinkSchema } from "./schema/link.schema";
import { LinkCate, LinkCateSchema } from "./schema/linkCate.schema";
import { User, UserSchema } from "@/user/schema/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Link.name, schema: LinkSchema },
      { name: LinkCate.name, schema: LinkCateSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
