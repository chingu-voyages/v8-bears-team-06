import mongoose from "mongoose";
import MongoMemoryServer from "mongodb-memory-server";
import { User } from "./models/user";
import { Work } from "./models/work";
import { logger } from "../logger";

const dbURI = process.env.DB_HOST;

const authData = {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  useNewUrlParser: true,
  useCreateIndex: true
};

export async function insertMockData() {
  const userFoo = await User.create({
    _id: mongoose.Types.ObjectId(),
    email: "foo@foo.com",
    name: "Michael Bolton",
    location: "Austin, TX, USA",
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
    password: "foo",
    imageId: "ovt3y1ucmnn90fssieu0",
    signupDate: "2019-04-01"
  });
  await User.create({
    _id: mongoose.Types.ObjectId(),
    email: "bar@bar.com",
    name: "William Lumbergh",
    location: "Austin, TX, USA",
    workType: "information technology",
    skills: ["cobol", "project management", "accounting", "human resources"],
    tagline:
      "Hey... What's Happening? I'm gonna need you to hire me as a volunteer, so if you could do that, that would be great. Mmmkay?",
    statement:
      "I believe everyone could be more effective if they just read the memos",
    experience:
      "Fifteen years experience managing the Austin office of Initech",
    password: "bar",
    imageId: "by7fyjr4f7oxe0othr7d",
    signupDate: "2019-04-03"
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

export async function setupDbConnection(dev) {
  if (dev) {
    const mongoServer = new MongoMemoryServer({ binary: { version: "4.0.3" } });
    const mongoUri = await mongoServer.getConnectionString();

    await mongoose.connect(mongoUri, {
      useCreateIndex: true,
      useNewUrlParser: true
    });
    return mongoServer;
  } else {
    await mongoose.connect(dbURI, authData, error => {
      if (!error) {
        logger.info("Successfully connected to the MongoDB");
      } else {
        logger.error(
          "Error in MongoDB connection: " + JSON.stringify(error, undefined, 2)
        );
      }
    });
  }
}
