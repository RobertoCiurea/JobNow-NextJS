"use client";
import React, { useState, useEffect } from "react";
import getAdById from "@/utilities/getAdById";
//icons svg from icons folder
import HeartIconFocused from "@/public/icons/heart-gray.svg";
import HeartIconNeutral from "@/public/icons/heart-neutral.svg";
import Marker from "@/public/icons/location-marker.svg";
import Clock from "@/public/icons/clock.svg";
import Hashtag from "@/public/icons/hashtag.svg";
import Spinner from "@/public/icons/spinner.svg";
import Clipboard from "@/public/icons/clipboard.svg";
import Image from "next/image";

const AdContent = ({ adId }) => {
  const [ad, setAd] = useState<any>({});
  const [favorite, setFavorite] = useState(false);
  // console.log("The id from component is " + adId);
  //fetch data from database
  const getAds = async () => {
    const data = await getAdById(adId);
    return data;
  };
  const buttonStyles = favorite ? "bg-primaryHover" : "bg-primary";
  const textStyle = favorite ? "text-light" : "text-white";
  const [loading, setLoading] = useState(true);
  const modifyFavoriteState = () => {
    setFavorite((currentState) => !currentState);
  };

  useEffect(() => {
    getAds().then((response) => {
      setAd(response);
      setLoading(false);
      // console.log(response);
    });
  }, []);
  //tag types
  type tag = {
    title: string;
    _id: string;
  };
  if (!loading)
    return (
      <>
        {/*outter conetnt */}
        <div className="flex flex-col px-5 items-center justify-center gap-10 md:gap-28 md:flex-row my-10">
          {/*Left section */}
          <div className="flex flex-col">
            {/*Header */}
            <div className="flex flex-col justify-center border-b-2 border-lighter drop-shadow-2xl">
              {/*Top section (title, id and salary) */}
              <div className="flex justify-center gap-7 md:gap-20">
                {/*Title and id section */}
                <div className="flex flex-col">
                  <h1 className="font-Manrope text-lg sm:text-xl font-semibold">
                    {ad.title}
                  </h1>
                  <h1 className="font-Rubik text-sm text-light">ID {ad._id}</h1>
                </div>
                {/*Salary */}
                <div className="flex-col">
                  <h1 className="font-Rubik text-xl sm:text-2xl font-bold text-primary drop-shadow-xl">
                    {ad.salary} &euro;
                  </h1>
                  <h1>{ad.category}</h1>
                </div>
              </div>
            </div>

            {/*Important Informations */}
            <div className="flex flex-col p-3 gap-3 border-b-2 border-lighter">
              {/*Created at section */}
              <div className="flex gap-1">
                <Image src={Clock} alt="Location marker" width={23} />
                <h1 className="font-Rubik text-sm md:text-md">{ad.date}</h1>
              </div>
              {/*Location section */}
              <div className="flex gap-1">
                <Image src={Marker} alt="Location marker" />
                <h1 className="font-Rubik text-sm md:text-md">{ad.location}</h1>
              </div>
              {/*Tags */}
              {ad.tags && (
                <div className="flex flex-col sm:flex-row flex-around">
                  <div className="flex gap-1 items-center mb-3 sm:mb-0">
                    <Image src={Hashtag} alt="Location marker" width={17} />
                    <h1 className="font-Rubik sm:mr-2 md:mr-5 text-sm md:text-md">
                      Tags
                    </h1>
                  </div>
                  {/*tags list inline */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                    {ad.tags.map((tag: tag) => (
                      <span className="p-2 bg-medium rounded-2xl" key={tag._id}>
                        {tag.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/*Description */}
            <div className="p-3 flex flex-col">
              <h1 className="font-Rubik font-semibold text-lg text-light">
                Description
              </h1>
              <p className="font-Manrope">{ad.description}</p>
            </div>
          </div>
          {/*Contact card */}
          <div className="flex flex-col gap-5 justify-center border-4 border-gray p-3 rounded-xl shadow-xl">
            <h1 className="font-Rubik font-bold text-xl mx-auto">
              {ad.company}
            </h1>
            {/*Email */}
            <div className="flex gap-5 flex-grow">
              <h1 className="font-Rubik text-lg">
                <span className="font-semibold">Email</span>: {ad.email}
              </h1>
              <button
                className="transition-transform hover:-translate-y-1 "
                onClick={() => navigator.clipboard.writeText(ad.phone)}
              >
                <Image src={Clipboard} alt="Copy" width={25} />
              </button>
            </div>
            {/*Phone number */}
            <div className="flex gap-5">
              <h1 className="font-Rubik text-lg">
                <span className="font-semibold">Phone</span>: {ad.phone}
              </h1>
              <button
                className="transition-transform hover:-translate-y-1 "
                onClick={() => navigator.clipboard.writeText(ad.phone)}
              >
                <Image src={Clipboard} alt="Copy" width={22} />
              </button>
            </div>
            <button
              className={`flex justify-evenly items-center ${buttonStyles} p-2 rounded-2xl hover:bg-primaryHover`}
              onClick={modifyFavoriteState}
            >
              <h1 className={`font-Rubik text-lg ${textStyle}`}>
                Save to favorites
              </h1>
              <Image
                src={favorite ? HeartIconFocused : HeartIconNeutral}
                alt="Add to favorite"
                width={30}
                className="-ml-2"
              />
            </button>
          </div>
        </div>
      </>
    );
  else
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Image
          src={Spinner}
          alt="Loading..."
          className="animate-spin"
          width={150}
        />
      </div>
    );
};

export default AdContent;
