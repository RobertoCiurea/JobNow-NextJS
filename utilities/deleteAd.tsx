"use server";
import { adsModel } from "@/models/Ads";
import mongoose from "mongoose";
import { connectToDatabase } from "@/db";

export const deleteAd = async (id: string) => {
  "use server";
  try {
    connectToDatabase();
    const ID = await new mongoose.Types.ObjectId(id);
    await adsModel.deleteOne({ _id: ID });
    return true;
  } catch (error) {
    console.log(error);
  }
};
