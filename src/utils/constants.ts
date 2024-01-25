export const JWT_CONFIG = {
  secret: "GGBond", // 密钥
  expiresIn: "24h", // token有效时间
};

export const OMIT_KEY_PRESET = {
  ID_V: ["_id", "__v"],
  ID: ["_id"],
  V: ["__v"],
};
