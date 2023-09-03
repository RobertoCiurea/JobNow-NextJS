"use client";
import React, { useState, useEffect } from "react";
//next auth
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import AccountIcon from "@/public/icons/account.svg";

import { CustomButton, Logo } from "@/components/index";
const Navbar = () => {
  //hamburger menu state changing on click
  const [hamburger, setHamburger] = useState(false);

  const session = useSession();
  const userImage = session?.data?.user?.image;
  const slug = session?.data?.user?.name;

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

  return (
    <div className="flex px-10 py-5 justify-between">
      {/*Logo */}
      <Logo />
      {/*Right section */}

      {session && session?.data?.user ? (
        //desktop navigation
        <>
          <div className=" hidden sm:flex sm:gap-10  ">
            <CustomButton
              title="Sign Out"
              styles="bg-background text-primary font-bold border-2 border-primary flex text-lg justify-between  flex items-center gap-3 shadow-2xl hover:-translate-y-1 transition-transform  "
              btnType="button"
              src={AccountIcon}
              width={32}
              height={32}
              handleClick={() => signOut()}
            />
            <Link href={`/account/${slug}`}>
              <Image
                src={userImage!}
                alt="User image"
                width={52}
                height={52}
                className="object-contain rounded-full cursor-pointer hover:scale-125 transition-all shadow-2xl "
              />
            </Link>
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
                title="SIgn Out"
                styles="bg-primary text-background flex text-lg justify-between  flex items-center gap-3  "
                btnType="button"
                src={AccountIcon}
                width={23}
                height={23}
              />
              <Image
                src={session?.data?.user?.image!}
                alt="User image"
                width={52}
                height={52}
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
          handleClick={() => signIn()}
        />
      )}
    </div>
  );
};

export default Navbar;
