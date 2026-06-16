import express from "express"
import { getUsersForSidebar, getConversationsForSidebar, getMessages, sendMessage } from "../controllers/message.control"
import { protectRoute } from "../middleware/auth.ware"
import { upload } from "../middleware/upload.ware"

const router = express.Router()

router.use(protectRoute)
router.get("/users", getUsersForSidebar)
router.get("/conversations", getConversationsForSidebar)
router.get(":/id", getMessages)
router.post("/send/:id", upload.single("media"), sendMessage)

export { router as messageRoutes }