const router = require("express").Router();

const { Country, Activity } = require("../db.js");

router.get("/", async function (req, res, next) {
  try {
    const activities = await Activity.findAll();
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { name, duration, difficulty, season, countries } = req.body;
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

    res.status(201).json(newActivity);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
