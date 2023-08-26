"use client";
import React, { useState } from "react";
import Image from "next/image";
import AddIcon from "@/public/icons/Add.svg";
import UserImage from "@/public/images/user.jpg";
import { CustomButton, Logo } from "@/components/index";
const Navbar = () => {
  //hamburger menu state changing on click
  const [hamburger, setHamburger] = useState(false);

  let topSpan: string = hamburger
    ? "rotate-45  translate-y-5 transition-transform "
    : " transition-transform ";
  let middleSpan: string = hamburger
    ? "opacity-0 transition-opacity"
    : "transition-opacity";
  let bottomSpan: string = hamburger
    ? "-rotate-45 -translate-y-3 transition-transform"
    : "transition-transform ";

  function onClick() {
    setHamburger((prevHamburger) => !prevHamburger);
  }
  const isLoggedIn: boolean = true;
  return (
    <div className="flex px-10 py-5 justify-between">
      {/*Logo */}
      <Logo />
      {/*Right section */}
      {isLoggedIn ? (
        //desktop navigation
        <>
          <div className=" hidden sm:flex sm:gap-10  ">
            <CustomButton
              title="Add"
              styles="bg-primary text-background flex text-lg justify-between  flex items-center gap-3 shadow-2xl hover:bg-primaryHover  "
              btnType="button"
              src={AddIcon}
              width={23}
              height={23}
            />
            <Image
              src={UserImage}
              alt="User image"
              width="52"
              className="object-contain rounded-full cursor-pointer hover:scale-125 transition-all shadow-2xl "
            />
          </div>
          {/*mobile navigation */}
          <div
            className="flex flex-col gap-2 w-12 cursor-pointer sm:hidden"
            onClick={onClick}
          >
            <span
              className={`w-full h-1/6 bg-primary rounded-xl ${topSpan}`}
            ></span>
            <span
              className={`w-full h-1/6 bg-primary rounded-xl ${middleSpan}`}
            ></span>
            <span
              className={`w-full h-1/6 bg-primary rounded-xl ${bottomSpan}`}
            ></span>
          </div>
          {/*Mobile side section (opnening on click) */}
          {hamburger && (
            <div className="flex flex-col gap-5 absolute right-0 top-20 px-5 bg-lighter py-10 items-center rounded-l-3xl shadow-2xl z-10">
              <CustomButton
                title="Add"
                styles="bg-primary text-background flex text-lg justify-between  flex items-center gap-3  "
                btnType="button"
                src={AddIcon}
                width={23}
                height={23}
              />
              <Image
                src={UserImage}
                alt="User image"
                width={52}
                className="object-contain rounded-full cursor-pointer hover:scale-125 transition-all "
              />
            </div>
          )}
        </>
      ) : (
        <CustomButton
          title="Sign up"
          styles="text-background bg-primary text-xl rounded-3xl text-center"
          btnType="button"
        />
      )}
    </div>
  );
};

export default Navbar;
