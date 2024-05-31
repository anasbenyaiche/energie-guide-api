import { Request, Response, NextFunction } from "express";
import * as pageService from "../services/pageService";
import CustomError from "../errors/CustomError";

export const getAllPages = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pages = await pageService.getAllPages();
    res.json(pages);
  } catch (err) {
    next(new CustomError(err.message, 500));
  }
};

export const getPagesWithoutMenuItems = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pages = await pageService.getPagesWithoutMenuItems();
    res.json(pages);
  } catch (err) {
    next(new CustomError(err.message, 500));
  }
};

export const getPageById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const page = await pageService.getPageById(id);
    res.json(page);
  } catch (err) {
    next(new CustomError(err.message, 404));
  }
};

export const createPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, slug, created_by } = req.body;

    const newPage = await pageService.createPage(title, slug, created_by);
    res.status(201).json(newPage);
  } catch (err) {
    console.log(err);
    next(new CustomError(err.message, 400));
  }
};

export const updatePage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const updatedPage = await pageService.updatePage(id, req.body);
    res.json(updatedPage);
  } catch (err) {
    next(new CustomError(err.message, 400));
  }
};

export const deletePage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await pageService.deletePage(id);
    res.json({ message: "Page deleted" });
  } catch (err) {
    next(new CustomError(err.message, 500));
  }
};
