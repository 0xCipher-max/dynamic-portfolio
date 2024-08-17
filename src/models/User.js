import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  {
    timeStamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
