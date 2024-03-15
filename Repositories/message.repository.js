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


async function getMessage(idUser, idClient, idMessage) {

  if (!idUser, !idClient) {
    return { status: 404, error: "A requisicao necessita de um idClient e um idUser" }
  }
  let response = {}
  try {

    const docRef = doc(db, "messages", idUser);
    if (!((await getDoc(docRef)).exists())) {
      return { status: 404, error: "Nao existe o idUser" }
    }

    const colecaoRef = collection(docRef, idClient);
    const querySnapshot = await getDocs(colecaoRef);
    querySnapshot.forEach((doc) => {
      response[doc.id] = doc.data()
    });

    if(Object.keys(response).length == 0){
      return { status: 400, error: "idUser nunca enviou mensagem para o idClient" }
    }

    return response;


  } catch (error) {
    console.error("Erro ao obter documentos:", error);
  }
}


async function setMessage(idUser, idClient, idMessage, objMessage) { //Se possuir no DB ele somente altera os campos e se nao possuir cria um novo obj

  if (!idUser, !idClient, !idMessage) {
    return { status: 404, error: "A requisicao necessita de um idClient, idUser e idMessage" }
  }

  try {
    const docRef = doc(db, "messages", idUser);
    const colecaoRef = collection(docRef, idClient);
    const docRefMsg = doc(colecaoRef, idMessage)


    const addDocResp = await setDoc(docRefMsg, objMessage, { merge: true });
    const resp = await getDoc(docRefMsg)
    return resp.data()

  } catch (err) {
    console.log(err)
  }
}


module.exports = { getMessage, setMessage }

