const router = require("express").Router();
//const axios = require("axios");
//const { Sequelize } = require("sequelize");

const { Country, Activity } = require("../db.js");

/* router.post("/activity", async(req, res, next) => {
    const { name, duration, difficulty, season, countriesId } = req.body;
    console.log(countriesId);
    countriesId.map(async (country)=> {
      const countries = await Country.findByPk(country)
      console.log(countries);
    })
    //const countries = await Country.findByPk(countriesId)
    //console.log(countries)
    return Activity.create({
      name: name,
      duration: duration,
      difficulty: difficulty,
      season: season,
    })
      .then((data) => res.send(data))
      .catch((error) => next(error));
  });
 */


router.post("/", async (req, res, next) => {
  const { name, duration, difficulty, season, countries } = req.body;
  console.log(req.body)
  try {
    const newActivity = await Activity.create({
        name: name,
        duration: duration,
        difficulty: difficulty,
        season: season,
    });

    for (const i of countries) {
      const country = await Country.findOne({
        where: {
          name: i, 
        },
      });

      country.addActivity(newActivity);
    }

    res.json(newActivity);
  } catch (error) {
    next(error);
  }
});

router.get("/add", async function (req, res, next) {
  try {
    const justactivities = await Activity.findAll({
      attributes: ["name"],
    });
    res.json(justactivities);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
