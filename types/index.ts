import { MouseEventHandler } from "react";
import { Document } from "mongoose";
import mongoose from "mongoose";

export interface CustomButtonProps {
  title: string;
  styles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType: "button" | "submit";
  src?: string;
  width?: number;
  height?: number;
}

export interface SearchBarProps {
  placeholder: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  imageSource?: string;
  type: string;
  width?: number;
  inputStyles?: string;
  imageStyles?: string;
}

export interface RefProps {
  scrollRef: React.RefObject<HTMLDivElement> | null;
  modalRef?: React.RefObject<HTMLDivElement> | any;
}
export interface AdsProps extends Document {
  _id: mongoose.Types.ObjectId | string;
  owner: string;
  title: string;
  tags?: string[];
  salary: number;
  location: string;
  createdAt: Date;
  company: string;
  description: string;
  category: string;
  email: string;
  phone: number;
  favorites: string[];
}

export interface ClientContextTypes {
  tags: string[];
  setTags: (data: string | any) => void;
}
export interface TagsContentTypes {
  title: string;
  id: string;
}
export interface CustomJobAdProps {
  company: string;
  date: string;
  title: string;
  description: string;
  email: string;
  phone: number | string;
  salary: number;
  location: string;
  favorites: string[];
  category: string;
  client: string;
  tags?: string[];
  id?: string;
}

export interface Ads {
  company: string;
  date: string;
  description: string;
  email: string;
  location: string;
  owner: string;
  phone: number | string;
  salary: number;
  tags?: string[];
  title: string;
  favorites: string[];
  category: string;
  client: string;
  _id: string;
}
