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


async function getFlowSchema(idUser, idFlow) {

  if (!idUser) {
    return { status: 404, error: "A requisicao necessita de um idUser" }
  }

  try {

    const docRef = doc(db, "flowsSchema", idUser);

    const querySnapshot = await getDoc(docRef);
    let response = querySnapshot.data()

    if(!querySnapshot.data()){
      return { status: 400, error: "Não existe usuario com esse idUser" }
    }

    if(idFlow){
      return response[idFlow] || { status: 400, error: "Não existe esse idFlow para o usuario" }
    }

    return querySnapshot.data();


  } catch (error) {
    console.error("Erro ao obter documentos:", error);
  }
}


async function setFlowSchema(idUser, idFlow, objFlow) { //Se possuir no DB ele somente altera os campos e se nao possuir cria um novo obj

  if (!idUser, !idFlow, !objFlow) {
    return { status: 404, error: "A requisicao necessita de um idUser" }
  }

  try {

    const docRef = doc(db, "flowsSchema", idUser);
    const querySnapshot = await getDoc(docRef);

    let response = querySnapshot.data()
    let insertObj = {}

    if(!response){
      return { status: 400, error: "Não existe usuario com esse idUser" }
    }

    insertObj[idFlow] = objFlow

    await setDoc(docRef, insertObj, { merge: true });
    const respQuery = await getDoc(docRef);
    
    return respQuery.data()[idFlow];


  } catch (error) {
    console.error("Erro ao obter documentos:", error);
  }
}


module.exports = { getFlowSchema, setFlowSchema }