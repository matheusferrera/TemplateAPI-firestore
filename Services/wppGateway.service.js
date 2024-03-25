const wppGatewayRepository = require("../Repositories/wppGateway.repository.js");


async function sendMessage(idUser, idClient, objMessage) {
    return await wppGatewayRepository.sendMessage(idUser, idClient, objMessage);
}

async function reciveMessage(idUser, idClient, objMessage) {
    return await wppGatewayRepository.reciveMessage(idUser, idClient, objMessage);
}


module.exports = { sendMessage, reciveMessage }