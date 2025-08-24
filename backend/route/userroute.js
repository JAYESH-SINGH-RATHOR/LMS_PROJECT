import express from 'express';
import isauth from '../middleware/isauth.js';
import { getcurrentuser, updateProfile } from '../controller/usercontroller.js';
import upload from '../middleware/multer.js';

const userrouter = express.Router()


userrouter.get("/getcurrentuser" , isauth , getcurrentuser)
userrouter.post("/profile",isauth,upload.single("photourl") , updateProfile)

export default userrouter