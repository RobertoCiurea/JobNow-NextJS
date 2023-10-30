"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AddIcon from "@/public/icons/add.svg";
import { CustomButton } from "@/components/index";
import { useSession } from "next-auth/react";
//spinner image
import Spinner from "@/public/icons/spinner.svg";
//Custom Job Ad Component
import { CustomJobAd } from "@/components/index";
//ad props
import { Ads } from "@/types";
//get my ads function
import getOwnerAds from "@/utilities/getOwnerAds";

const Page = () => {
  const session = useSession();
  const userImage = session?.data?.user?.image;
  const userName = session?.data?.user?.name;
  //fetch data from server
  const getData = async () => {
    const data = await getOwnerAds(userName);
    return data;
  };
  const [myAds, setMyAds] = useState([]);
  useEffect(() => {
    getData().then((response) => {
      setMyAds(response);
    });
  }, []);
  //chagnge state for active status of element
  const [active, setActive] = useState(true);

  const dashboardActiveStyles = active ? "text-primary" : "text-black";
  const favouriteActiveStyles = active ? "text-black" : "text-primary";

  function changeActiveStatus() {
    setActive((prevActive) => !prevActive);
  }
  if (session && session?.data?.user) {
    return (
      <>
        <div className="flex justify-between w-full flex-col px-10 pb-10 md:flex-row md:items-center lg:justify-around">
          {/*Top section */}
          <div className="flex items-center  gap-10 px-20 py-10">
            <Image
              src={userImage!}
              alt={userName!}
              width={100}
              height={100}
              className="rounded-full shadow-2xl"
            />
            <h1 className="font-Manrope text-4xl font-bold">
              Hello, <span className="text-primary">{userName}</span>
            </h1>
          </div>
          <div className="flex justify-center md:block">
            <Link href="/create-ad">
              <CustomButton
                title="Add"
                btnType="button"
                styles={
                  "bg-primary text-background w-1/4 flex gap-5 items-center text-xl md:w-full"
                }
                src={AddIcon}
                width={32}
                height={32}
              />
            </Link>
          </div>
        </div>
        <div className="flex justify-between px-10 mx-20 pt-10 pb-5 border-b-2 border-b-light md:justify-start md:gap-32">
          {/*Top section (menu) */}
          <h1
            className={`cursor-pointer font-Rubik font-bold text-2xl md:text-3xl ${dashboardActiveStyles}`}
            onClick={changeActiveStatus}
          >
            Dashboard
          </h1>
          <h1
            className={`cursor-pointer font-Rubik font-bold text-2xl md:text-3xl ${favouriteActiveStyles}`}
            onClick={changeActiveStatus}
          >
            Favourite
          </h1>
        </div>
        {myAds.length === 0 ? (
          <div className="w-full h-screen flex justify-center items-center">
            <Image
              src={Spinner}
              className="animate-spin"
              alt="Spinner"
              width={150}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 m lg:grid-cols-3 2xl:grid-cols-4 gap-20 px-20">
            {active &&
              myAds.map((ad: Ads, index: Number) => (
                <CustomJobAd
                  company={ad.company}
                  title={ad.title}
                  location={ad.title}
                  salary={ad.salary}
                  date={ad.date}
                  email={ad.email}
                  phone={ad.phone}
                  description={ad.description}
                  tags={ad.tags}
                  key={index}
                />
              ))}
          </div>
        )}
      </>
    );
  } else {
    return (
      <div className="flex justify-center items-center border-2 border-error p-5 m-20">
        <h1 className="font-Rubik text-4xl text-error">
          You don't have acces here!
        </h1>
      </div>
    );
  }
};

export default Page;
