"use client";
import React from "react";
import { CustomButtonProps } from "@/types";
import Image from "next/image";
const CustomButton = ({
  title,
  styles,
  handleClick,
  btnType,
  src,
  width,
  height,
}: CustomButtonProps) => {
  return (
    <button
      disabled={false}
      type={btnType || "button"}
      className={`px-5 rounded-3xl p-2 text-center ${styles}`}
      onClick={() => {}}
    >
      {title}
      {src && <Image src={src} width={width} height={height} alt={title} />}
    </button>
  );
};

export default CustomButton;
