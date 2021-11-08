const router = require("express").Router();
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { Country, Activity } = require("../db.js");

router.get("/", (req, res, next) => {
  const { name } = req.query;
  if (name) {
    return Country.findAll({
      where: {
        name: { [Op.iLike]: "%" + name.toLowerCase() + "%" },
      },
    })
      .then((country) => res.send(country.length > 0 ? country : "Country not Found"))
      .catch((error) => next(error));
  } else {
    return Country.findAll({
      attributes: ["flag", "name", "continent", "id", "population"],
      include: { model: Activity },
    })
      .then((country) => {
        res.send(country);
      })
      .catch((error) => next(error));
  }
});
router.get("/:idPais", (req, res, next) => {
  const { idPais } = req.params;

  if (idPais) {
    return Country.findOne({
      where: {
        id: idPais.toUpperCase(),
      },
      include: [
        {
          model: Activity,
          // attributes: ['name'],
          through: {
            attributes: [],
          },
        },
      ],
    })
      .then((country) => res.send(country))
      .catch((error) => next(error));
  }
});

module.exports = router;
