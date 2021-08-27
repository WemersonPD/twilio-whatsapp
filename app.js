const express = require("express")
const morgan = require("morgan")
const client = require("twilio")
const dotenv = require("dotenv")

dotenv.config()

const app = express()
app.use(express.json())
app.use(morgan("dev"))


app.post("/message", async (request, response) => {
  const { body } = request
  const { data } = body

  console.log({
    in: "message",
    data
  })
  return await response.status(200).send("ok")
})

app.post("/status", async (request, response) => {
  const { body } = request
  const { data } = body

  console.log({
    in: "status",
    data
  })
  return await response.status(200).send("ok")
})


app.get("/", async (request, response) => {
  const accountSid = process.env.TWILIO_ACCOUNTSID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const phoneNumber = process.env.TWILIO_PHONE_NUMBER

  const connect = client(accountSid, authToken)

  const messageResponse = await connect.messages
      .create({
         from: `whatsapp:+${phoneNumber}`,
         body: 'Hello there!',
         to: 'whatsapp:+yourPhoneNumber'
       })
      
  console.log(messageResponse);

  return response.status(200).json(messageResponse)
})


module.exports = app

