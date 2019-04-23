import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userId: String,
  title: String,
  startDate: Date,
  endDate: Date,
  description: String,
  thoughts: String,
  score: Number
});

schema.index({
  title: "text",
  description: "text",
  thoughts: "text"
});

export const Work = mongoose.model("Work", schema);
