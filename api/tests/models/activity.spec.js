const { Activity, conn } = require("../../src/db.js");
const { expect } = require("chai");

mostrarLogs = false;

const newActivity = {
  name: "Testing1",
  difficulty: "5",
  duration: "2 hours",
  season: "summer",
  continents: ["Argentina", "Colombia"],
};
const newActivity2 = {
  name: "Testing2",
  difficulty: "3",
  duration: "3 hours",
  season: "summer",
  continents: ["Alemania", "Chile"],
};
const newActivity3 = {
  name: "Testing3",
  difficulty: "4",
  duration: "5 hours",
  season: "summer",
  continents: ["Argentina"],
};

describe("TESTING: Activity model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", async () => {
    beforeEach(() => Activity.sync({ force: true }));
    describe("Validación de propiedades", () => {
      it("Deberia ser un OBJETO", async () => {
        expect(newActivity).be.a("object");
      });
      it("Deberia contener una propiedad name del tipo STRING", async () => {
        expect(newActivity).to.have.property("name").be.a("string");
      });
      it("Deberia contener una propiedad difficulty del tipo STRING", async () => {
        expect(newActivity).to.have.property("difficulty").be.a("string");
      });
      it("Deberia contener una propiedad duration del tipo STRING", async () => {
        expect(newActivity).to.have.property("duration").be.a("string");
      });
      it("Deberia contener una propiedad season del tipo STRING", async () => {
        expect(newActivity).to.have.property("season").be.a("string");
      });
      it("Deberia contener una propiedad continents del tipo ARRAY", async () => {
        expect(newActivity).to.have.property("continents").be.a("array");
      });
    });
    describe("Creacion de Actividad", () => {
      it("Deberia Crear una actividad si los datos son correctos", async () => {
        let status = null;
        try {
          const data = await Activity.create(newActivity);
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
          const data = await Activity.create({ ...newActivity, name: ["ARG"] });
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
    describe("Activity Model", () => {
      it("Deberia contener las 3 actividades creadas", async () => {
        try {
          const uno = await Activity.create(newActivity);
          const dos = await Activity.create(newActivity2);
          const tres = await Activity.create(newActivity3);
          mostrarLogs === true
            ? console.log(uno.dataValues, dos.dataValues, tres.dataValues)
            : (mostrarLogs = false);
        } catch (error) {
          console.log(new Error(error.message));
        }
        let result = await Activity.findAll();
        expect(result.map((activity) => activity).length).to.equal(3);
      });
    });
  });
});
