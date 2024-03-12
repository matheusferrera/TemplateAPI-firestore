const messageRepository = require("../Repositories/message.repository.js");


async function getMessage(idClient, idMessage) {
    return await messageRepository.getMessage(idClient, idMessage);
}

async function setMessage(idClient, idMessage, objMessage) {

    //Correcao de erros de requisicao
    if (!idClient) {
        return { status: 400, error: "O parâmetro 'idClient' é obrigatório." };
    }

    return await messageRepository.setMessage(idClient, idMessage, objMessage);
}


module.exports = { getMessage, setMessage }