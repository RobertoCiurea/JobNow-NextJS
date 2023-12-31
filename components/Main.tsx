"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { SearchBar } from "./index";
import SearchIcon from "@/public/icons/search.svg";
import FilterIcon from "@/public/icons/filter.svg";
import { RefProps } from "@/types/index";
//main context to sort ads
import { SortContext } from "@/app/page";
const Main = ({ scrollRef, modalRef }: RefProps) => {
  //sort state
  const { sort, setSort } = useContext(SortContext);

  //handle the value from option tags and set it to the sort variable
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value;
    setSort(selectedSort);
    //console.log(sort);
  };
  //toggle the dialog on click
  //set state to check if dialog is opened or closed
  const [dialogOpened, setDialogOpened] = useState(false);
  const toggleDialog = () => {
    if (!dialogOpened) {
      modalRef.current.showModal();
      setDialogOpened(true);
    } else {
      modalRef.current.close();
      setDialogOpened(false);
    }
  };
  //close modal by clicking outside of dialog
  const closeModalOnOutsideClick = (e: MouseEvent) => {
    const dialogDimensions = modalRef.current.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      toggleDialog();
    }
  };
  //apply useEffect to add an event listener to the document
  useEffect(() => {
    if (dialogOpened) {
      document.body.addEventListener("click", closeModalOnOutsideClick);
    }
    return () => {
      document.body.removeEventListener("click", closeModalOnOutsideClick);
    };
  }, [dialogOpened]);
  return (
    <div
      className="flex px-5 md:px-12 pt-32 flex-col gap-10 mx-auto"
      ref={scrollRef}
    >
      {/*Title and sub title section */}
      <div>
        <h1 className="text-4xl md:text-5xl font-Rubik font-bold drop-shadow-xl pl-10">
          Search for <span className="text-primary">job</span> offers
        </h1>
        <p className="font-manrope text-lg ml-10 md:text-xl">
          Explore over <span className="text-primary">10,000</span> job offers
          that you might like!
        </p>
      </div>
      {/*Search and filter section */}
      <div className="flex  flex-col items-center sm:flex-row gap-5 sm:gap-20 px-10 ">
        {/*Search section */}
        <SearchBar
          placeholder="Search by job category..."
          imageSource={SearchIcon}
          type="text"
          inputStyles="bg-lighter font-Manrope rounded-full placeholder:text-black focus:outline focus:outline-primary pr-16 "
          imageStyles="bg-lighter rounded-full -ml-12  "
          width={32}
        />
        {/*Filter section */}
        <div className="flex gap-5 items-center">
          <h1 className="font Rubik text-xl md:text-2xl">Filter</h1>
          <Image
            src={FilterIcon}
            width={38}
            alt="Filter button"
            className="cursor-pointer"
            onClick={toggleDialog}
          />
        </div>
      </div>
      {/*Recomended jobs header section */}
      <div className="flex justify-around p-10 gap-10">
        <h1 className="font-Manrope font-bold text-xl md:text-3xl">
          Recommended <span className="text-primary ">Jobs</span>
        </h1>
        <div className="flex gap-5 items-center">
          <h1 className="font Rubik text-xl  font-semibold">Sort</h1>
          <select
            value={sort}
            onChange={handleSortChange}
            className="text-lg lg:text-xl font-Rubik cursor-pointer border-b-2 border-primary focus:border-2 focus:border-primary focus:rounded-full focus:outline-none   "
          >
            <option value="oldest" className="cursor-poiunter">
              Oldest
            </option>
            <option value="newest" className="cursor-poiunter">
              Newest
            </option>
            <option value="most-paid" className="cursor-pointer">
              Most paid
            </option>
            <option value="less-paid" className="cursor-pointer">
              Less paid
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Main;
