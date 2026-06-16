import ImageKit, { toFile } from "@imagekit/nodejs"

const imagekit = new ImageKit({ privateKey: process.env.IMAGEKIT_PRIVATE_KEY })

function ImageKitConfig() {
  return Boolean(process.env.IMAGEKIT_PRIVATE_KEY)
}

// prevent duplicate name of files
function createFileName(originalName = "upload") {
  const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, "_")
  return `chat-${Date.now()}-${safeName}`
}

/**
 * @see http://imagekit.io/docs/api-reference/upload-file/upload-file
*/

async function uploadChatMedia(file: any) {
  const filename = createFileName(file.originalName)

  const result = await imagekit.files.upload({
    file: await toFile(file.buffer, filename, { type: file.mimetype }),
    fileName: filename,
    folder: "/message-web"
  })

  return result.url
}

export { uploadChatMedia, ImageKitConfig }