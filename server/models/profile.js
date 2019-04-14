import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  location: String,
  workType: String,
  skills: String,
  tagline: String,
  statement: String,
  experience: String
});

export const Profile = mongoose.model("Profile", schema);
