"use server";
import { adsModel } from "@/models/Ads";
import mongoose from "mongoose";
import { connectToDatabase } from "@/db";
export const addToFavorite = async (
  id: string,
  fav: boolean,
  client: string
) => {
  "use server";
  try {
    connectToDatabase();
    const ID = await new mongoose.Types.ObjectId(id);

    //if it's in favorites remove it
    if (fav) {
      const updatedAd = await adsModel.findByIdAndUpdate(ID, {
        $pull: { favorites: client },
      });
      // console.log("Add removed from favorites");
      if (updatedAd) {
        return {
          body: { message: "Ad successfully removed from favorites" },
        };
      }
      console.log("Ad successfully removed from favorites");
      //if it's not in favorites ad it
    } else {
      const updatedAd = await adsModel.findByIdAndUpdate(ID, {
        $push: { favorites: client },
      });
      // console.log("Ad added to favorites");
      if (updatedAd) {
        return {
          body: { message: "Ad successfully added to favorites" },
        };
      }
      // console.log("Ad successfully added to favorites");
    }
  } catch (error) {
    console.log(error);
  }
};
