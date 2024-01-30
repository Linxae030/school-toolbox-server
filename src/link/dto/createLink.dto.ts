import { Link } from "../schema/link.schema";

export type CreateLinkDto = Omit<Link, "account">;
