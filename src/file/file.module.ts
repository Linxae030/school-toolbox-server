import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FileService } from "./file.service";
import { FileController } from "./file.controller";
import { LinkCate, LinkCateSchema } from "@/link/schema/linkCate.schema";
import { User, UserSchema } from "@/user/schema/user.schema";
import { Link, LinkSchema } from "./schema/file.schema";
import { FileTag, FileTagSchema } from "./schema/fileTag.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FileTag.name, schema: FileTagSchema },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
