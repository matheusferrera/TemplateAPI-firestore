const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore")
const { collection, getDocs, doc, setDoc, getDoc, updateDoc } = require("firebase/firestore");
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

async function getMessage(idClient, idMessage) {
  let response = {}
  try {
    if(!idClient && !idMessage){ //Todas as mensagens 
      const querySnapshot = await getDocs(collection(db, "user1"));
      querySnapshot.forEach((doc) => {
        response[doc.id] = doc.data()
      });
    } 

    if(idClient && !idMessage){ //todas as mensagem enviadas a idClient
      const docRef = doc(db, "user1", idClient); 
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        response[docSnapshot.id] = docSnapshot.data()
      } else {
        return { status: 404, error: "Nao foi encontrada mensagem com esse idClient" };
      }
    } 

    if(idClient && idMessage){ //Somente a mensagem idMessage enviada a idClient
      const docRef = doc(db, "user1", idClient); 
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const respDb = docSnapshot.data()
        if (respDb.hasOwnProperty(idMessage)){
          response[docSnapshot.id] = docSnapshot.data()
        } else {
          return { status: 404, error: "Nao foi encontrada mensagem com esse idMessage" };
        }
        
      } else {
        return { status: 404, error: "Nao foi encontrada mensagem com esse idClient" };
      }
    } 
    return response
  } catch (error) {
    console.error("Erro ao obter documentos:", error);
  }
}

async function setMessage(idClient, idMessage, objMessage) { //Se possuir no DB ele somente altera os campos e se nao possuir cria um novo obj
  
  
  try {
    const docRef = doc(db, "user1", idClient);
    let objDb = {}
    objDb[+new Date()] = objMessage
    await setDoc(docRef, objDb, { merge: true });
   
  } catch (err) {
   console.log(err)
  } 
}


module.exports = { getMessage, setMessage }

