import express from 'express';
import isauth from '../middleware/isauth.js';
import { getcurrentuser } from '../controller/usercontroller.js';

const userrouter = express.Router()


userrouter.get("/getcurrentuser" , isauth , getcurrentuser)

export default userrouter