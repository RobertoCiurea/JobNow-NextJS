import * as React from "react";
import { Hero, Main, CustomJobAd } from "@/components";
const Home = () => {
  return (
    <main className="w-full ">
      <Hero />
      <Main />
      <div className="grid grid-cols-1 sm:grid-cols-2 m lg:grid-cols-3 2xl:grid-cols-4 gap-20 px-20">
        <CustomJobAd
          createdAt="26 August 2023"
          title="Oracle Backend Developer"
          tags={["Full Time", "Java", "SQL", "IT"]}
          salary={3500}
          location="Bucharest, RO"
        />
        <CustomJobAd
          createdAt="13 April 2006"
          title="PHP Web & Server Developer"
          tags={["PHP", "Backend", "Fullstack", "Server", "Full time"]}
          salary={5500}
          location="Berlin, DE"
        />
      </div>
    </main>
  );
};

export default Home;
