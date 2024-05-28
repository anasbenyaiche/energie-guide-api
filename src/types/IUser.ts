import { Document } from "mongoose";

export enum roleEnum {
  admin = "admin",
  editor = "editor",
}
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "admin" | "editor";
}
