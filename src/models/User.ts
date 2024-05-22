import { Schema, model } from "mongoose";
import { IUser } from "../types/IUser";

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "editor"], default: "editor" },
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
