"use client";

import React, { useRef, useEffect, useState, createContext } from "react";
import { Hero, Main, CustomJobAd } from "@/components";
import getDataFromDatabase from "@/utilities/getDataFromDatabase";
import Image from "next/image";
//spinner
import Spinner from "@/public/icons/spinner.svg";
import { Ads } from "@/types";
//useSession from next-auth
import { useSession } from "next-auth/react";

export const SortContext = createContext(null);

const Home = () => {
  const [jobAds, setJobAds] = useState<any>([]);
  const session = useSession();
  const userEmail = session?.data?.user?.email;

  //sort state
  const [sort, setSort] = useState<String>("oldest");

  //fetch data from database
  const getAds = async () => {
    const data = await getDataFromDatabase();
    return data;
  };
  type SortContextType = {
    sort: String;
    setSort: React.Dispatch<React.SetStateAction<String>>;
  };
  //unite sort and setSort into an object to pass to context provider
  const sortContextValue: SortContextType = {
    sort,
    setSort,
  };
  useEffect(() => {
    getAds().then((response) => {
      setJobAds(response);
    });
  }, []);
  //console.log(jobAds);
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

  const scrollRef = useRef(null);

  // console.log(jobAds);
  return (
    <main className="w-full ">
      <Hero scrollRef={scrollRef} />
      {/*Send sort and setSort to be modified from child component by select tag and sort ads array by them */}
      <SortContext.Provider value={sortContextValue}>
        <Main scrollRef={scrollRef} />
        {/*Job ads are showing as a grid */}
        {jobAds.length === 0 ? (
          <Image
            src={Spinner}
            alt="Loading..."
            className="animate-spin flex mx-auto my-10"
            width={100}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 m lg:grid-cols-3 2xl:grid-cols-4 gap-20 px-20">
            {jobAds.length > 0 &&
              jobAds.map((ad: Ads, index) => (
                <CustomJobAd
                  date={ad.date}
                  title={ad.title}
                  tags={ad.tags}
                  salary={ad.salary}
                  location={ad.location}
                  company={ad.company}
                  phone={ad.phone}
                  description={ad.description}
                  email={ad.description}
                  id={ad._id}
                  client={userEmail}
                  favorites={ad.favorites}
                  key={index}
                />
              ))}
          </div>
        )}
      </SortContext.Provider>
    </main>
  );
};

export default Home;
