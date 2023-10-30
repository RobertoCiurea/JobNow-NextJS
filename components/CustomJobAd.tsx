"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CustomJobAdProps } from "@/types";
import { CustomButton } from "@/components/index";
import Heart from "@/public/icons/heart.svg";
import HeartFocused from "@/public/icons/Heart-focused.svg";

const CustomJobAd = ({
  date,
  title,
  tags,
  salary,
  location,
  company,
}: CustomJobAdProps) => {
  const [focused, setFocused] = useState(false);
  const [style, setStyle] = useState("");

  function onClick() {
    setFocused((prevFocused: boolean) => !prevFocused);
    setStyle("animate-spin");
    setInterval(() => {
      setStyle("");
    }, 1000);
    console.log(style);
  }

  return (
    //job ad component
    //outer div
    <div className="flex flex-col border-2 border-lighter rounded-3xl p-2 bg-background">
      {/*Inner content */}
      {/*Top section */}
      <section className="flex flex-col bg-medium py-2 px-5 rounded-3xl">
        {/*Top date and favourite button */}
        <div className="flex justify-between py-5">
          {/*Date section */}
          <div className="p-1 flex items-center px-2 bg-background rounded-3xl">
            <h1 className="font-rubik font-bold text-base ">{date}</h1>
          </div>
          {/*Heart Button */}
          <div className="bg-background p-2 rounded-full cursor-pointer">
            <Image
              src={focused ? HeartFocused : Heart}
              alt="Add to favourite"
              width={30}
              onClick={onClick}
              className={`${style}`}
            />
          </div>
        </div>
        {/*Title */}
        <h1 className="font-Manrope mr-52 text-xl"> {title}</h1>
        {/*Job tags */}
        <div className="flex flex-wrap gap-2 justify-center py-2">
          {/*tag */}
          {tags.map((tag: any, index: number) => (
            <h1
              className="font-Manrope border border-black rounded-3xl  px-5 flex  items-center"
              key={index}
            >
              {tag.title}
            </h1>
          ))}
        </div>
        <h1 className="font-semibold py-2 font-Manrope">{company} &copy;</h1>
      </section>
      {/*Bottom section */}
      <div className="flex justify-between p-5">
        {/*Salary adn location container */}
        <div className="flex flex-col ">
          <h1 className="font-Rubik font-bold">&euro; {salary}/mth</h1>
          <p className="font-Manrope"> {location}</p>
        </div>
        {/* Show Details button */}
        <CustomButton
          title="Details"
          btnType="button"
          styles="bg-primary p-0 font-Rubik text-background hover:bg-primaryHover"
        />
      </div>
    </div>
  );
};

export default CustomJobAd;
