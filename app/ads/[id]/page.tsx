"use client";
import React, { useState, createContext } from "react";
import { AdContent } from "@/components";
//redirect from next navigation
import { redirect } from "next/navigation";
//create context to redirect user
export const RedirectContext = createContext(null);
//get the params of the page (that will include the ad id)
const Page = ({ params }: { params: { id: string } }) => {
  //recirect state
  const [redirected, setRedirected] = useState(false);
  //redirect user
  if (redirected) redirect("/");
  // console.log("The id from page is " + params.id);
  return (
    <RedirectContext.Provider value={[setRedirected]}>
      <AdContent adId={params.id} />
    </RedirectContext.Provider>
  );
};

export default Page;
