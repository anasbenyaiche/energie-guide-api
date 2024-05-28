import Page from "../models/Page";
import ContentBlock from "../models/ContentBlock";

export const getAllPages = async () => {
  return await Page.find();
};

export const getPageById = async (id: string) => {
  const page = await Page.findById(id);
  if (!page) {
    throw new Error("Page not found");
  }
  const contentBlocks = await ContentBlock.find({ page_id: id });
  return { page, contentBlocks };
};

export const createPage = async (
  title: string,
  slug: string,
  created_by: string
) => {
  console.log({ title, slug, created_by });
  const page = new Page({ title, slug, created_by });
  return await page.save();
};

export const updatePage = async (
  id: string,
  updateData: Partial<typeof Page>
) => {
  const updatedPage = await Page.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!updatedPage) {
    throw new Error("Page not found");
  }
  return updatedPage;
};

export const deletePage = async (id: string) => {
  const deletedPage = await Page.findByIdAndDelete(id);
  if (!deletedPage) {
    throw new Error("Page not found");
  }
  return deletedPage;
};
