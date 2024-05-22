import ContentBlock from "../models/ContentBlock";
import { IContentBlock } from "../types/IContentBlock";

export const createContentBlock = async (
  pageId: string,
  type: string,
  content: string
): Promise<IContentBlock> => {
  const contentBlock = new ContentBlock({ pageId, type, content });
  return await contentBlock.save();
};

export const getAllContentBlocksForPage = async (
  pageId: string
): Promise<IContentBlock[]> => {
  return await ContentBlock.find({ pageId });
};

export const updateContentBlock = async (
  id: string,
  type: string,
  content: string
): Promise<IContentBlock | null> => {
  return await ContentBlock.findByIdAndUpdate(
    id,
    { type, content, updated_at: Date.now() },
    { new: true }
  );
};

export const deleteContentBlock = async (id: string): Promise<void> => {
  await ContentBlock.findByIdAndDelete(id);
};
