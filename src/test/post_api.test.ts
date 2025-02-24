import supertest from "supertest";
import { test, beforeEach, after } from "node:test";
import assert from "node:assert";
import { app } from "../app";

const api = supertest(app);

test("post image", async () => {});
