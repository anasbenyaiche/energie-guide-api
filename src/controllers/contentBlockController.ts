import { Request, Response, NextFunction } from "express";
import * as contentBlockService from "../services/contentBlockService";
import CustomError from "../errors/CustomError";

export const createContentBlock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pageId: page_id } = req.params;
    const { type, content, position } = req.body;
    const contentBlock = await contentBlockService.createContentBlock(
      page_id,
      type,
      content,
      position
    );
    res.status(201).json(contentBlock);
  } catch (error) {
    next(new CustomError(error.message, 400));
  }
};

export const getAllContentBlocksForPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pageId } = req.params;
    const contentBlocks = await contentBlockService.getAllContentBlocksForPage(
      pageId
    );
    res.json(contentBlocks);
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

export const getAllContentBlocks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO: ADDING PARAMS
    const contentBlocks = await contentBlockService.getAllContentBlocks();
    res.json(contentBlocks);
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
//@ts-ignore
export const updateContentBlock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contentBlockId = req.params.id;
    const { type, content } = req.body;
    const updatedContentBlock = await contentBlockService.updateContentBlock(
      contentBlockId,
      type,
      content
    );
    if (!updatedContentBlock) {
      return res.status(404).json({ message: "ContentBlock not found" });
    }
    res.json(updatedContentBlock);
  } catch (error) {
    next(new CustomError(error.message, 400));
  }
};

export const deleteContentBlock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contentBlockId = req.params.id;
    await contentBlockService.deleteContentBlock(contentBlockId);
    res.status(204).send();
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
