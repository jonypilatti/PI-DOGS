/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Dog, Temperament, conn } = require("../../src/db.js");

const agent = session(app);
const dog = {
  name: "Pug",
  weight: "4-20",
  height: "4-20",
  createdByDB: true,
};
const temperament = { name: "Aloof" };

describe("Dogs routes", () => {
  before(async () =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Dog.sync({ force: true }).then(() => Dog.create(dog)));
  describe("GET /dogs", () => {
    it("should get 200", () => agent.get("/dogs").expect(200)).timeout(10000);
  });
});
describe("Temperament routes", () => {
  before(async () =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Temperament.sync({ force: true }).then(() =>
      Temperament.create(temperament)
    )
  );
  describe("GET /temperament", () => {
    it("should get 200", () => agent.get("/temperament").expect(200)).timeout(
      5000
    );
  });
});
