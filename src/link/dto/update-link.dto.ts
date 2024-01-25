import { OmitAccount } from "@/utils";
import { Link } from "../schema/link.schema";

export type UpdateLinkDto = Partial<OmitAccount<Link>>;
