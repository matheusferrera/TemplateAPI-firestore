const express = require("express");
const flowController = require("../Controllers/flow.controller.js");

const app = express.Router();
app.use(express.json());

app.get("/getFlowSchema/:idUser?/:idFlow?", flowController.getFlowSchema);
app.post("/setFlowSchema/:idUser?/:idFlow?", flowController.setFlowSchema); //Caso nao tenha ID significa que é a criação de uma nova flowm


module.exports = app;