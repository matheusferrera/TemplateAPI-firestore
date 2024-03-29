const messageService = require("../Services/message.service.js");


async function getMessage(req, res) {
    try {
        //Extração das variaveis
        const idUser = req.params.idUser
        const idClient = req.params.idClient
        const idMessage = req.params.idMessage

        //Chamada do service
        const data = await messageService.getMessage(idUser, idClient, idMessage);

        //Correcao de erros
        if (data.error) {
            return res.status(data.status).json(data);
        }

        res.send(data);
    } catch(err) {
        res.send(err);
    }
}

async function setMessage(req, res) {
    try {
        //Extração das variaveis
        const objMessage = req.body
        const idUser = req.params.idUser
        const idMessage = req.params.idMessage
        const idClient = req.params.idClient

        //Chamada do service
        const data = await messageService.setMessage(idUser, idClient, idMessage, objMessage);

         //Correcao de erros
         if (data.error) {
            return res.status(data.status).json(data);
        }

        res.send(data);
    } catch(err) {
        res.send(err);
    }
}




module.exports = { getMessage, setMessage }

