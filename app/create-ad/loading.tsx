import React from "react";
import Spinner from "@/public/icons/spinner.svg";
import Image from "next/image";
const loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Image src={Spinner} className="animate-spin" alt="Spinner" width={150} />
    </div>
  );
};

export default loading;
