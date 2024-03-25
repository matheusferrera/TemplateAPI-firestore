const express = require("express");
const flowController = require("../Controllers/flow.controller.js");

const app = express.Router();
app.use(express.json());

app.post("/activeFlow/:idUser?/:idFlow?", flowController.activeFlow)
app.post("/desactiveFlow/:idUser?/:idFlow?", flowController.desactiveFlow)

app.get("/getFlowSchema/:idUser?/:idFlow?", flowController.getFlowSchema);
app.post("/setFlowSchema/:idUser?/:idFlow?", flowController.setFlowSchema); //Caso nao tenha ID significa que é a criação de uma nova flowm
app.post("/changeFlowSchema/:idUser?/:idFlow?", flowController.changeFlowSchema); 

app.post("/setFlowActive/:idUser?/:idFlow?", flowController.setFlowActive); //Rota para alterar o (seja step ou outro motivos) flowActive
app.post("/setNextNodeFlowActive/:idUser?/:idClient?/:idFlow?", flowController.setNextNodeFlowActive); //Rota para ativar o proximo passo do bot

module.exports = app;