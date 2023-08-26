import React from "react";
import Image from "next/image";
import { SearchBarProps } from "@/types/index";
const SearchBar = ({
  placeholder,
  handleClick,
  imageSource,
  type,
  width,
  inputStyles,
  imageStyles,
}: SearchBarProps) => {
  return (
    <div className="relative flex">
      <input
        type={type}
        placeholder={placeholder}
        className={` focus:outline-none shadow-2xl py-2 px-3 ${inputStyles}  `}
      />
      {imageSource && (
        <Image
          src={imageSource}
          alt="Search Icon"
          width={width}
          className={`cursor-pointer ${imageStyles} `}
        />
      )}
    </div>
  );
};

export default SearchBar;
