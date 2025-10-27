import express from 'express'
import dotenv from 'dotenv'
import connectdb from './config/connectdb.js';
import cookieParser from 'cookie-parser';
import authrouter from './route/authroute.js';
import cors from "cors"
import userrouter from './route/userroute.js';
import process from "process"
dotenv.config();


const port = process.env.PORT;
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use('/api/auth', authrouter); 
app.use('/api/myuser', userrouter); 


app.get("/",(req , res) =>{
    res.send('hello from server')
})

app.listen(port ,() => {
    console.log("server started " , port);
    connectdb();
})

