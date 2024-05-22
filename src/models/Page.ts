import { Schema, model } from "mongoose";
import { IPage } from "../types/IPage";

const PageSchema = new Schema<IPage>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default model<IPage>("Page", PageSchema);
