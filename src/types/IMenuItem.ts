import { Schema, Document } from "mongoose";

export interface IMenuItem extends Document {
  menu_id: Schema.Types.ObjectId;
  page_id: Schema.Types.ObjectId;
  position: number;
}
