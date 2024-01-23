import { BadRequestException } from "@nestjs/common";

export function genBaseErr(msg: string) {
  throw new BadRequestException(msg);
}

export function genBaseSuccess(data: Record<string, any>, msg?: string) {
  return {
    data,
    msg,
  };
}
