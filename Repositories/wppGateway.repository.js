const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore")
const { collection, getDocs, doc, setDoc, addDoc, getDoc, updateDoc } = require("firebase/firestore");
require('dotenv').config();
const checkerRepository = require("./checker.repository")
const flowRepository = require("./flow.repository")

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


async function reciveMessage(idUser, idClient, objMessage) {

  if (!idUser || !idClient || Object.keys(objMessage).length === 0) {
    return { status: 404, error: "A requisicao necessita de um idClient, idUser e objMessage" }
  }
  let response = {}
  try {
    const checkMessage = await checkerRepository.checkMessage(idUser, idClient, objMessage)

    if (checkMessage.error){
      return checkMessage
    }

    response.reciveMessage = objMessage

  const flow = await flowRepository.setNextNodeFlowActive("user1", idClient, checkMessage.idFlow, checkMessage.idNode)

  response.nextNode = flow
    
    return response
    

  } catch (error) {
    console.error("Erro ao obter documentos:", error);
  }
}


async function sendMessage(idUser, idClient, objMessage) { //Se possuir no DB ele somente altera os campos e se nao possuir cria um novo obj

  if (!idUser || !idClient || Object.keys(objMessage).length === 0) {
    return { status: 404, error: "A requisicao necessita de um idClient, idUser e objMessage" }
  }

  try {


  } catch (err) {
    console.log(err)
  }
}


module.exports = { reciveMessage, sendMessage }

