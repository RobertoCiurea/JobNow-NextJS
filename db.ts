import mongoose from "mongoose";

const mongodbUri = process.env.MONGODB_URI;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongodbUri!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }
};
export { connectToDatabase };
