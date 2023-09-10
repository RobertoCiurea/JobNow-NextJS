import { ClientForm } from "@/components/index";
import { connectToDatabase } from "@/db";
import { adsModel } from "@/models/Ads";
import { AdsProps } from "@/types/index";

//send data to database
async function sendDataToDatabase(formData: FormData, tags: string[]) {
  "use server";
  try {
    connectToDatabase();
    console.log("Connected to database");
    const newAd: AdsProps = new adsModel({
      title: formData.get("title"),
      salary: formData.get("salary"),
      owner: formData.get("owner"),
      description: formData.get("description"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      location: formData.get("location"),
      tags: tags,
      createdAt: new Date(),
    });
    newAd.save();
    console.log(newAd);

    return {
      status: 201,
      body: { message: "Ad created successfully" },
    };
  } catch (error) {
    return {
      status: 500,
      body: { message: "An error occurred while creating the ad" },
    };
  }
}
const page = () => {
  return (
    //outer div
    <div className="flex flex-col justify-center items-center py-20 text-black relative">
      <h1 className="font-Manrope font-bold text-4xl py-10">
        Create your <span className="text-primary">ad</span>
      </h1>
      <ClientForm {...{ sendDataToDatabase }} />
    </div>
  );
};

export default page;
