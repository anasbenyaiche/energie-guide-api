import Menu from "../models/Menu";
import { IMenu } from "../types/IMenu";

export const createMenu = async (title: string): Promise<IMenu> => {
  const menu = new Menu({ title });
  return await menu.save();
};

export const getAllMenus = async (): Promise<IMenu[]> => {
  return await Menu.find();
};

export const getMenuById = async (id: string): Promise<IMenu | null> => {
  return await Menu.findById(id);
};

export const updateMenu = async (
  id: string,
  title: string
): Promise<IMenu | null> => {
  return await Menu.findByIdAndUpdate(
    id,
    { title, updated_at: Date.now() },
    { new: true }
  );
};

export const deleteMenu = async (id: string): Promise<void> => {
  await Menu.findByIdAndDelete(id);
};
