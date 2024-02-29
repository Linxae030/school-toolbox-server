import { Request } from "express";
import { User } from "@/user/schema/user.schema";
import { WithMongoId } from "./utils";

export type AuthWrappedRequest = Request & {
  user: WithMongoId<User>;
};
