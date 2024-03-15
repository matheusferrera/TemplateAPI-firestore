const express = require("express");
const messageController = require("../Controllers/message.controller.js");

const app = express.Router();
app.use(express.json());

app.get("/getMessage/:idUser?/:idClient?/:idMessage?", messageController.getMessage);
app.post("/setMessage/:idUser?/:idClient?/:idMessage?", messageController.setMessage); //Caso nao tenha ID significa que é a criação de uma nova messagem


module.exports = app;