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
import { ResumeService } from "./resume.service";
import { CreateResumeDto } from "./dto/create-resume.dto";
import { UpdateResumeDto } from "./dto/update-resume.dto";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { AuthWrappedRequest } from "@/utils";

@UseGuards(JwtAuthGuard)
@Controller("resume")
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post("create")
  create(
    @Body() createResumeDto: CreateResumeDto,
    @Request() req: AuthWrappedRequest,
  ) {
    return this.resumeService.create(createResumeDto, req.user._id);
  }

  @Post("findAll")
  findAll(@Request() req: AuthWrappedRequest) {
    return this.resumeService.findAll(req.user._id);
  }

  @Post("findOne")
  findOne(@Query("_id") _id: string) {
    return this.resumeService.findOne(_id);
  }

  @Post("delete")
  delete(@Query("_id") _id: string) {
    return this.resumeService.delete(_id);
  }

  @Post("update")
  update(@Query("_id") _id: string, @Body() updateResumeDto: UpdateResumeDto) {
    return this.resumeService.update(_id, updateResumeDto);
  }
}
