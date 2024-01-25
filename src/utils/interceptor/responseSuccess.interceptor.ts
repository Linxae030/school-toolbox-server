import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from "@nestjs/common";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import * as _ from "lodash";

interface DataWithMsg<T> {
  data: T;
  msg: string;
}

type Response<T> = DataWithMsg<T> & { code: number };

@Injectable()
export class ResponseSuccessInterceptor<T>
  implements NestInterceptor<DataWithMsg<T>, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<DataWithMsg<T>>,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((response) => {
        return {
          code: 1,
          msg: response.msg ?? (response as unknown as string),
          data: response.data,
        };
      }),
    );
  }
}
