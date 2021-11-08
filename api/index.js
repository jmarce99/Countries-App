const server = require("./src/app.js");
const { conn, Country } = require("./src/db.js");
const axios = require("axios");


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT || 3001, () => {
    console.log("%s listening at 3001");
    const API = "https://restcountries.com/v3.1/all/";
    const getApiInfo = async () => {
      try {
        const apiURL = await axios.get(API);
        console.log("Successfull connect to Countries API");
        const apiResults = apiURL.data;
        await apiResults.map((country) => {
          return Country.create({
            id: country.cca3,
            name: country.name.common ? country.name.common : "Not found Name",
            flag: country.flags.png ? country.flags.png : "Not found Flag",
            continent: country.continents[0] ? country.continents[0] : "Not found Continents",
            capital: country.capital !== undefined ? country.capital[0] : "Not found Capital",
            subregion: country.subregion ? country.subregion : "Not found Subregion",
            area: Math.trunc(country.area),
            population: country.population,
          });
        });
        console.log("¡Database updated!");
      } catch (err) {
        console.log(err);
      }
    };
    getApiInfo();
  });
});
