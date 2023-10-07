import { MouseEventHandler } from "react";
import { Document } from "mongoose";
//next auth session
import { Session } from "next-auth";
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

export interface CustomJobAdProps {
  createdAt: string;
  title: string;
  tags: string[];
  salary: number;
  location: string;
}

export interface RefProps {
  scrollRef: React.RefObject<HTMLDivElement> | null;
}
export interface AdsProps extends Document {
  owner: string;
  title: string;
  tags?: string[];
  salary: number;
  location: string;
  createdAt: Date;
}
export interface ClientContextTypes {
  tags: string[];
  setTags: (data: string | any) => void;
}
