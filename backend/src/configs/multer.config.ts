import { extname } from 'path'
import { existsSync, mkdirSync } from 'fs'
import { diskStorage } from 'multer'
import { env } from './env.config'
import { makeUUID } from '@/helpers/string.helper'

export const multerConfig = {
  dest: env.UPLOAD_LOCATION
}

// Multer upload options
export const multerOptions = {
  // Enable file size limits
  limits: {
    fileSize: env.MAX_FILE_SIZE
  },
  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/) || file.mimetype.match(/\.xlsx$/i)) {
      // Allow storage of file
      cb(null, true)
    } else {
      // Reject file
      //   cb(
      //     new exc.UnsupportedMediaType({
      //       message: `Unsupported file type ${extname(file.originalname)}`
      //     }),
      //     false
      //   )
    }
  },
  // Storage properties
  storage: diskStorage({
    // Destination storage path details
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = multerConfig.dest
      // Create folder if doesn't exist
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath)
      }
      cb(null, uploadPath)
    },
    // File modification details
    filename: (req: any, file: any, cb: any) => {
      // Calling the callback passing the random name generated with the original extension name
      cb(null, `${makeUUID(file.originalname)}`)
    }
  })
}
