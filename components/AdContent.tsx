"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import getAdById from "@/utilities/getAdById";
//add ad to favorites server function
import { addToFavorite } from "@/utilities/addToFavorite";
//delete ad from databse
import { deleteAd } from "@/utilities/deleteAd";
//redirect context from ad page
import { RedirectContext } from "@/app/ads/[id]/page";
//icons svg from icons folder
import HeartIconFocused from "@/public/icons/heart-gray.svg";
import HeartIconNeutral from "@/public/icons/heart-neutral.svg";
import Marker from "@/public/icons/location-marker.svg";
import Clock from "@/public/icons/clock.svg";
import Hashtag from "@/public/icons/hashtag.svg";
import Spinner from "@/public/icons/spinner.svg";
import Clipboard from "@/public/icons/clipboard.svg";
import Edit from "@/public/icons/edit.svg";
import Delete from "@/public/icons/delete.svg";
import Image from "next/image";
//Custom Button
import { CustomButton } from "@/components/index";
//session from next auth
import { useSession } from "next-auth/react";

//toastify notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdContent = ({ adId }) => {
  const session = useSession();
  const userEmail = session.data?.user.email;
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
  const onClick = () => {
    if (userEmail) {
      setFavorite((currentState) => !currentState);
      addToFavorite(ad._id, favorite, userEmail);
    } else {
      toast.error("You must be logged in to add to favorites!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    getAds().then((response) => {
      setAd(response);
      setLoading(false);
      console.log(response);
      if (response.favorites && response.favorites.includes(userEmail))
        setFavorite(true);
    });
  }, [adId, userEmail]);
  //tag types
  type tag = {
    title: string;
    _id: string;
  };

  //refs
  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //open dialog function
  const openModal = () => {
    if (!isModalOpen) {
      modalRef.current.show();
      setIsModalOpen(true);
    } else closeModal();
  };
  const closeModal = () => {
    modalRef.current.close();
    setIsModalOpen(false);
  };
  const modalOpenStyle = isModalOpen ? "flex" : "hidden";
  //delete ad ad redirect to home page
  const [setRedirected] = useContext(RedirectContext);
  const deleteAdAndRedirectUser = async (id: string) => {
    await setRedirected(true);
    deleteAd(id);
  };

  if (!loading && ad)
    return (
      <>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
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
            {/*Modal for deleting the ad */}
            <dialog
              className={`${modalOpenStyle} flex-col  justify-center z-10 shadow-xl mx-7 sm:mx-auto`}
              ref={modalRef}
            >
              <h1 className="font-Rubik p-3 text-lg">
                Are you sure you want to detele the ad with ID:{" "}
                <span className="font-bold">{ad._id}</span>
              </h1>
              <div className="flex justify-around py-3 mx-20">
                <CustomButton
                  title="Yes"
                  btnType="button"
                  styles="bg-primary text-white"
                  handleClick={() => deleteAdAndRedirectUser(ad._id)}
                />
                <CustomButton
                  title="No"
                  btnType="button"
                  styles="bg-red-600 text-white"
                  handleClick={closeModal}
                />
              </div>
            </dialog>
            {/*Edit and delete butons section */}
            {userEmail === ad.owner && (
              <section className="flex justify-between my-4">
                <CustomButton
                  title={"Edit"}
                  btnType={"button"}
                  styles="bg-lighter border-2 border-green-600 shadow-lg font-Rubik text-lg font-semibold transition flex justify-center gap-2 items-center hover:bg-light hover:border-green-700 hover:shadow-xl"
                  src={Edit}
                  width={20}
                  height={20}
                />
                <CustomButton
                  title={"Delete"}
                  btnType={"button"}
                  styles="bg-lighter border-2 border-red-600 shadow-lg font-Rubik text-lg font-semibold transition flex justify-center gap-2 items-center hover:bg-light hover:border-red-700 hover:shadow-xl"
                  src={Delete}
                  width={28}
                  height={28}
                  handleClick={openModal}
                />
              </section>
            )}
          </div>
          {/*Contact card */}
          <div className="flex flex-col gap-5 justify-center border-4 border-gray p-3 rounded-xl shadow-xl">
            <div className="w-full flex justify-center items-center">
              <Image
                src={ad.profileImage}
                alt="Image Banner"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
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
                onClick={() => navigator.clipboard.writeText(ad.email)}
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
            <CustomButton
              title={"Save to favorites"}
              btnType={"button"}
              styles={`flex justify-evenly items-center ${buttonStyles} p-2 rounded-2xl hover:bg-primaryHover font-Rubik text-lg ${textStyle}`}
              src={favorite ? HeartIconFocused : HeartIconNeutral}
              width={30}
              handleClick={onClick}
            />
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
