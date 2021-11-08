/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Activity, Country, conn } = require("../../src/db.js");

let mostrarLogs = false;

const agent = session(app);
const activity = {
  name: "Testing",
  duration: "5 minutes",
  difficulty: "5",
  season: "winter",
};
const activityToPost = {
  name: "TestingPost",
  difficulty: "3",
  duration: "2 Hours",
  season: "winter",
  countries: ["Argentina", "Colombia"],
};

const newCountry1 = {
  id: "ARG",
  name: "Argentina",
  flag: "https://flagcdn.com/w320/ar.png",
  continents: "South America",
  capital: "Buenos Aires",
  subregion: "South America",
  area: 2780400,
  population: 45376763,
};
const newCountry2 = {
  id: "COL",
  name: "Colombia",
  flag: "https://flagcdn.com/w320/co.png",
  continents: "South America",
  capital: "Bogotá",
  subregion: "South America",
  area: 1141748,
  population: 50882884,
};

describe("TESTING: Activities routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Activity.sync({ force: true })
      .then(() => {
        Activity.create(activity);
        Country.create(newCountry1);
        Country.create(newCountry2);
      })
      .catch((error) => {
        console.log(new Error(error));
      })
  );
  describe("GET /activities", () => {
    it("should get 200", () => {
      return agent
        .get("/activities")
        .expect(200)
        .then((response) => {
          mostrarLogs === true ? console.log(response.body) : mostrarLogs = false;
          expect(response.body.length > 0).to.equals(true);
        });
    });
  });
  describe("POST /activities", () => {
    it("should get 201", () => {
      return agent
      .post("/activities")
      .send(activityToPost)
      .expect(201)
      .then(
        (response) => {
          expect(response.body.name).to.equals(activityToPost.name);
          expect(response.body.difficulty).to.equals(activityToPost.difficulty);
          expect(response.body.duration).to.equals(activityToPost.duration);
          expect(response.body.season).to.equals(activityToPost.season);
        }
      )
    });
  });
});
