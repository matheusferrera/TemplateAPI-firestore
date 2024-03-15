const flowRepository = require("../Repositories/flow.repository.js");


async function getFlowSchema(idUser, idFlow) {
    return await flowRepository.getFlowSchema(idUser, idFlow);
}

async function setFlowSchema(idUser, idFlow, objFlow) {
    return await flowRepository.setFlowSchema(idUser, idFlow, objFlow);
}


module.exports = { getFlowSchema, setFlowSchema }