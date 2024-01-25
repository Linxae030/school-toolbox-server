import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LinkService } from "./link.service";
import { LinkController } from "./link.controller";
import { Link, LinkSchema } from "./schema/link.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Link.name, schema: LinkSchema }]),
  ],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
