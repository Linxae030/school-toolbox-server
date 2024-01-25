import { Request } from "express";
import { User } from "@/user/schema/user.schema";

export type AuthWrappedRequest = Request & {
  user: User;
};
