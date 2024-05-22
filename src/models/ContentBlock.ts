import { Schema, model } from "mongoose";
import { IContentBlock } from "../types/IContentBlock";

const ContentBlockSchema = new Schema<IContentBlock>(
  {
    page_id: { type: Schema.Types.ObjectId, ref: "Page", required: true },
    type: { type: String, required: true },
    content: { type: Schema.Types.Mixed, required: true },
    position: { type: Number, required: true },
  },
  { timestamps: true }
);

export default model<IContentBlock>("ContentBlock", ContentBlockSchema);
