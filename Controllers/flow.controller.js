const flowService = require("../Services/flow.service.js");


async function getFlowSchema(req, res) {
    try {
        //Extração das variaveis
        const idUser = req.params.idUser
        const idFlow = req.params.idFlow

        //Chamada do service
        const data = await flowService.getFlowSchema(idUser, idFlow);

        //Correcao de erros
        if (data.error) {
            return res.status(data.status).json(data);
        }

        res.send(data);
    } catch(err) {
        res.send(err);
    }
}

async function setFlowSchema(req, res) {
    try {
        //Extração das variaveis
        const objFlow = req.body
        const idUser = req.params.idUser
        const idFlow = req.params.idFlow

        //Chamada do service
        const data = await flowService.setFlowSchema(idUser, idFlow, objFlow);

         //Correcao de erros
         if (data.error) {
            return res.status(data.status).json(data);
        }

        res.send(data);
    } catch(err) {
        res.send(err);
    }
}




module.exports = { getFlowSchema, setFlowSchema }

