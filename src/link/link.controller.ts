import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { LinkService } from "./link.service";
import { CreateLinkDto } from "./dto/create-link.dto";
import { UpdateLinkDto } from "./dto/update-link.dto";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { AuthWrappedRequest } from "@/utils/types/http";

@UseGuards(JwtAuthGuard)
@Controller("link")
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post("create")
  create(
    @Body() createLinkDto: CreateLinkDto,
    @Request() req: AuthWrappedRequest,
  ) {
    return this.linkService.create(createLinkDto, req.user.account);
  }

  @Post("findAll")
  findAll(@Request() req: AuthWrappedRequest) {
    return this.linkService.findAll(req.user.account);
  }

  @Post("find")
  findOne(@Query("_id") _id: string) {
    return this.linkService.findOne(_id);
  }

  @Post("update")
  update(@Query("_id") _id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linkService.update(_id, updateLinkDto);
  }

  @Post("delete")
  remove(@Query("_id") _id: string) {
    return this.linkService.remove(_id);
  }
}
