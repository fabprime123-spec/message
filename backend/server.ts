import express from "express"
import cors from "cors"
import fs from "fs"
import path from "path"
import "dotenv/config"

import { connectDB } from "./lib/database.js"
import { clerkMiddleware } from "@clerk/express"

const server = express()
const PORT = process.env.PORT || 5000
const FRONTEND_URL = process.env.FRONTEND_URL
const publicDir = path.join(process.cwd(), "frontend/dist")

server.use(express.json())
server.use(cors({ origin: FRONTEND_URL, credentials: true }))
server.use(clerkMiddleware())

server.get("/health", (req, res) => {
  res.status(200).json({ ok: true })
})

// if the public directory exists, serve the static files
// this is for the production build
if (fs.existsSync(publicDir)) {
  server.use(express.static(publicDir))
  server.get("/{*any}", (req, res, next) => {
    res.sendFile(path.join(publicDir, "index.html"), (error) => next(error))
  })
}

server.listen(PORT, () => {
  connectDB()
  console.log(`\x1b[33\nmServer Running on - ${PORT}\x1b[0m`)
})