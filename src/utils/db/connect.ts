import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017", {
      dbName: "school-toolbox",
    });
    console.log("mongodb 连接成功");
  } catch (e) {
    console.log(e);
  }
}

export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log("mongodb已断开");
  } catch (e) {
    console.log(e);
  }
}
