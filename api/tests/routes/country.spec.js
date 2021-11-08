/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Country, conn } = require("../../src/db.js");

let mostrarLogs = false;

const agent = session(app);
const newCountry1 = {
  id: "ARG",
  name: "Argentina",
  flag: "https://flagcdn.com/w320/ar.png",
  continent: "South America",
  capital: "Buenos Aires",
  subregion: "South America",
  area: 2780400,
  population: 45376763,
};

describe("TESTING: Country routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Country.sync({ force: true }).then(() =>
      Country.create(newCountry1).catch((error) => {
        console.log(new Error(error));
      })
    )
  );

  describe("GET", () => {
    it("GET /countries should get 200", () => {
      return agent
        .get("/countries")
        .expect(200)
        .then((response) => {
          mostrarLogs === true
            ? console.log(response.body)
            : (mostrarLogs = false);
          expect(response.body.length > 0).to.equals(true);
          expect(response.body[0].id).to.equals(newCountry1.id);
          expect(response.body[0].name).to.equals(newCountry1.name);
        });
    });
    it("GET /countries?name=argentina should get 200", () => {
      return agent
        .get("/countries?name=argentina")
        .expect(200)
        .then((response) => {
          mostrarLogs === true
            ? console.log(response.body)
            : (mostrarLogs = false);
          expect(response.body.length > 0).to.equals(true);
          expect(response.body[0].id).to.equals(newCountry1.id);
          expect(response.body[0].name).to.equals(newCountry1.name);
        });
    });
    it("GET /countries/ARG should get 200", () => {
      return agent
        .get("/countries/ARG")
        .expect(200)
        .then((response) => {
          mostrarLogs === true
            ? console.log(response.body)
            : (mostrarLogs = false);
          expect(response.body.id).to.equals(newCountry1.id);
          expect(response.body.name).to.equals(newCountry1.name);
        });
    });
  });
});
