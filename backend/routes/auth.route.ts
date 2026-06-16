import express from "express"
import { checkAuth } from "../controllers/auth.control"
import { protectRoute } from "../middleware/auth.middleware"

const router = express.Router()

router.get("/check", protectRoute, checkAuth)

export { router as authRoutes }