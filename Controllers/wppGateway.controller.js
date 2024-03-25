const wppGatewayService = require("../Services/wppGateway.service.js");


async function sendMessage(req, res) {
    try {
        //Extração das variaveis
        const idUser = req.params.idUser
        const idClient = req.params.idClient
        const objMessage = req.body

        //Chamada do service
        const data = await wppGatewayService.sendMessage(idUser, idClient, objMessage);

        //Correcao de erros
        if (data.error) {
            return res.status(data.status).json(data);
        }

        res.send(data);
    } catch(err) {
        res.send(err);
    }
}

async function reciveMessage(req, res) {
    try {
        //Extração das variaveis
        const objMessage = req.body
        const idUser = req.params.idUser
        const idClient = req.params.idClient

        //Chamada do service
        const data = await wppGatewayService.reciveMessage(idUser, idClient, objMessage);

         //Correcao de erros
         if (data.error) {
            return res.status(data.status).json(data);
        }

        res.send(data);
    } catch(err) {
        res.send(err);
    }
}




module.exports = { sendMessage, reciveMessage }

