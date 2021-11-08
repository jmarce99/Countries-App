const { Country, conn } = require("../../src/db.js");
const { expect } = require("chai");

mostrarLogs = false;

const newCountry = {
  id: "ARG",
  name: "Argentina",
  flag: "https://flagcdn.com/w320/ar.png",
  continent: "South America",
  capital: "Buenos Aires",
  subregion: "South America",
  area: 2780400,
  population: 45376763,
};
const newCountry2 = {
  id: "COL",
  name: "Colombia",
  flag: "https://flagcdn.com/w320/co.png",
  continent: "South America",
  capital: "Bogotá",
  subregion: "South America",
  area: 1141748,
  population: 50882884,
};
const newCountry3 = {
  id: "CHL",
  name: "Chile",
  flag: "https://flagcdn.com/w320/cl.png",
  continent: "South America",
  capital: "Santiago",
  subregion: "South America",
  area: 756102,
  population: 19116209,
};

describe("TESTING: Country model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      25;
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Country.sync({ force: true }));
    describe("Validación de propiedades", () => {
      it("Deberia ser un OBJETO", async () => {
        expect(newCountry).be.a("object");
      });
      it("Deberia contener una propiedad id del tipo STRING con un maximo de 3 caracteres", async () => {
        expect(newCountry).to.have.property("id").be.a("string").with.lengthOf(3);
      });
      it("Deberia contener una propiedad name del tipo STRING", async () => {
        expect(newCountry).to.have.property("name").be.a("string");
      });
      it("Deberia contener una propiedad flag del tipo STRING", async () => {
        expect(newCountry).to.have.property("flag").be.a("string");
      });
      it("Deberia contener una propiedad continent del tipo STRING", async () => {
        expect(newCountry).to.have.property("continent").be.a("string");
      });
      it("Deberia contener una propiedad capital del tipo STRING", async () => {
        expect(newCountry).to.have.property("capital").be.a("string");
      });
      it("Deberia contener una propiedad subregion del tipo STRING", async () => {
        expect(newCountry).to.have.property("subregion").be.a("string");
      });
      it("Deberia contener una propiedad area del tipo NUMBER", async () => {
        expect(newCountry).to.have.property("area").be.a("number");
      });
      it("Deberia contener una propiedad population del tipo NUMBER", async () => {
        expect(newCountry).to.have.property("population").be.a("number");
      });
    });
    describe("Creacion de un Country", () => {
      it("Deberia crear un pais si los datos son correctos", async () => {
        let status;
        try {
          const data = await Country.create(newCountry);
          status = true;
          mostrarLogs === true
            ? console.log(data.dataValues)
            : (mostrarLogs = false);
        } catch (error) {
          status = false;
          console.log(new Error(error.message));
        }
        expect(status).to.equal(true);
      });
      it("Deberia tirar un error si los datos no son correctos", async () => {
        let status = null;
        try {
          const data = await Country.create({ ...newCountry, id: "ARGs" });
          status = true;
          mostrarLogs === true
            ? console.log(data.dataValues)
            : (mostrarLogs = false);
        } catch (error) {
          status = false;
          console.log(new Error(error.message));
        }
        expect(status).to.equal(false);
      });
    });
    describe("Country Model", () => {
      it("Deberia contener los 3 paises creadas", async () => {
        try {
          const uno = await Country.create(newCountry);
          const dos = await Country.create(newCountry2);
          const tres = await Country.create(newCountry3);
          mostrarLogs === true
            ? console.log(uno.dataValues, dos.dataValues, tres.dataValues)
            : (mostrarLogs = false);
        } catch (error) {
          console.log(new Error(error.message));
        }
        let result = await Country.findAll();
        expect(result.map((country) => country).length).to.equal(3);
      });
    });
  });
});
