import mongoose from "mongoose";

export default async function connectToDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/portfolio");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
}
