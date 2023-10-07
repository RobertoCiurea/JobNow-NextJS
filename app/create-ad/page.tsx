import React from "react";
import { ClientForm } from "@/components/index";
import { sendDataToDatabase } from "@/utilities/sendDataToDatabase";
const page = () => {
  return (
    //outer div
    <div className="flex flex-col justify-center items-center py-20 text-black relative">
      <h1 className="font-Manrope font-bold text-4xl py-10">
        Create your <span className="text-primary">ad</span>
      </h1>

      <ClientForm sendDataToDatabase={sendDataToDatabase} />
    </div>
  );
};

export default page;
