const messageRepository = require("../Repositories/message.repository.js");


async function getMessage(idUser, idClient, idMessage) {
    return await messageRepository.getMessage(idUser, idClient, idMessage);
}

async function setMessage(idUser, idClient, idMessage, objMessage) {
    return await messageRepository.setMessage(idUser, idClient, idMessage, objMessage);
}


module.exports = { getMessage, setMessage }