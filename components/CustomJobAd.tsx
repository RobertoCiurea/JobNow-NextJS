"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { CustomJobAdProps } from "@/types";
import { CustomButton } from "@/components/index";
import Heart from "@/public/icons/heart.svg";
import HeartFocused from "@/public/icons/Heart-focused.svg";
//next navigation redirect
import { useRouter } from "next/navigation";
//add ads to favourites list
import { addToFavorite } from "@/utilities/addToFavorite";
//notification context
import { NotificationContext } from "@/app/page";
const CustomJobAd = ({
  date,
  title,
  tags,
  salary,
  location,
  category,
  company,
  id,
  favorites,
  client,
}: CustomJobAdProps) => {
  //set ad to favorite (true/false) using useState

  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (favorites.includes(client) && client) {
      setFocused(true);
    }
  }, []);
  const [transition, setTransition] = useState("");

  //navigate state
  const router = useRouter();
  const sendUserToAdPage = (id: string) => {
    router.push(`/ads/${id}`, { scroll: false });
  };
  //notification context state
  const { setNotification } = useContext(NotificationContext);
  function onClick() {
    if (!client) {
      // alert("You have to be logged in to add tp favorites");
      setNotification(true);
    } else {
      setFocused((prevFocused: boolean) => !prevFocused);
      // console.log(focused);
      addToFavorite(id, focused, client);
      setTransition("transiton-all opacity-80 animate-bounce ");
      setInterval(() => {
        setTransition("transiton-all opacity-100 scale-120");
      }, 500);
    }
  }

  return (
    //job ad component
    //outer div
    <div className="flex flex-col border-2 border-lighter rounded-3xl p-2 bg-background">
      {/*Inner content */}
      {/*Top section */}
      <section className="flex flex-col bg-medium py-2 px-5 rounded-3xl">
        {/*Top date and favorite button */}
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
              className={transition}
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
        <h1>{category}</h1>
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
          handleClick={() => sendUserToAdPage(id)}
        />
      </div>
    </div>
  );
};

export default CustomJobAd;
