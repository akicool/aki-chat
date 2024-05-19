import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/akihirochat");
    console.log("connect");
  } catch (e) {
    console.log(e);
  }
};

export default connectDB;
