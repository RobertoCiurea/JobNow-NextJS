// import { connectToDatabase } from "@/db";
// import { adsModel } from "@/models/Ads";
// import { AdsProps } from "@/types/index";
// connectToDatabase();

// export async function POST(request: Request) {
//   try {
//     const { title, salary, owner, description, email, phone, location, tags } =
//       await request.json();

//     const newAd: AdsProps = adsModel({
//       title: title,
//       salary: salary,
//       owner: owner,
//       description: description,
//       email: email,
//       phone: phone,
//       location: location,
//       tags: tags,
//       createdAt: new Date(),
//     });
//     newAd.save();
//     return {
//       status: 201,
//       body: { message: "Ad created successfully" },
//     };
//   } catch (error) {
//     return {
//       status: 500,
//       body: { message: "An error occurred while creating the ad" },
//     };
//   }
// }
