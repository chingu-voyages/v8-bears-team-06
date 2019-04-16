import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: String,
  startDate: String,
  endDate: String,
  description: String,
  thoughts: String,
  link: String,
  // user: {
  //     id: {
  //         type: mongoose.schema.Types.ObjectID,
  //         ref: "User"
  //     },
  //     email: String
  // }
});

export const Work = mongoose.model("Work", schema);