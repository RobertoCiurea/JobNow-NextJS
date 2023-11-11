"use server";
import { adsModel } from "@/models/Ads";
import { AdsProps } from "@/types";
import { connectToDatabase } from "../db";
const getFavoritesAds = async (owner: string) => {
  const yearMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  try {
    connectToDatabase();
    const ads = await adsModel.find({ favorites: { $in: [owner] } });
    //simplify the ads for client component
    const simplifiedAds = ads.map((ad: AdsProps) => {
      //modify the date to something reasonable
      const date = ad.createdAt;
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      const actualMonth = yearMonths[month];
      const formattedDate = `${day} ${actualMonth} ${year}`;
      return {
        _id: ad._id.toString(),
        title: ad.title,
        salary: ad.salary,
        company: ad.company,
        owner: ad.owner,
        description: ad.description,
        email: ad.email,
        phone: ad.phone,
        location: ad.location,
        tags: ad.tags.map((tag: any) => {
          return {
            _id: tag._id.toString(),
            title: tag.title,
          };
        }),
        favorites: ad.favorites,
        date: formattedDate,
      };
    });
    // console.log(simplifiedAds);
    return simplifiedAds;
  } catch (error) {
    return {
      status: 500,
      body: { messsage: "An error occurred while searching for ads" },
      error: error.message,
    };
  }
};

export default getFavoritesAds;
