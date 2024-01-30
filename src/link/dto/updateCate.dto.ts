import { OmitAccount } from "@/utils";
import { LinkCate } from "../schema/linkCate.schema";

export type UpdateCateDto = Partial<OmitAccount<LinkCate>>;
