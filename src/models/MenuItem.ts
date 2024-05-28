import { Schema, model } from "mongoose";
import { IMenuItem } from "../types/IMenuItem";

const MenuItemSchema = new Schema<IMenuItem>(
  {
    menu_id: { type: Schema.Types.ObjectId, ref: "Menu", required: true },
    page_id: { type: Schema.Types.ObjectId, ref: "Page", required: true },
    order: { type: Number, required: true },
    title: { type: String, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IMenuItem>("MenuItem", MenuItemSchema);
