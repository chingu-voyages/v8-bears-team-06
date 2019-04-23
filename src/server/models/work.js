import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userId: String,
  title: String,
  startDate: Date,
  endDate: Date,
  description: String,
  thoughts: String
});

export const Work = mongoose.model("Work", schema);

// Work.createIndexes({ title: 1, description: 1, thoughts: 1 });
