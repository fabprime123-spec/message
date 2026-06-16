import multer from "multer"

const MAX_FILE_SIZE = 25 * 1024 * 1024 // 25mb

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, callback) => {
    const image = file.mimetype.startsWith("image/")
    const video = file.mimetype.startsWith("video/")
    const audio = file.mimetype.startsWith("audio/")

    if (!image && !video && !audio) {
      callback(new Error("Only images and videos uploads are allowed"))
      return
    }
    callback(null, true)
  }
})