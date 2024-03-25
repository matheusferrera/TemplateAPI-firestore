const checkerService = require("../Services/checker.service.js");


async function checkMessage(req, res) {
    try {
        //Extração das variaveis
        const idUser = req.params.idUser
        const idClient = req.params.idClient
        const objMessage = req.body

        //Chamada do service
        const data = await checkerService.checkMessage(idUser, idClient, objMessage);

        //Correcao de erros
        if (data.error) {
            return res.status(data.status).json(data);
        }

        res.send(data);
    } catch(err) {
        res.send(err);
    }
}




module.exports = { checkMessage }

