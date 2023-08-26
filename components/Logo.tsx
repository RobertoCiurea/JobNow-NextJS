import React from "react";
import Image from "next/image";
import LogoImage from "@/public/icons/logo.svg";
const Logo = () => {
  return (
    <div>
      <div className="flex items-center gap-2 drop-shadow-2xl">
        <Image
          src={LogoImage}
          width="45"
          className="object-contain"
          alt="JobNow Logo image"
        />
        <h1 className="text-4xl font-Rubik font-bold text-primary">JobNow</h1>
      </div>
    </div>
  );
};

export default Logo;
