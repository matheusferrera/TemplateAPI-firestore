const express = require("express")
const routerMessage = require("./Routers/message.router.js")
const routerFlow = require("./Routers/flow.router.js")
const routerChecker = require("./Routers/checker.router.js")
const wppGateway = require("./Routers/wppGateway.router.js")
const cors = require("cors")
const cron = require('cron')

const app = express()
app.use(express.json())
app.use(cors())


app.use("/message", routerMessage)
app.use("/flow", routerFlow)
app.use("/checker", routerChecker)
app.use("/wppGateway", wppGateway)


// const job = new cron.CronJob(
// 	'* * * * * *', // cronTime
// 	function () {
// 		console.log('You will see this message every second');
// 	}, // onTick
// 	null, // onComplete
// 	false, // start
// 	'America/Los_Angeles' // timeZone
// );
// job.start()

app.listen(3001, async () => { //Criacao do arquivo para armazenar dados
    try {
        console.log("===========> SERVIDOR LIGADO - ", new Date, " <===========")
       
    } catch(err){
        console.log(err)
    }
    
})

