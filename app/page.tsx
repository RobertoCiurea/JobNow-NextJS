"use client";

import React, { useRef, useEffect, useState, createContext } from "react";
import { Hero, Main, CustomJobAd, Modal } from "@/components";
import getDataFromDatabase from "@/utilities/getDataFromDatabase";
import Image from "next/image";
//spinner
import Spinner from "@/public/icons/spinner.svg";
import { Ads } from "@/types";
//useSession from next-auth
import { useSession } from "next-auth/react";
//toastify notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//set the context provider
export const SortContext = createContext(null);
export const FilterContext = createContext(null);
export const NotificationContext = createContext(null);
export const SearchContext = createContext(null);

const Home = () => {
  const [jobAds, setJobAds] = useState<any>([]);
  const session = useSession();
  const userEmail = session?.data?.user?.email;

  //sort state
  const [sort, setSort] = useState<String>("oldest");

  //set the filter state for the modal
  const [salaryRange, setSalaryRange] = useState([0, 25000]);
  const [jobLocation, setJobLocation] = useState<String>("");

  //unlogged user notification system
  const [notification, setNotification] = useState(false);
  //fetch data from database
  const getAds = async () => {
    const data = await getDataFromDatabase();
    return data;
  };
  type SortContextType = {
    sort: String;
    setSort: React.Dispatch<React.SetStateAction<String>>;
  };
  type FilterContextType = {
    salaryRange: number[];
    setSalaryRange: React.Dispatch<React.SetStateAction<Number[]>>;
    jobLocation: String;
    setJobLocation: React.Dispatch<React.SetStateAction<String>>;
  };
  type NotificationContextType = {
    notification: Boolean;
    setNotification: React.Dispatch<React.SetStateAction<Boolean>>;
  };

  //unite sort and setSort into an object to pass to context provider
  const sortContextValue: SortContextType = {
    sort,
    setSort,
  };
  //unite the filter states
  const filterContextValue: FilterContextType = {
    salaryRange,
    setSalaryRange,
    jobLocation,
    setJobLocation,
  };
  //unite notification states for context provider
  const notificationContextValue: NotificationContextType = {
    notification,
    setNotification,
  };
  //search state for filtering the ads
  const [search, setSearch] = useState<String>("");
  // console.log(search);
  //filter the ads by the search querry state
  const filteredAds =
    search === ""
      ? jobAds
      : jobAds.filter((ad) => {
          return ad.category.toLowerCase().includes(search.toLowerCase());
        });

  // console.log(filteredAds);

  // console.log(filterContextValue);

  useEffect(() => {
    getAds().then((response) => {
      setJobAds(response);
    });
  }, []);

  //console.log(jobAds);
  //notifications from toastify
  if (notification) {
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
    setNotification(false);
  }

  //sort ads to newst to oldest
  if (sort === "oldest")
    //dateF - firts date
    //dateS - second date
    jobAds.sort((first, second) => {
      const dateF = new Date(first.date);
      const dateS = new Date(second.date);
      return dateF.getTime() - dateS.getTime();
    });
  else if (sort === "newest")
    jobAds.sort((first, second) => {
      const dateF = new Date(first.date);
      const dateS = new Date(second.date);
      return dateS.getTime() - dateF.getTime();
    });
  else if (sort === "most-paid") {
    jobAds.sort((first, second) => {
      return second.salary - first.salary;
    });
  } else if (sort === "less-paid") {
    jobAds.sort((first, second) => {
      return first.salary - second.salary;
    });
  }
  //refs
  const scrollRef = useRef(null);
  const modalRef = useRef(null);

  // console.log(jobAds);
  return (
    <main className="w-full ">
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
      <Hero scrollRef={scrollRef} />
      {/*Send sort and setSort to be modified from child component by select tag and sort ads array by them */}
      <SearchContext.Provider value={[search, setSearch]}>
        <SortContext.Provider value={sortContextValue}>
          <Main scrollRef={scrollRef} modalRef={modalRef} />
          <FilterContext.Provider value={filterContextValue}>
            <Modal modalRef={modalRef} />
          </FilterContext.Provider>
          {/*Job ads are showing as a grid */}
          {jobAds.length === 0 ? (
            <Image
              src={Spinner}
              alt="Loading..."
              className="animate-spin flex mx-auto my-10"
              width={100}
            />
          ) : (
            <NotificationContext.Provider value={notificationContextValue}>
              <div className="grid grid-cols-1 sm:grid-cols-2 m lg:grid-cols-3 2xl:grid-cols-4 gap-20 px-20">
                {jobAds.length > 0 && filteredAds.length > 0 ? (
                  filteredAds.map((ad: Ads, index: number) => {
                    const meetsSalaryCriteria =
                      ad.salary >= salaryRange[0] &&
                      ad.salary <= salaryRange[1];

                    const meetsLocationCriteria = jobLocation
                      ? ad.location === jobLocation
                      : true; // If jobLocation is empty, consider it as meeting the location criteria

                    if (meetsSalaryCriteria && meetsLocationCriteria) {
                      return (
                        <CustomJobAd
                          date={ad.date}
                          title={ad.title}
                          tags={ad.tags}
                          salary={ad.salary}
                          location={ad.location}
                          category={ad.category}
                          company={ad.company}
                          phone={ad.phone}
                          description={ad.description}
                          email={ad.email}
                          id={ad._id}
                          client={userEmail}
                          favorites={ad.favorites}
                          key={index}
                        />
                      );
                    }

                    return null;
                  })
                ) : (
                  <div className="mx-auto font-Rubik text-2xl">
                    No ads found!
                  </div>
                )}
              </div>
            </NotificationContext.Provider>
          )}
        </SortContext.Provider>
      </SearchContext.Provider>
    </main>
  );
};

export default Home;
