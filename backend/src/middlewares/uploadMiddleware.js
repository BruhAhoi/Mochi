import multer from "multer";
import {v2 as cloudinary} from 'cloudinary'

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 1,
  },
});

export const uploadImageFormBuffer = (bufffer, options) => {
  return new Promise((resovle, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "Mochi/avatar",
        resource_type: "image",
        transformation: [{ width: 200, height: 200, crop: "fill" }],
        ...options,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resovle(result);
        }
      },
    );
    uploadStream.end(bufffer);
  });
};
