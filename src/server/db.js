import mongoose from "mongoose";
import MongoMemoryServer from "mongodb-memory-server";

import { User } from "./models/user";
import { Work } from "./models/work";

export async function insertMockData() {
  const userFoo = await User.create({
    _id: mongoose.Types.ObjectId(),
    email: "foo@foo.com",
    name: "Michael Bolton",
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
      "I did a summer internship at Microsoft headquarters in Seattle last year.",
    password: "foo"
  });
  await User.create({
    _id: mongoose.Types.ObjectId(),
    email: "bar@bar.com",
    password: "bar"
  });

  await Work.insertMany([
    {
      userId: userFoo.id,
      title: "Environmental clean-up in Tokyo",
      startDate: new Date("2019-04-16"),
      endDate: new Date("2019-04-19"),
      description:
        "I worked with my colleagues to clean up the mess after a big event in Shibuya scramble crossing.",
      thoughts:
        "It was a really fruitful experience for me because I was able to make new friends."
    }
  ]);
}

export async function setupDbConnection(dev, mongoUri = "") {
  const mongoServer = new MongoMemoryServer({ binary: { version: "4.0.3" } });
  mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, {
    useCreateIndex: true,
    useNewUrlParser: true
  });
  return mongoServer;
}
