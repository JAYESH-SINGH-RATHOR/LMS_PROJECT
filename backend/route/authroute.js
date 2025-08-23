import express from "express";
import { login, logout, signup ,sendotp  , resetpassword ,verifyotp  ,googleauth} from "../controller/authcontroller.js";

const authrouter = express.Router();

authrouter.post('/signup' , signup);
authrouter.post('/login' , login);
authrouter.get('/logout', logout);
authrouter.post("/sendotp" , sendotp);
authrouter.post("/verifyotp" , verifyotp);
authrouter.post("/resetpassword" , resetpassword);
authrouter.post("/googleauth", googleauth)

export default authrouter