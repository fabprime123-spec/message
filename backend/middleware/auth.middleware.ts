import { getAuth } from "@clerk/express"
import { User } from "../models/user.model"
import { Response } from "express"

export async function protectRoute(req: any, res: Response, next: any) {
  try {
    const { userId } = getAuth(req)
    if (!userId) {
      res.status(401).json({ message: "Unauthorized access" })
      return
    }

    const user = await User.findOne({ clerkId: userId })
    if (!user) {
      res.status(404).json({ message: "User not found" })
      return
    }

    req.user = user
    next()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}