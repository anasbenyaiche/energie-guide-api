import { Document } from "mongoose";

export interface IMenu extends Document {
  title: string;
  subtitle?: string;
  placement: string;
}
export interface IMenuQuery {
  title?: string;
  subtitle?: string;
  placement?: string;
}
