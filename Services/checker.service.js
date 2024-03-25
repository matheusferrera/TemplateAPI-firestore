const checkerRepository = require("../Repositories/checker.repository.js");


async function checkMessage(idUser, idClient, objMessage) {
    return await checkerRepository.checkMessage(idUser, idClient, objMessage);
}



module.exports = { checkMessage }