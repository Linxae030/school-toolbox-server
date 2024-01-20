import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { disconnectDB } from "./utils/db/connect";

@Injectable()
export class AppService implements OnApplicationShutdown {
  async onApplicationShutdown() {
    await disconnectDB();
  }
}
