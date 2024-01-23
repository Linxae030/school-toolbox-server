import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";

@Schema({
  // 使用timestamps自动生成createdAt和updatedAt字段
  timestamps: true,
  collection: "user",
})
export class User {
  @Prop({
    description: "账户",
    required: true,
  })
  account: string;

  @Prop({
    description: "昵称",
    required: true,
  })
  nickname: string;

  @Prop({
    description: "加密的密码",
    required: true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
