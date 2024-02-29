import mongoose from "mongoose";

export type OmitAccount<T> = Omit<T, "account">;
export type WithMongoId<T> = T & {
  _id: string;
};
