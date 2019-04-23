/**
 * @jest-environment node
 */

import mongoose from "mongoose";

import WorkSearchService from "./work_search";
import { setupDbConnection } from "../db";
import { Work } from "../models/work";

let mongoServer;

beforeAll(async () => {
  mongoServer = await setupDbConnection();
  const works = [
    {
      userId: new mongoose.Types.ObjectId(),
      title: "title 1 looks like this",
      startDate: new Date("2019-04-16"),
      endDate: new Date("2019-04-19"),
      description: "description 1 looks like this",
      thoughts: "thoughts 1 looks like this"
    },
    {
      userId: new mongoose.Types.ObjectId(),
      title: "title 2 looks like this",
      startDate: new Date("2019-04-16"),
      endDate: new Date("2019-04-19"),
      description: "description 2 looks like this",
      thoughts: "thoughts 2 looks like this"
    },
    {
      userId: new mongoose.Types.ObjectId(),
      title: "title 3 looks like this",
      startDate: new Date("2019-04-16"),
      endDate: new Date("2019-04-19"),
      description: "description 3 looks like this",
      thoughts: "thoughts 3 looks like this"
    },
    {
      userId: new mongoose.Types.ObjectId(),
      title: "title 4 looks like this",
      startDate: new Date("2019-04-16"),
      endDate: new Date("2019-04-19"),
      description: "description 4 looks like this",
      thoughts: "thoughts 4 looks like this"
    }
  ];
  await Work.create(works);
});

afterAll(async () => {
  mongoose.disconnect();
  await mongoServer.stop();
});

describe("WorkSearchService", () => {
  it("finds all works that contains 'title' as their titles", async () => {
    const works = await WorkSearchService.search("title");
    expect(works.length).toBe(4);
  });

  it("finds all works by title with query consisting of multiple words and sorts works by score in descending order", async () => {
    const works = await WorkSearchService.search("title 1");
    expect(works.length).toBe(4);
    expect(works[0].score).toBeGreaterThanOrEqual(works[1].score);
    expect(works[1].score).toBeGreaterThanOrEqual(works[2].score);
    expect(works[2].score).toBeGreaterThanOrEqual(works[3].score);
  });

  it("looks for works by also checking description field", async () => {
    const works = await WorkSearchService.search("description 3");
    expect(works.length).toBe(4);
  });

  it("looks for works by also checking thoughts field", async () => {
    const works = await WorkSearchService.search("thoughts");
    expect(works.length).toBe(4);
  });

  it("finds only one work for query '4'", async () => {
    const works = await WorkSearchService.search("4");
    expect(works.length).toBe(1);
  });
});
