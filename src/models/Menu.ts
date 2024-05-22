import { Schema, model } from "mongoose";
import { IMenu } from "../types/IMenu";
const MenuSchema = new Schema<IMenu>(
  {
    title: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IMenu>("Menu", MenuSchema);
