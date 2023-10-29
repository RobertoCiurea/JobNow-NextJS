"use client";

import React, { useRef, useEffect, useState } from "react";
import { Hero, Main, CustomJobAd } from "@/components";
import getDataFromDatabase from "@/utilities/getDataFromDatabase";
import Image from "next/image";
//spinner
import Spinner from "@/public/icons/spinner.svg";
import { Ads } from "@/types";

const Home = () => {
  const [jobAds, setJobAds] = useState<any>([]);
  const getAds = async () => {
    const data = await getDataFromDatabase();
    return data;
  };

  useEffect(() => {
    getAds().then((response) => {
      setJobAds(response);
    });
  }, []);
  const scrollRef = useRef(null);
  // console.log(jobAds);
  return (
    <main className="w-full ">
      <Hero scrollRef={scrollRef} />
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
                key={index}
              />
            ))}
          <CustomJobAd
            date="26 August 2023"
            title="Oracle Backend Developer"
            tags={["Full Time", "Java", "SQL", "IT"]}
            salary={3500}
            location="Bucharest, RO"
            company=""
            phone=""
            description=""
            email=""
          />
          <CustomJobAd
            date="13 April 2006"
            title="PHP Web & Server Developer"
            tags={["PHP", "Backend", "Fullstack", "Server", "Full time"]}
            salary={5500}
            location="Berlin, DE"
            company=""
            phone=""
            description=""
            email=""
          />
        </div>
      )}
    </main>
  );
};

export default Home;
