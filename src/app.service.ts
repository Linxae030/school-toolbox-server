import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import mongoose from "mongoose";

@Injectable()
export class AppService implements OnApplicationShutdown {
  async onApplicationShutdown() {
    await mongoose.disconnect();
  }
}
