import mongoose from "mongoose";

const tagsSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
});

const adsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  company: {
    type: String,
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
    type: [tagsSchema],
    required: false,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
export const adsModel = mongoose.models.ads || mongoose.model("ads", adsSchema);
