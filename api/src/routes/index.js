const { Router } = require("express");
const express = require("express");
const countryrutes = require("./countries.js");
const activityroutes = require("./activities.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use(express.json());
router.use("/countries",countryrutes);
router.use("/activity",activityroutes);

module.exports = router;