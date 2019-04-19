/**
 * @jest-environment node
 */

import jwt from "jsonwebtoken";

import { getUser, extractToken } from "./server";

describe("getUser", () => {
  it("returns user object with id and email set when correct secret key is used", () => {
    const token = jwt.sign({ id: 1, email: "foo@foo.com" }, "secret");
    const user = getUser(token, "secret");
    expect(user.id).toBe(1);
    expect(user.email).toBe("foo@foo.com");
  });

  it("returns user object set to null when wrong secret key is used", () => {
    const token = jwt.sign({ id: 1, email: "foo@foo.com" }, "secret");
    const user = getUser(token, "wrong secret");
    expect(user).toBe(null);
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
