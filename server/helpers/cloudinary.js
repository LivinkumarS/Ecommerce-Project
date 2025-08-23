import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "ddzm2q89c",
  api_key: "597196449487327",
  api_secret: "m33eaASj-SOAZPC59Z2S8kGf7i8",
});

const storage = new multer.memoryStorage();
const upload = multer({ storage });

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}


export { upload, imageUploadUtil };
