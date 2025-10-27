import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const uploadOnCloudinary = async(filePath) => {
  try {
    cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  } catch (error) {
    console.error("Cloudinary Configuration Error:", error);
  }

  try {
    if (!filePath) {
      return null;
    }

    const uploadRes = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto"
    });

    fs.unlinkSync(filePath); // delete local file
    return uploadRes.secure_url;
  } 
  catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};

export default uploadOnCloudinary;
