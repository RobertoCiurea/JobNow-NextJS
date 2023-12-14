"use client";
import React, { createContext, useState } from "react";
import { ClientForm } from "@/components/index";
import { sendDataToDatabase } from "@/utilities/sendDataToDatabase";
import { redirect } from "next/navigation";

export const RedirectContext = createContext(null);
const page = () => {
  const [redirected, setRedirected] = useState("");
  type RedirectType = {
    redirected: string;
    setRedirected: React.Dispatch<React.SetStateAction<String>>;
  };
  const redirectValueContext: RedirectType = {
    redirected,
    setRedirected,
  };
  if (redirected) redirect(`/ads/${redirected}`);
  return (
    //outer div
    <div className="flex flex-col justify-center items-center py-20 text-black relative">
      <h1 className="font-Manrope font-bold text-4xl py-10">
        Create your <span className="text-primary">ad</span>
      </h1>
      <RedirectContext.Provider value={redirectValueContext}>
        <ClientForm sendDataToDatabase={sendDataToDatabase} />
      </RedirectContext.Provider>
    </div>
  );
};

export default page;
