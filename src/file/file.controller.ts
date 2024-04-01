import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from "@nestjs/common";
import { FileService } from "./file.service";
import { CreateFileDto } from "./dto/create-file.dto";
import { UpdateFileDto } from "./dto/update-file.dto";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { CreateResumeDto } from "@/resume/dto/create-resume.dto";
import { AuthWrappedRequest } from "@/utils";

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

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create(createFileDto);
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.fileService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(+id, updateFileDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.fileService.remove(+id);
  }
}
