import MenuItem from "../models/MenuItem";
import { IMenuItem } from "../types/IMenuItem";

export const createMenuItem = async (
  title: string,
  link: string,
  order: number
): Promise<IMenuItem> => {
  const menuItem = new MenuItem({ title, link, order });
  return await menuItem.save();
};

export const getAllMenuItems = async (): Promise<IMenuItem[]> => {
  return await MenuItem.find().sort({ order: 1 });
};

export const getMenuItemById = async (
  id: string
): Promise<IMenuItem | null> => {
  return await MenuItem.findById(id);
};

export const updateMenuItem = async (
  id: string,
  title: string,
  link: string,
  order: number
): Promise<IMenuItem | null> => {
  return await MenuItem.findByIdAndUpdate(
    id,
    { title, link, order, updated_at: Date.now() },
    { new: true }
  );
};

export const deleteMenuItem = async (id: string): Promise<void> => {
  await MenuItem.findByIdAndDelete(id);
};
