"use server";
import { connectToDatabase } from "@/db";
import { adsModel } from "@/models/Ads";
import { AdsProps } from "@/types/index";

//next cache
import { revalidateTag } from "next/cache";
//send data to database

export const sendDataToDatabase = async (
  formData: FormData,
  tagsArr: String[]
) => {
  "use server";
  try {
    connectToDatabase();

    console.log("Connected to database");
    const newAd: AdsProps = new adsModel({
      title: formData.get("title"),
      salary: formData.get("salary"),
      company: formData.get("company"),
      owner: formData.get("owner"),
      description: formData.get("description"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      category: formData.get("category"),
      location: formData.get("location"),
      tags: tagsArr,
      favorites: [],
      createdAt: new Date(),
    });
    newAd.save();

    revalidateTag("ads");
    return newAd._id;
  } catch (error) {
    return {
      status: 500,
      body: { message: "An error occurred while creating the ad" },
    };
  }
};
