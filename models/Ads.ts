import mongoose from "mongoose";

const adsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    requried: true,
  },
  email: {
    type: String,
    requried: true,
  },
  phone: {
    type: Number,
    requried: true,
  },
  location: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
export const adsModel = mongoose.models.ads || mongoose.model("ads", adsSchema);
