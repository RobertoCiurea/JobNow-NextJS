"use client";
import React from "react";
import Image from "next/image";
import { CustomButton } from "./index";
import { RefProps } from "@/types/index";

const Hero = ({ scrollRef }: RefProps) => {
  function scrollToMain() {
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div className="flex flex-col  px-5 md:px-10 lg:flex-row m w-full  ">
      {/*left section */}
      <div className="flex flex-col gap-10 items-center justify-center">
        <h1 className="font-Rubik text-4xl md:text-5xl text-black font-bold  text-center drop-shadow-2xl z-0">
          Join us and get your <span className="text-primary">dream job</span>
        </h1>
        <CustomButton
          title="Explore more"
          styles="bg-primary text-sm  sm:text-base text-background font-Manrope  w-1/4 drop-shadow-2xl hover:bg-primaryHover"
          btnType="button"
          handleClick={scrollToMain}
        />
      </div>
      <div className="flex justify-center w-full lg:-mr-32">
        <Image
          src="/images/heroImage.jpg"
          alt="Background Image"
          width={700}
          height={500}
          className="object-contain w-full mt-10 rounded-2xl md:w-3/4 shadow-2xl bg-blend-exclusion"
        />
      </div>
    </div>
  );
};

export default Hero;
