import { Schema } from "mongoose";

export enum contentType {
  text = "text",
  image = "image",
  charts = "charts",
}

export interface IContentBlock extends Document {
  _id: string;
  page_id: Schema.Types.ObjectId;
  type: string;
  content: contentType;
  position: number;
  imageUrl?: string;
}
