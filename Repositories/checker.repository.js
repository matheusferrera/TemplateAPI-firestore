const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore")
const { collection, getDocs, doc, setDoc, addDoc, getDoc, updateDoc } = require("firebase/firestore");
require('dotenv').config();


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


async function  checkMessage(idUser, idClient, objMessage) {

  if (!idUser || !idClient || !objMessage) {
    return { status: 404, error: "A requisicao necessita de um idClient, idUser e uma mensagem de texto no body da requisicao" }
  }

  try {

    const docRef = doc(db, "flowsActive", idUser);
    const flowsActive = await getDoc(docRef) 

    if (!flowsActive.exists()) {
      return { status: 404, error: "Nao existe flows ativos para o idUser" }
    }

    const dataFlowsActive = flowsActive.data()

    if(!dataFlowsActive.hasOwnProperty(idClient)){
      return { status: 200, error: "Nao existe flows ativos para o idClient" }
    }

    for (const idFlow in dataFlowsActive[idClient]) {

      const currentNode = dataFlowsActive[idClient][idFlow].currentNode;
      const nextNodes = dataFlowsActive[idClient][idFlow].nextNodes;
      let response = {}
      for (const nextNodeMessage in nextNodes) {
        if (limpaString(nextNodeMessage) === limpaString(objMessage.content)) {
          response = {
            idFlow: idFlow,
            ...nextNodes[nextNodeMessage],
          }
          return response;
        }
      }
    }
   

    return { status: 200, error: "Nao existe nextNode para essa mensagem" }


  } catch (error) {
    console.error("Erro ao obter documentos:", error);
  }
}



function limpaString(string) {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-zA-Z0-9]/g, "")
}


module.exports = { checkMessage }

