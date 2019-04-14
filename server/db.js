import mongoose from "mongoose";
import MongoMemoryServer from "mongodb-memory-server";

import { User } from "./models/user";
import { Profile } from "./models/profile";

export async function insertMockData() {
  await User.insertMany([
    { email: "foo@foo.com", password: "foo" },
    { email: "bar@bar.com", password: "bar" }
  ]);
  await Profile.create({
    email: "foo@foo.com",
    firstName: "Michael",
    lastName: "Bolton",
    location: "Isle of Man",
    workType: "information technology",
    skills: [
      "javascript",
      "node.js",
      "react",
      "web-development",
      "html",
      "css"
    ],
    tagline:
      "A junior software developer looking to put my technical and creative skills to use in order to make something good for others.",
    statement:
      "I want to make a change in the world, and I believe one of the greatest drivers of change is technological innovation. I want to create innovative software that will help all who use it.",
    experience:
      "I did a summer internship at Microsoft headquarters in Seattle last year."
  });
}

export async function setupDbConnection(dev, mongoUri = "") {
  const mongoServer = new MongoMemoryServer({ binary: { version: "4.0.3" } });
  mongoUri = await mongoServer.getConnectionString();
  mongoose.connect(mongoUri, { useNewUrlParser: true });
  const conn = new Promise((resolve, reject) => {
    mongoose.connection
      .on("error", err => {
        reject(err);
      })
      .once("open", () => {
        return resolve();
      });
  });
  return conn;
}
