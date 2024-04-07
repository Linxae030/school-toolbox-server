/* eslint-disable no-undef */
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Query,
  UploadedFiles,
  Res,
  Get,
} from "@nestjs/common";
import { Response } from "express";
import { join } from "path";
import { FileService } from "./file.service";
import { UpdateFileDto } from "./dto/update-file.dto";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { AuthWrappedRequest, Public } from "@/utils";
import { upload } from "@/utils/decorator/upload";

@UseGuards(JwtAuthGuard)
@Controller("file")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post("addTag")
  addTag(@Query("name") name: string, @Request() req: AuthWrappedRequest) {
    return this.fileService.addTag(name, req.user._id);
  }

  @Post("findAllTags")
  findAllTags(@Request() req: AuthWrappedRequest) {
    return this.fileService.findAllTags(req.user._id);
  }

  @Post("updateTag")
  updateTag(
    @Body() updateTagDto: UpdateFileDto,
    @Request() req: AuthWrappedRequest,
  ) {
    return this.fileService.updateTag(updateTagDto, req.user._id);
  }

  @Post("deleteTag")
  deleteTag(@Query("_id") _id: string) {
    return this.fileService.deleteTag(_id);
  }

  @Post("uploadFiles")
  @upload("files")
  uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body("tags") tags: string[],
    @Request() req: AuthWrappedRequest,
  ) {
    console.log(this);

    return this.fileService.uploadFiles(files, tags, req.user._id);
  }

  @Post("findFile")
  findFile(@Query("_id") _id: string) {
    return this.fileService.findFile(_id);
  }

  @Post("findFiles")
  findFiles(@Request() req: AuthWrappedRequest, @Body("tags") tags: string[]) {
    return this.fileService.findFiles(req.user._id, tags);
  }

  @Post("deleteFile")
  deleteFile(@Query("_id") _id: string) {
    return this.fileService.deleteFile(_id);
  }

  @Post("deleteFiles")
  deleteFiles(@Body("ids") ids: string[]) {
    return this.fileService.deleteFiles(ids);
  }

  @Public()
  @Get("downloadFile")
  downloadFile(@Query("_id") _id: string, @Res() res: Response) {
    return this.fileService.downloadFile(_id, res);
  }

  @Public()
  @Post("downloadFiles")
  downloadFiles(@Body("ids") ids: string[], @Res() res: Response) {
    console.log("ids", ids);
    return this.fileService.downloadFiles(ids, res);
  }

  @Post("checkFileUnique")
  checkFileUnique(
    @Request() req: AuthWrappedRequest,
    @Body("fileNames") fileNames: string[],
  ) {
    return this.fileService.checkFileUnique(fileNames, req.user._id);
  }
}
