import { Request, Response, NextFunction } from "express";
import * as menuItemService from "../services/menuItemService";
import CustomError from "../errors/CustomError";

export const createMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const menu_id = req.params.id;
    const { title, link, order, page_id } = req.body;
    const menuItem = await menuItemService.createMenuItem(
      title,
      link,
      order,
      menu_id,
      page_id
    );
    res.status(201).json(menuItem);
  } catch (error) {
    next(new CustomError(error.message, 400));
  }
};

export const getAllMenuItems = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const menuItems = await menuItemService.getAllMenuItems();
    res.json(menuItems);
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
//@ts-ignore
export const getMenuItemById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const menuItemId = req.params.id;
    const menuItem = await menuItemService.getMenuItemById(menuItemId);
    if (!menuItem) {
      return res.status(404).json({ message: "MenuItem not found" });
    }
    res.json(menuItem);
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
//@ts-ignore
export const updateMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const menuItemId = req.params.id;
    const { title, link, order } = req.body;
    // Check if user is admin
    //@ts-ignore
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        message: "Only admin users are authorized to update menu item",
      });
    }
    const updatedMenuItem = await menuItemService.updateMenuItem(
      menuItemId,
      title,
      link,
      order
    );
    if (!updatedMenuItem) {
      return res.status(404).json({ message: "MenuItem not found" });
    }
    res.json(updatedMenuItem);
  } catch (error) {
    next(new CustomError(error.message, 400));
  }
};
//@ts-ignore
export const deleteMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const menuItemId = req.params.id;
    // Check if user is admin
    //@ts-ignore
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        message: "Only admin users are authorized to delete menu item",
      });
    }
    await menuItemService.deleteMenuItem(menuItemId);
    res.status(204).send();
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
