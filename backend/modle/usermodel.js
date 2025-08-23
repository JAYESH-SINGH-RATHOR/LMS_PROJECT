import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    des:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        enum:['student' , 'educator'],
        required:true
    },
    photourl:{
        type:String,
        default:""
    },
    enrolledcourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"courses"
    }],
    resetotp:{
        type:String
    },
    otpExpires:{
        type:Date
    },
    isotpverifed:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

const user = mongoose.model("user", userschema);


export default user

