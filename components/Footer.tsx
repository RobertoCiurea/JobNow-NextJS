import React from "react";
import Link from "next/link";
import { Logo } from "./index";
const Footer = () => {
  return (
    <div className="grid grid-cols-2  py-20 px-10 place-items-center gap-10 md:grid-cols-3 lg:grid-cols-4">
      {/*Logo */}
      <div>
        <Logo />
        <div className="flex flex-col font-bold">
          <h1 className="pt-2 font-Rubik text-light">JobNow 2023</h1>
          <h1 className="text-sm font-Rubik text-light">
            All rights reserved &copy;
          </h1>
        </div>
      </div>
      <div className="flex flex-col gap-3 font-Rubik ">
        <h1 className="text-black font-bold">About us</h1>
        <Link
          href="/"
          className="font-bold text-light hover:translate-x-2 transition-transform"
        >
          How it works
        </Link>
        <Link
          href="/"
          className="font-bold text-light hover:translate-x-2 transition-transform"
        >
          Featured
        </Link>
        <Link
          href="/"
          className="font-bold text-light hover:translate-x-2 transition-transform"
        >
          Why JobNow
        </Link>
        <Link
          href="/"
          className="font-bold text-light hover:translate-x-2 transition-transform"
        >
          Parteners
        </Link>
      </div>
      <div className="flex flex-col gap-3 font-Rubik ">
        <h1 className="text-black font-bold">Company</h1>
        <Link
          href="/"
          className="font-bold text-light hover:translate-x-2 transition-transform "
        >
          Privacy Policy
        </Link>
        <Link
          href="/"
          className="font-bold text-light hover:translate-x-2 transition-transform "
        >
          Terms anc Conditions
        </Link>
        <Link
          href="/"
          className="font-bold text-light hover:translate-x-2 transition-transform "
        >
          Frequently Asked Questions
        </Link>
        <Link
          href="/"
          className="font-bold text-light hover:translate-x-2 transition-transform "
        >
          Contact Us
        </Link>
      </div>
      <div className="flex flex-col gap-3 font-Rubik ">
        <h1 className="text-black font-bold">Socials</h1>
        <Link
          href="/"
          className="font-bold text-light hover:translate-x-2 transition-transform "
        >
          Facebook
        </Link>
        <Link
          href="/"
          className="font-bold text-light hover:translate-x-2 transition-transform "
        >
          Instagram
        </Link>
        <Link
          href="/"
          className="font-bold text-light hover:translate-x-2 transition-transform "
        >
          Twitter
        </Link>
        <Link
          href="/"
          className="font-bold text-light hover:translate-x-2 transition-transform "
        >
          Discord
        </Link>
        <Link
          href="/"
          className="font-bold text-light hover:translate-x-2 transition-transform "
        >
          Telegram
        </Link>
      </div>
    </div>
  );
};

export default Footer;
