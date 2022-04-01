const { Dog, Temperament, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Dog model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
});
describe("Validators", () => {
  beforeEach(() => Dog.sync({ force: true }));
  describe("name", () => {
    it("should throw an error if name is null", (done) => {
      Dog.create({ name: null })
        .then(() => done(new Error("It requires a valid name")))
        .catch(() => done());
    });
    it("should work when its a valid name", () => {
      Dog.create({ name: "Pug" });
    });
    it("Should not be created without all fields completed", (done) => {
      Dog.create({ height: "4-25", weight: "4-23", image: "xd" })
        .then(() => done("Error, some are fields incomplete!"))
        .catch(() => done());
    });
  });
});
describe("Temperament model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
});
describe("Validators", () => {
  beforeEach(() => Temperament.sync({ force: true }));
  describe("name", () => {
    it("Temperament should have an unique ID", (done) => {
      Temperament.create({ id: "1" })
        .then(() => done(new Error("ID must be valid")))
        .catch(() => done());
    });
    it("should work when its a valid name", () => {
      expect(typeof Temperament.name).equal("string");
    });
  });
});
