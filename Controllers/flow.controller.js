const flowService = require("../Services/flow.service.js");


async function activeFlow(req, res) {
    try {
        //Extração das variaveis
        const idUser = req.params.idUser
        const idFlow = req.params.idFlow
        const idClients = req.body.idClients
        //Chamada do service
        const data = await flowService.activeFlow(idUser, idFlow, idClients);

         //Correcao de erros
         if (data.error) {
            return res.status(data.status).json(data);
        }

        res.send(data);
    } catch(err) {
        res.send(err);
    }
}

async function desactiveFlow(req, res) {
    try {
        //Extração das variaveis
        const idUser = req.params.idUser
        const idFlow = req.params.idFlow
        const idClients = req.body.idClients
    console.log("CONTROL -[ ", idClients)
        //Chamada do service
        const data = await flowService.desactiveFlow(idUser, idFlow, idClients);

         //Correcao de erros
         if (data.error) {
            return res.status(data.status).json(data);
        }

        res.send(data);
    } catch(err) {
        res.send(err);
    }
}

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

async function changeFlowSchema(req, res) {
    try {
        //Extração das variaveis
        const objFlow = req.body
        const idUser = req.params.idUser
        const idFlow = req.params.idFlow

        //Chamada do service
        const data = await flowService.changeFlowSchema(idUser, idFlow, objFlow);

         //Correcao de erros
         if (data.error) {
            return res.status(data.status).json(data);
        }

        res.send(data);
    } catch(err) {
        res.send(err);
    }
}



async function setFlowActive(req, res) {
    try {
        //Extração das variaveis
        const objFlow = req.body
        const idUser = req.params.idUser
        const idFlow = req.params.idFlow

        //Chamada do service
        const data = await flowService.setFlowActive(idUser, idFlow, objFlow);

         //Correcao de erros
         if (data.error) {
            return res.status(data.status).json(data);
        }

        res.send(data);
    } catch(err) {
        res.send(err);
    }
}

async function setNextNodeFlowActive(req, res) {
    try {
        //Extração das variaveis
        const idNextNode = req.body.idNextNode
        const idUser = req.params.idUser
        const idClient = req.params.idClient
        const idFlow = req.params.idFlow

        //Chamada do service
        const data = await flowService.setNextNodeFlowActive(idUser, idClient, idFlow, idNextNode);

         //Correcao de erros
         if (data.error) {
            return res.status(data.status).json(data);
        }

        res.send(data);
    } catch(err) {
        res.send(err);
    }
}



module.exports = { getFlowSchema, setFlowSchema, changeFlowSchema, setFlowActive, setNextNodeFlowActive, activeFlow, desactiveFlow }

