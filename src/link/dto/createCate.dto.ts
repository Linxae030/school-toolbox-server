import { LinkCate } from "../schema/linkCate.schema";

export type CreateCateDto = Omit<LinkCate, "account">;
