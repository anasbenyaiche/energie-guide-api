import Menu from "../models/Menu";
import MenuItem from "../models/MenuItem";
import { IMenu, IMenuQuery } from "../types/IMenu";

export const createMenu = async (
  title: string,
  placement: string,
  subtitle?: string
): Promise<IMenu> => {
  const menu = new Menu({ title, subtitle, placement });
  return await menu.save();
};

export const getAllMenus = async (params?: IMenuQuery): Promise<IMenu[]> => {
  const query = params ? { ...params } : {};
  return await Menu.find(query);
};
export const getMenuItemsByPlacement = async (placement: string) => {
  try {
    const menu = await Menu.findOne({ placement });
    if (!menu) {
      throw new Error("Menu not found");
    }

    const menuItems = await MenuItem.find({ menu_id: menu._id }).populate(
      "menu_id"
    );

    return { menu, menuItems };
  } catch (error) {
    throw error;
  }
};

export const getMenuById = async (id: string): Promise<IMenu | null> => {
  return await Menu.findById(id);
};

export const updateMenu = async (
  id: string,
  title: string,
  placement: string,
  subtitle?: string
): Promise<IMenu | null> => {
  return await Menu.findByIdAndUpdate(
    id,
    { title, subtitle, placement, updated_at: Date.now() },
    { new: true }
  );
};

export const deleteMenu = async (id: string): Promise<void> => {
  await Menu.findByIdAndDelete(id);
};
