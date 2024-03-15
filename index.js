const express = require("express")
const routerMessage = require("./Routers/message.router.js")
const routerFlow = require("./Routers/flow.router.js")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())


app.use("/message", routerMessage)
app.use("/flow", routerFlow)

app.listen(3001, async () => { //Criacao do arquivo para armazenar dados
    try {
        console.log("===========> SERVIDOR LIGADO - ", new Date, " <===========")
    } catch(err){
        console.log(err)
    }
    
})

