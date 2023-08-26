import React from "react";
import { Hero, Main } from "@/components";
const Home = () => {
  return (
    <main className="w-full  bg-[url('../public/images/background.svg')] bg-cover p-0">
      <Hero />
      <Main />
    </main>
  );
};

export default Home;
