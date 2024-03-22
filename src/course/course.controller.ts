import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Query,
} from "@nestjs/common";
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { AuthWrappedRequest } from "@/utils";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { DeleteCourseDto, UpdateWeekDto } from "./dto/delete-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";

@UseGuards(JwtAuthGuard)
@Controller("course")
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post("create")
  create(
    @Body() createCourseDto: CreateCourseDto,
    @Request() req: AuthWrappedRequest,
  ) {
    return this.courseService.create(createCourseDto, req.user._id);
  }

  @Post("findAll")
  findAll(@Request() req: AuthWrappedRequest) {
    return this.courseService.findAll(req.user._id);
  }

  @Post("update")
  update(
    @Body() updateCourseDto: UpdateCourseDto,
    @Request() req: AuthWrappedRequest,
  ) {
    return this.courseService.update(updateCourseDto, req.user._id);
  }

  @Post("delete")
  delete(
    @Body() deleteCourseDto: DeleteCourseDto,
    @Request() req: AuthWrappedRequest,
  ) {
    return this.courseService.delete(deleteCourseDto, req.user._id);
  }

  @Post("updateWeek")
  updateWeek(
    @Body() updateWeekDto: UpdateWeekDto,
    @Request() req: AuthWrappedRequest,
  ) {
    return this.courseService.updateWeek(updateWeekDto, req.user._id);
  }
}
