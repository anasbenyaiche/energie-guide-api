import ContentBlock from "../models/ContentBlock";
import { IContentBlock } from "../types/IContentBlock";

export const createContentBlock = async (
  page_id: string,
  type: string,
  content: string,
  position: number,
  imageUrl: string
): Promise<IContentBlock> => {
  const contentBlock = new ContentBlock({ page_id, type, content, position, imageUrl });
  return await contentBlock.save();
};

export const getAllContentBlocksForPage = async (
  pageId: string
): Promise<IContentBlock[]> => {
  return await ContentBlock.find({ pageId });
};

export const getAllContentBlocks = async (): Promise<IContentBlock[]> => {
  return await ContentBlock.find();
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
export const updateContentBlockPositions = async (
  blocks: IContentBlock[]
): Promise<void> => {
  const bulkOps = blocks.map(block => ({
    updateOne: {
      filter: { _id: block._id },
      update: { $set: { position: block.position } }
    }
  }));
  await ContentBlock.bulkWrite(bulkOps);
};
