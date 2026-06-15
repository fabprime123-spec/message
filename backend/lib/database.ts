import mongoose from "mongoose"
import dns from "dns"

export async function connectDB() {
  try {
    const mongoURI = process.env.MONGO_URI
    if (!mongoURI) throw new Error("MONGO_URI is required")

    // Set fallback public DNS servers to resolve MongoDB SRV records
    // if the local/system DNS resolver fails in Node.js
    try {
      dns.setServers(["8.8.8.8", "8.8.4.4"])
    } catch (dnsErr) {
      console.warn("Warning: Failed to set custom DNS servers:", dnsErr)
    }

    const connect = await mongoose.connect(mongoURI)
    console.log(`\x1b[35mMongoDB Connected: ${connect.connection.host}\x1b[0m`)
  }
  catch (error) {
    console.log(`MongoDB Connection Failed: ${error}`)
    process.exit(1)
  }
}