import {
  Controller,
  Post,
  Body,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { LinkService } from "./link.service";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";

import type { CreateLinkDto } from "./dto/createLink.dto";
import type { UpdateLinkDto } from "./dto/updateLink.dto";
import type { AuthWrappedRequest } from "@/utils/types/http";
import { genBaseSuccess } from "@/utils";
import { CreateCateDto } from "./dto/createCate.dto";
import { UpdateCateDto } from "./dto/updateCate.dto";

@UseGuards(JwtAuthGuard)
@Controller("link")
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post("createLink")
  createLink(
    @Body() createLinkDto: CreateLinkDto,
    @Request() req: AuthWrappedRequest,
  ) {
    return this.linkService.createLink(createLinkDto, req.user._id);
  }

  @Post("findAllLink")
  findAllLink(@Request() req: AuthWrappedRequest) {
    return this.linkService.findAllLink(req.user._id);
  }

  @Post("findLink")
  findLink(@Query("_id") _id: string) {
    return this.linkService.findLink(_id);
  }

  @Post("updateLink")
  updateLink(@Query("_id") _id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linkService.updateLink(_id, updateLinkDto);
  }

  @Post("deleteLink")
  deleteLink(@Query("_id") _id: string) {
    return this.linkService.deleteLink(_id);
  }

  @Post("createCate")
  createCate(
    @Body() createCateDto: CreateCateDto,
    @Request() req: AuthWrappedRequest,
  ) {
    return this.linkService.createCate(createCateDto, req.user._id);
  }

  @Post("findAllCate")
  findAllCate(@Request() req: AuthWrappedRequest) {
    return this.linkService.findAllCate(req.user._id);
  }

  @Post("findCate")
  findOneCate(@Query("_id") _id: string) {
    return this.linkService.findCate(_id);
  }

  @Post("updateCate")
  updateCate(@Query("_id") _id: string, @Body() updateCateDto: UpdateCateDto) {
    return this.linkService.updateCate(_id, updateCateDto);
  }

  @Post("deleteCate")
  deleteCate(@Query("_id") _id: string) {
    return this.linkService.deleteCate(_id);
  }
}
