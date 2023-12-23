"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { SearchBarProps } from "@/types/index";
//search context from the main page parent
import { SearchContext } from "@/app/page";
const SearchBar = ({
  placeholder,
  handleClick,
  imageSource,
  type,
  width,
  inputStyles,
  imageStyles,
}: SearchBarProps) => {
  const [search, setSearch] = useContext(SearchContext);
  return (
    <div className="relative flex">
      <input
        type={type}
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
