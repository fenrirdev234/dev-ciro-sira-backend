import { describe, expect, it } from "vitest";

import { sum } from "../../utils/sum";

describe("sum function", () => {
  it("should add two positive numbers correctly", () => {
    expect(sum(1, 2)).toBe(3);
  });
});

/* import assert from "node:assert";

import supertest from "supertest";
import { after, beforeEach, test } from "vitest";

import { app } from "../app";

const api = supertest(app);
 */
