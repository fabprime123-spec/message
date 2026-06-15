import express from "express"
import "dotenv/config"

const server = express()
const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`\x1b[33mServer Running on - ${PORT}\x1b[0m`)
})