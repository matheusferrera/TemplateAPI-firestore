const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore")
const { collection, getDocs, doc, setDoc, addDoc, getDoc, updateDoc } = require("firebase/firestore");
require('dotenv').config();
const _ = require('lodash');
const wppApi = require("./wppAPI.repository")

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


async function activeFlow(idUser, idFlow, idClients) { 

  if (!idUser || !idFlow || !idClients) {
    return { status: 400, error: "A requisicao necessita de um idUser, idFlow e um array de idClients" }
  }

  try {
  
    const respSchema = await setFlowSchema(idUser,idFlow, {"ativo": true})

    const response = {
      idClients: idClients,
      currentNode: respSchema.initialNode,
      nextNodes: respSchema.nextNodes
    }

    console.log("RES{PNSE _ ", response)

    response.currentNode.timestamp = Date.now()

    const respSet = await setFlowActive("user1", idFlow, response)

    return response
  } catch (error) {
    console.error("Erro ao ativar fluxo:", error);
    return { status: 500, error: "Erro ao ativar fluxo" };
  }
}

async function desactiveFlow(idUser, idFlow, idClients) { 
  console.log("DESACTIVE - ", idClients)
  if (!idUser || !idFlow || !idClients) {
    return { status: 400, error: "A requisicao necessita de um idUser, idFlow e um array de idClients" }
  }

  try {
    idClients.map((idClient, inde) => (
      console.log("id client -> ", idClient)
    ))
    return idClients
  } catch (error) {
    console.error("Erro ao desativar fluxo:", error);
    return { status: 500, error: "Erro ao desativar fluxo" };
  }
}

async function getFlowSchema(idUser, idFlow) {
  if (!idUser) {
    return { status: 400, error: "A requisicao necessita de um idUser" }
  }

  try {
    const docRef = doc(db, "flowsSchema", idUser);
    const querySnapshot = await getDoc(docRef);

    if(!querySnapshot.exists()){
      return { status: 404, error: "Não existe usuário com esse idUser" }
    }

    const response = querySnapshot.data();

    if(idFlow){
      const flowData = response[idFlow];
      if(flowData){
        return flowData;
      } else {
        return { status: 404, error: "Não existe esse idFlow para o usuário" };
      }
    }

    return response;

  } catch (error) {
    console.error("Erro ao obter esquema de fluxo:", error);
    return { status: 500, error: "Erro ao obter esquema de fluxo" };
  }
}

async function setFlowSchema(idUser, idFlow, objFlow) { 
  if (!idUser || !idFlow || !objFlow) {
    return { status: 400, error: "A requisicao necessita de um idUser, idFlow e um objeto de fluxo" }
  }

  try {
    const docRef = doc(db, "flowsSchema", idUser);
    const querySnapshot = await getDoc(docRef);

    if(!querySnapshot.exists()){
      return { status: 404, error: "Não existe usuário com esse idUser" }
    }

    const insertObj = { [idFlow]: objFlow };
    await setDoc(docRef, insertObj, { merge: true });
    const updatedSnapshot = await getDoc(docRef);
    return updatedSnapshot.data()[idFlow];

  } catch (error) {
    console.error("Erro ao definir esquema de fluxo:", error);
    return { status: 500, error: "Erro ao definir esquema de fluxo" };
  }
}

async function changeFlowSchema(idUser, idFlow, objFlow) { 
  if (!idUser || !idFlow || !objFlow) {
    return { status: 400, error: "A requisicao necessita de um idUser, idFlow e um objeto de fluxo" }
  }

  try {
    const docRef = doc(db, "flowsSchema", idUser);
    const querySnapshot = await getDoc(docRef);

    if(!querySnapshot.exists()){
      return { status: 404, error: "Não existe usuário com esse idUser" }
    }

    const updatedObj = { ...querySnapshot.data(), [idFlow]: objFlow };
    await setDoc(docRef, updatedObj);
    const updatedSnapshot = await getDoc(docRef);
    return updatedSnapshot.data()[idFlow];

  } catch (error) {
    console.error("Erro ao alterar esquema de fluxo:", error);
    return { status: 500, error: "Erro ao alterar esquema de fluxo" };
  }
}

async function setFlowActive(idUser, idFlow, objFlow) { 

  if (!idUser || !idFlow || !objFlow) {
    return { status: 400, error: "A requisicao necessita de um idUser, idFlow e um objeto de fluxo" }
  }

  try {
    const docRef = doc(db, "flowsActive", idUser);
    const querySnapshot = await getDoc(docRef);

    if(!querySnapshot.exists()){
      return { status: 404, error: "Não existe usuário com esse idUser" }
    }

    if(!objFlow.idClients){
      return { status: 400, error: "Necessita de um array de idClients" }
    }

    allDocs = await querySnapshot.data()

    objFlow.idClients.forEach(async idClient => {
      allDocs[idClient] = {}
      allDocs[idClient][idFlow] = {...objFlow}
      delete allDocs[idClient][idFlow].idClients;
      const respWpp =  await wppApi.sendTextMessage(objFlow.currentNode.content, idClient)
    });

    await setDoc(docRef, allDocs);
    return allDocs;

  } catch (error) {
    console.error("Erro ao definir fluxo ativo:", error);
    return { status: 500, error: "Erro ao definir fluxo ativo" };
  }
}

async function setNextNodeFlowActive(idUser, idClient, idFlow, idNextNode) { 
 
  if (!idUser || !idClient || !idFlow || !idNextNode) {
    return { status: 400, error: "A requisicao necessita de um idUser, idClient, idFlow e um idNextNode" }
  }

  let response = {}

  try {
    const docRefActives = doc(db, "flowsActive", idUser);
    const docRefSchemas = doc(db, "flowsSchema", idUser);
    const getFlowsActives = (await getDoc(docRefActives)).data();
    const getFlowsSchemas = (await getDoc(docRefSchemas)).data();
    const selectNode = getFlowsSchemas[idFlow].flow.nodes.find(node => node.id == idNextNode)

    console.log("SELECT NODE -:> ", selectNode)

    let newCurrentNode = {
      content: selectNode.data.value,
      idNode: idNextNode,
      type: selectNode.data.type,
      timestamp: Date.now()
    }

    let newNextNodes = {}


    getFlowsSchemas[idFlow].flow.edges.forEach(edge => {
    
      if(edge.source == idNextNode){
        let nextEdgeAction = edge
        let nextNodeAction = getFlowsSchemas[idFlow].flow.nodes.find(node => node.id == nextEdgeAction.target)
        
        let nextEdgeMessage = getFlowsSchemas[idFlow].flow.edges.find(edge => edge.source == nextNodeAction.id)
        let nextNodeMessage = getFlowsSchemas[idFlow].flow.nodes.find(node => node.id == nextEdgeMessage.target)

        newNextNodes[nextNodeAction.data.value] = {
          content: nextNodeMessage.data.value,
          idNode: nextNodeMessage.id,
          type: nextNodeMessage.data.type
        }
      }
    })

    response.idClients = [idClient]
    response.currentNode = newCurrentNode
    response.nextNodes = newNextNodes


    setFlowActive(idUser, idFlow, response)



    return response

  } catch (error) {
    console.error("Erro ao definir próximo nó do fluxo ativo:", error);
    return { status: 500, error: "Erro ao definir próximo nó do fluxo ativo" };
  }
}

module.exports = { getFlowSchema, setFlowSchema, changeFlowSchema, setFlowActive, setNextNodeFlowActive, activeFlow, desactiveFlow };

// Funções restantes (changeFlowSchema, setFlowActive, setNextNodeFlowActive) seguem a mesma lógica de ajustar os blocos catch para melhor tratamento de erros.
