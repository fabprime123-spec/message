import express from "express"
import cors from "cors"
import "dotenv/config"
import { connectDB } from "./lib/database.ts"
import { clerkMiddleware } from "@clerk/express"

const server = express()
const PORT = process.env.PORT || 5000
const FRONTEND_URL = process.env.FRONTEND_URL

server.use(express.json())
server.use(cors({ origin: FRONTEND_URL, credentials: true }))
server.use(clerkMiddleware())

server.get("/health", (req, res) => {
  res.status(200).json({ ok: true })
})

server.listen(PORT, () => {
  connectDB()
  console.log(`\x1b[33\nmServer Running on - ${PORT}\x1b[0m`)
})