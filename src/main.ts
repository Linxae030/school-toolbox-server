import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ResponseSuccessInterceptor } from "@/utils/interceptor";
import { ResponseFailedFilter } from "@/utils/filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseSuccessInterceptor());
  app.useGlobalFilters(new ResponseFailedFilter());
  app.enableCors();
  await app.listen(3000);
}

bootstrap();
