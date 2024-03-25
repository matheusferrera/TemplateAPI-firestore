const flowRepository = require("../Repositories/flow.repository.js");


async function activeFlow(idUser, idFlow, idClients) {
    return await flowRepository.activeFlow(idUser, idFlow, idClients);
}

async function desactiveFlow(idUser, idFlow, idClients) {
    return await flowRepository.desactiveFlow(idUser, idFlow, idClients);
}

async function getFlowSchema(idUser, idFlow) {
    return await flowRepository.getFlowSchema(idUser, idFlow);
}

async function setFlowSchema(idUser, idFlow, objFlow) {
    return await flowRepository.setFlowSchema(idUser, idFlow, objFlow);
}

async function  changeFlowSchema(idUser, idFlow, objFlow) {
    return await flowRepository.changeFlowSchema(idUser, idFlow, objFlow);
}

async function  setFlowActive(idUser, idFlow, objFlow) {
    return await flowRepository.setFlowActive(idUser, idFlow, objFlow);
}

async function  setNextNodeFlowActive(idUser, idClient, idFlow, idNextNode) {
    return await flowRepository.setNextNodeFlowActive(idUser, idClient, idFlow, idNextNode);
}


module.exports = { getFlowSchema, setFlowSchema, changeFlowSchema, setFlowActive, setNextNodeFlowActive, activeFlow, desactiveFlow }