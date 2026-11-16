import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "./app";

describe("GET /api/health", () => {
  it("respond 200 and status ok", async () => {
    const res = await request(app).get("/api/health");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});

describe("GET /api/transactions", () => {
  it("it should list transactions", async () => {
    const res = await request(app).get("/api/transactions");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
