import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { APP_GUARD } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LinkModule } from "./link/link.module";
import { UserModule } from "./user/user.module";
import { JwtAuthGuard } from "./utils";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/school-toolbox"),
    LinkModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
