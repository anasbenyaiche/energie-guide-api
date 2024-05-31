import { Schema, model } from "mongoose";
import { IMenu } from "../types/IMenu";
const MenuSchema = new Schema<IMenu>(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    placement: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default model<IMenu>("Menu", MenuSchema);
