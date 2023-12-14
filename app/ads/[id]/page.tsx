import React from "react";
import { AdContent } from "@/components";
const Page = ({ params }: { params: { id: string } }) => {
  //get the params of the page (that will include the ad id)
  // console.log("The id from page is " + params.id);
  return <AdContent adId={params.id} />;
};

export default Page;
