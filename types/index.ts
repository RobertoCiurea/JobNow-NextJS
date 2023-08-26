import { MouseEventHandler } from "react";

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
