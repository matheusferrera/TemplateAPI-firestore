const express = require("express");
const wppGatewayController = require("../Controllers/wppGateway.controller.js");

const app = express.Router();
app.use(express.json());

app.post("/sendMessage/:idUser?/:idClient?", wppGatewayController.sendMessage);
app.post("/reciveMessage/:idUser?/:idClient?", wppGatewayController.reciveMessage); //Caso nao tenha ID significa que é a criação de uma nova wppGatewaym


module.exports = app;