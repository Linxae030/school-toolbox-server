import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";

@Schema({
  // 使用timestamps自动生成createdAt和updatedAt字段
  timestamps: true,
  collection: "user",
})
export class User {
  @Prop({
    description: "用户名",
    required: true,
  })
  username: string;

  @Prop({
    description: "加密的密码",
    required: true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
