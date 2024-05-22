import { Schema, Document } from "mongoose";

export interface IPage extends Document {
  title: string;
  slug: string;
  created_by: Schema.Types.ObjectId;
}
