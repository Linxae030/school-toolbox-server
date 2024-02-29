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
import { TargetService } from "./target.service";
import { CreateTargetDto } from "./dto/create-target.dto";
import { AuthWrappedRequest } from "@/utils";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { UpdateTargetDto } from "./dto/update-target.dto";
import { CompleteStageDto } from "./dto/complete-stage.dto";

@UseGuards(JwtAuthGuard)
@Controller("target")
export class TargetController {
  constructor(private readonly targetService: TargetService) {}

  @Post("create")
  create(
    @Body() createTargetDto: CreateTargetDto,
    @Request() req: AuthWrappedRequest,
  ) {
    const { targetName } = createTargetDto;
    return this.targetService.create(targetName, req.user._id);
  }

  @Post("findAll")
  findAll(@Request() req: AuthWrappedRequest) {
    return this.targetService.findAll(req.user._id);
  }

  @Post("update")
  update(
    @Query("targetId") targetId: string,
    @Body() updateTargetDto: UpdateTargetDto,
  ) {
    const { target } = updateTargetDto;
    return this.targetService.update(targetId, target);
  }

  // @Post(":id")
  // findOne(@Param("id") id: string) {
  //   return this.targetService.findOne(+id);
  // }

  @Post("delete")
  delete(@Query("targetId") targetId: string) {
    return this.targetService.delete(targetId);
  }

  @Post("completeStage")
  completeStage(@Body() completeStageDto: CompleteStageDto) {
    const { targetId, stageId } = completeStageDto;
    return this.targetService.completeStage(targetId, stageId);
  }

  @Post("completeStep")
  completeStep(@Body() completeStageDto: CompleteStageDto) {
    const { targetId, stageId } = completeStageDto;
    return this.targetService.completeStep(targetId, stageId);
  }
}
