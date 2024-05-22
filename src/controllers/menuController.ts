import { Request, Response, NextFunction } from "express";
import * as menuService from "../services/menuService";
import CustomError from "../errors/CustomError";

export const createMenu = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title } = req.body;
    const menu = await menuService.createMenu(title);
    res.status(201).json(menu);
  } catch (error) {
    next(new CustomError(error.message, 400));
  }
};

export const getAllMenus = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const menus = await menuService.getAllMenus();
    res.json(menus);
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
//@ts-ignore
export const getMenuById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const menuId = req.params.id;
    const menu = await menuService.getMenuById(menuId);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.json(menu);
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
//@ts-ignore
export const updateMenu = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const menuId = req.params.id;
    const { title } = req.body;
    // Check if user is admin
    // @ts-ignore
    if (req.user?.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admin users are authorized to update menu" });
    }
    const updatedMenu = await menuService.updateMenu(menuId, title);
    if (!updatedMenu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.json(updatedMenu);
  } catch (error) {
    next(new CustomError(error.message, 400));
  }
};
//@ts-ignore
export const deleteMenu = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const menuId = req.params.id;
    // Check if user is admin
    // @ts-ignore
    if (req.user?.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admin users are authorized to delete menu" });
    }
    await menuService.deleteMenu(menuId);
    res.status(204).send();
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
