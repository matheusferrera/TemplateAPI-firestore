const express = require("express");
const checkerController = require("../Controllers/checker.controller.js");

const app = express.Router();
app.use(express.json());

app.post("/checkMessage/:idUser?/:idClient?", checkerController.checkMessage);


module.exports = app;