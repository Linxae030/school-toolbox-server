import {
  applyDecorators,
  UnsupportedMediaTypeException,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

export function upload(
  fieldName: string,
  maxCount?: number,
  options?: MulterOptions,
) {
  return applyDecorators(
    UseInterceptors(FilesInterceptor(fieldName, maxCount, options)),
  );
}

export function fileMimetypeFilter(...mimes: string[]) {
  return (
    req: any,
    // eslint-disable-next-line no-undef
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (mimes.some((mime) => file.mimetype.includes(mime))) {
      callback(null, true);
    } else {
      callback(new UnsupportedMediaTypeException("文件类型错误"), false);
    }
  };
}
