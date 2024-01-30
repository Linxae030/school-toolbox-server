import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LinkService } from "./link.service";
import { LinkController } from "./link.controller";
import { Link, LinkSchema } from "./schema/link.schema";
import { LinkCate, LinkCateSchema } from "./schema/linkCate.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Link.name, schema: LinkSchema },
      { name: LinkCate.name, schema: LinkCateSchema },
    ]),
  ],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
