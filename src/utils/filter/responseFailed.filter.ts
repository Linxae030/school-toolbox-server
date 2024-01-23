import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class ResponseFailedFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const req = ctx.getRequest<Request>();
    const rep = ctx.getResponse<Response>();

    const status = exception.getStatus();

    rep.status(status).json({
      code: 0,
      ret: exception.message,
      status,
      time: new Date(),
      path: req.url,
    });
  }
}
