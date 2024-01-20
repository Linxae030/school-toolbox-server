import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
// import { connectDB } from "./utils/db/connect";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableShutdownHooks();
  await app.listen(3000);
}

bootstrap();
