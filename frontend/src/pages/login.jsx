import React, { useState } from 'react'
import LogoImg from '../assets/lms.jpg'
import Google from '../assets/google.jpg'
import { IoEyeOutline } from "react-icons/io5";
import { IoIosEye } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { serverulr } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setuserdata } from '../redux/userslice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/firebase';

function login() {
   const [show , setshow] = useState(false);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
      const [loading, setloading] = useState(false);
    
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handlelogin = async () =>{
    setloading(true);
    try {
        const res = await axios.post(serverulr + "api/auth/login" , {email:email , password:password} , {withCredentials:true});
        dispatch(setuserdata(res.data));
        setloading(false)
        toast.success("login successfully");
        navigate("/")

    } catch (error) {
        console.log(error)   
        setloading(false)
        toast.error(error.response.data.message);
    }
   }

     const googleLogin = async() =>{
       try {
         const response = await signInWithPopup(auth , provider)
         let user = response.user
         let name = user.displayName
         let email = user.email
         let role = ""
   
       const result = await axios.post(`${serverulr}api/auth/googleauth`, { name, email, role }, { withCredentials: true });
   
          dispatch(setuserdata(result.data));
          navigate("/")
         toast.success("Login with Google Successful");
       } catch (error) {
     console.log(error)
     toast.error(error?.response?.data?.message || error.message || "Signup failed")
   }
     }

    return (
      <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center'>
        <form className='w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex' onSubmit={(e) => e.preventDefault()}>
  
          {/* left_div */}
          <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3'>
              <div>
                <h1 className="font-semibold text-black text-2xl">Welcome back to LMS</h1>
                <h2 className="text-[#999797] text-[18px]">Login in your account</h2>
              </div>
              <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 '>
                  <label htmlFor="email" className='font-semibold'>Email</label>
                  <input id='email' type="email" placeholder='enter your email' className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] '  onChange={(e) => setemail(e.target.value)}
              value={email} />
  
                  <label htmlFor="password" className='font-semibold'>Password</label>
                  <div className='relative w-full'>
                  <input id='password' type={show ? "text" : "password"} placeholder='enter your password' className='border w-full h-[35px] border-[#e7e6e6] text-[15px] px-[20px] pr-[40px] rounded'
                  onChange={(e) => setpassword(e.target.value)} value={password} />
                  
                  {!show ? (
                      <IoEyeOutline className='absolute w-[20px] h-[20px] cursor-pointer right-3 top-1/2 transform -translate-y-1/2' onClick={() =>setshow(prev => !prev)} />
                  ) : (
                      <IoIosEye className='absolute w-[20px] h-[20px] cursor-pointer right-3 top-1/2 transform -translate-y-1/2' onClick={() =>setshow(prev => !prev)}/>
                  )}
                  </div>
  
              </div>
             
              <button className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]'disabled={loading} onClick={handlelogin}>{loading ?<ClipLoader size={30} color='white'/>:"Login"}</button>

              <span className='text-[13px] cursor-pointer text-[#585757]' onClick={() => navigate("/forget")}>Forget Your Password ?</span>
  
              <div className='w-[80%] flex items-center gap-2'>
                  <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
                  <div className='w-[50%] text-[15px] text-[#6f6f6f]'>Or Continue</div>
                  <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
              </div>
  
              <div className='w-[80%] h-[40px] border-1 border-[black] rounded-[5px] flex item-center justify-center' onClick={googleLogin}>
                  <img src={Google} alt="" className='w-[25px]'/>
                  <span className='text-[20px] text-gray-500'>oogle</span>
              </div>
              <div className="text-[#6f6f6f]">Create have a account
                     <span className='underline underline-offset-1 text-[black]' onClick={() => navigate("/signup")}> Signup</span>
            </div>
          </div>
  
          {/* right_div */}
          <div className='w-[50%] h-[100%] rounded-r-2xl bg-[black] md:flex items-center justify-center flex-col hidden'>
              <img src={LogoImg} alt="MYIMG" className='w-30 shadow-2xl' />
              <span className='text-2xl text-white'>Learning Management System</span>
          </div>
        </form>
      </div>
)}

export default login