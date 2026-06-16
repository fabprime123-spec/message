import { ImageKitConfig, uploadChatMedia } from "../lib/imagekit"
import { getRecieverSocketId, io } from "../lib/socket"
import { Message } from "../models/message.model"
import { User } from "../models/user.model"

export async function getUsersForSidebar(req: any, res: any) {
  try {
    const loggedInUserId = req.user._id
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-clerkId")

    res.status(200).json(filteredUsers)
  }
  catch (error) {
    console.error("Error in getUsersForSidebar:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export async function getConversationsForSidebar(req: any, res: any) {
  try {
    const loggedInUserId = req.user._id
    const conversations = await Message.aggregate([
      { $match: { $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }] } },
      {
        $group: {
          _id: { $cond: [{ $eq: ["$senderId", loggedInUserId] }, "$receiverId", "$senderId"] },
          lastMessageAt: { $max: "$createdAt" }
        }
      },
      { $sort: { lastMessageAt: -1 } },
      { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
      { $replaceRoot: { newRoot: { $first: "$user" } } },
      { $project: { clearkId: 0 } }
    ])

    res.status(200).json(conversations)
  }
  catch (error) {
    console.error("Error in getConversationsForSidebar:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export async function getMessages(req: any, res: any) {
  try {
    const { id: userToChatId } = req.params
    const myId = req.user._id

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId }
      ]
    }).sort({ createdAt: 1 })

    res.status(200).json(messages)
  }
  catch (error) {
    console.error("Error in getMessages:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export async function sendMessage(req: any, res: any) {
  try {
    const { text } = req.body
    const { id: receiverId } = req.params
    const senderId = req.user._id

    let imageUrl
    let videoUrl
    let audioUrl

    if (req.file) {
      if (!ImageKitConfig) return res.status(500).json({ message: "Media upload is not configured" })

      const url = await uploadChatMedia(req.file)
      if (req.file.mimetype.startsWith("image/")) imageUrl = url
      else if (req.file.mimetype.startsWith("video/")) videoUrl = url
      else audioUrl = url
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
      video: videoUrl,
      audio: audioUrl
    })
    await newMessage.save()

    // realtime communication with socket io
    const receiverSocketId = getRecieverSocketId(receiverId)
    if (receiverSocketId) io.to(receiverSocketId).emit("newMessage", newMessage)

    res.status(201).join(newMessage)
  }
  catch (error) {
    console.error("Error in sendMessage:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}