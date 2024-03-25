const axios = require("axios")
const messageRepository = require("../Repositories/message.repository.js");


const url = "https://graph.facebook.com/v18.0/207945742400750/messages";
const accessToken = "EAAM4fCQtPIQBO7G08k8tP2BTtZAshEEmcyEePHZB8ZCjBGqy7PwzF3BGhm8uUpAUeA2keNG8Gc5IB6bMocZC0VLfUwAF7ZC22ZArkeLZAXqAd6QytBwAzmrRXHqNFRMt4zGyVcYfA6w5ndu0x3FjSUC7derXUNFziCiKdSdJYVJC40eTfCQBh36GmgZBBsFHUTc3";


const headers = {
  Authorization: `Bearer ${accessToken}`,
  "Content-Type": "application/json",
};

async function sendTextMessage(message, targetPhone) {
  
  const data = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: targetPhone,
    type: "template",
    template: {
          "name": "teste_ofc",
          "language": {
              "code": "pt_BR",
              "policy": "deterministic"
          },
          "components": [{
              "type": "body",
              "parameters": [
                  {
                      "type": "text",
                      "text": "your-text-string"
                  },
              ]
          }]
      }
  }
  
    let objDb = {
        status: "delivered",
          timeStamp: new Date().getTime(),
          content: message
    }
  
  try {
    console.log("TENTANDO O FETCH!")
    const response = await axios.post(url, data, { headers });
    console.log("RESPONSE -  ", response)
    console.log("RESPONSE DATA -  ", response.data)
     await messageRepository.setMessage("user1",targetPhone, response.data.messages[0].id, objDb)
    return response
  } catch (e) {
    console.log("ERRO -> ", e)
    throw("======> [MessageService/sendTextMessage] -> ", e)
  }
}


sendTextMessage("testando", "556192045128")
