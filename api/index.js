//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const axios = require("axios");
const { Country } = require("./src/db.js");
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
    const API = "https://restcountries.com/v3.1/all/";
    const getApiInfo = async () => {
      try {
        const apiURL = await axios.get(API);
        console.log("Successfull connect to Countries API")
        const apiResults = apiURL.data;
        await apiResults.map((country) => {
          return Country.create({
            id: country.cca3,
            name: country.name.common,
            flag: country.flags.png,  
            continents: country.continents[0],
            capital: country.capital, // AVECES ES UN ARRAY
            subregion: country.subregion,
            area: Math.trunc(country.area),
            population: country.population,
          });
        });
        console.log("¡Database updated!")
      } catch (err) {
        console.log(err);
      }
    };
    getApiInfo();
  });
});
