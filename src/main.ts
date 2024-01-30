import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ResponseSuccessInterceptor } from "@/utils/interceptor";
import { ResponseFailedFilter } from "@/utils/filter";
// import { connectDB } from "./utils/db/connect";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseSuccessInterceptor());
  app.useGlobalFilters(new ResponseFailedFilter());
  app.enableCors();
  // app.enableShutdownHooks();
  await app.listen(3000);
}

bootstrap();
