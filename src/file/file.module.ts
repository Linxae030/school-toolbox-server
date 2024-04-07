import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { FileService } from "./file.service";
import { FileController } from "./file.controller";
import { User, UserSchema } from "@/user/schema/user.schema";
import { File, FileSchema } from "./schema/file.schema";
import { FileTag, FileTagSchema } from "./schema/fileTag.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FileTag.name, schema: FileTagSchema },
      { name: File.name, schema: FileSchema },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MulterModule.registerAsync({
      useFactory() {
        return {
          storage: diskStorage({
            // 文件储存位置
            destination: "uploads",
            // 文件名定制
            filename: (req, file, callback) => {
              const path = `${Date.now()}-${Math.round(
                Math.random() * 1e10,
              )}${extname(file.originalname)}`;
              callback(null, path);
            },
          }),
        };
      },
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
