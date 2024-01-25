import { BadRequestException } from "@nestjs/common";
import * as _ from "lodash";
import { Schema } from "mongoose";

export function genBaseErr(msg: string) {
  throw new BadRequestException(msg);
}

export function genBaseSuccess(data: Record<string, any>, msg?: string) {
  return {
    data,
    msg,
  };
}

/** 检查数组是否均为有效值 */
export function checkArrayValues(arr: any[]) {
  return _.every(arr, (val) => !_.isNil(val) && !_.isNaN(val));
}

/** 生成不需要的检索key */
export function genOmitKey(arr: string[]) {
  return arr.reduce((temp, key) => {
    return { ...temp, [key]: 0 };
  }, {});
}

/** 检查数据key是否都在集合中 */
export function checkKeysInSchema(
  schema: Schema,
  data: Record<string, any>,
  forbiddenKeys?: string[],
) {
  const validKeys = Object.keys(schema.paths);

  const invalidKeys = Object.keys(data).filter(
    (key) => !validKeys.includes(key) || (forbiddenKeys ?? []).includes(key),
  );

  return invalidKeys.length === 0;
}
