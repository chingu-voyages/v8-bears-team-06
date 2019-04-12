import jwt from "jsonwebtoken";

import { getUser, extractToken } from "./server";

describe("getUser", () => {
  it("returns user object with loggedIn set to true when correct secret key is used", () => {
    const token = jwt.sign({ id: 1, email: "foo@foo.com" }, "secret");
    const user = getUser(token, "secret");
    expect(user.loggedIn).toBe(true);
  });

  it("returns user object with loggedIn set to false when wrong secret key is used", () => {
    const token = jwt.sign({ id: 1, email: "foo@foo.com" }, "secret");
    const user = getUser(token, "wrong secret");
    expect(user.loggedIn).toBe(false);
  });
});

describe("extractToken", () => {
  it("returns empty string if authorization header is undefined", () => {
    expect(extractToken(undefined)).toBe("");
  });

  it("returns empty string if authorization header exists but is empty", () => {
    expect(extractToken("")).toBe("");
  });

  it("returns empty string if authorization header exists but without actual token", () => {
    expect(extractToken("Bearer ")).toBe("");
  });

  it("returns JTWT token if authorization header is of the form 'Bearer JWT_TOKEN'", () => {
    expect(extractToken("Bearer JWT_TOKEN")).toBe("JWT_TOKEN");
  });
});
