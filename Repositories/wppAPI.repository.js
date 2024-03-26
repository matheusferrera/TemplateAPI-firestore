const axios = require("axios")
const messageRepository = require("../Repositories/message.repository.js");


const url = "https://graph.facebook.com/v18.0/207945742400750/messages";
const accessToken = "EAAM4fCQtPIQBO7G08k8tP2BTtZAshEEmcyEePHZB8ZCjBGqy7PwzF3BGhm8uUpAUeA2keNG8Gc5IB6bMocZC0VLfUwAF7ZC22ZArkeLZAXqAd6QytBwAzmrRXHqNFRMt4zGyVcYfA6w5ndu0x3FjSUC7derXUNFziCiKdSdJYVJC40eTfCQBh36GmgZBBsFHUTc3";


const headers = {
  Authorization: `Bearer ${accessToken}`,
  "Content-Type": "application/json",
};

async function sendWppMessage(type, content, targetPhone) {
  
  let data;
  
  if (type === 'text') {
    data = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: targetPhone,
      type: type,
      text: {
        preview_url: false,
        body: content,
      },
    };
  } else if (type === 'template') {
    data = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: targetPhone,
      type: type,
      template: {
        name: content,
        language: {
          code: "pt_BR"
        }
      }
    };
  } else {
    throw new Error('Invalid message type.');
  }
  
    let objDb = {
        status: "delivered",
        timeStamp: new Date().getTime(),
        content: content,
        type: type
    }
  
  try {
    const response = await axios.post(url, data, { headers });
    const respSet = await messageRepository.setMessage("user1", response.data.contacts[0].wa_id, response.data.messages[0].id, objDb)
    return response
  } catch (e) {
    return e

  }
}



module.exports = { sendWppMessage }