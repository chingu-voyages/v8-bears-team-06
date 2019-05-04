import mongoose from "mongoose";

const schema = new mongoose.Schema({
  email: String,
  name: String,
  location: String,
  workType: String,
  skills: [String],
  tagline: String,
  statement: String,
  experience: String,
  imageId: String,
  signupDate: Date,
  password: String
});

export const User = mongoose.model("User", schema);
