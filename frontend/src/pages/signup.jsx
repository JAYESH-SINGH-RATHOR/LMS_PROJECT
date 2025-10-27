import React, { useState } from 'react';
import LogoImg from '../assets/lms.jpg';
import Google from '../assets/google.jpg';
import { IoEyeOutline } from "react-icons/io5";
import { IoIosEye } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { serverulr } from '../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { setuserdata } from '../redux/userslice';
import { signInWithPopup } from 'firebase/auth';
import { provider , auth} from '../../utils/firebase';

function Signup() {
  const [show, setshow] = useState(false);
  const navigate = useNavigate();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [role, setrole] = useState('student');
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  const handleSignup = async () => {
    setloading(true);
    try {
      const res = await axios.post(
        serverulr + "api/auth/signup",
        { name, email, password, role },
        { withCredentials: true }
      );
      dispatch(setuserdata(res.data));
      setloading(false);
      navigate("/");
      toast.success("Signup Successfully");
    } catch (error) {
      console.log(error);
      setloading(false);
      toast.error(error?.response?.data?.message || "Signup failed");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup();
  };

  const googlesignup = async() =>{
    try {
      const response = await signInW2ithPopup(auth , provider)
      let user = response.user
      let name = user.displayName
      let email = user.email

    const result = await axios.post(`${serverulr}api/auth/googleauth`, { name, email, role }, { withCredentials: true });

       dispatch(setuserdata(result.data));
       navigate("/")
      toast.success("Signup with Google Successful");
    } catch (error) {
  console.log(error)
  toast.error(error?.response?.data?.message || error.message || "Signup failed")
}
  }

  return (
    <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center'>
      <form
        className='w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex'
        onSubmit={handleSubmit}
      >
        {/* Left */}
        <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3'>
          <div>
            <h1 className='font-semibold text-black text-2xl'>Let's get Started</h1>
            <h2 className='text-[#999797] text-[18px]'>Create your account</h2>
          </div>

          <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
            <label htmlFor="name" className='font-semibold'>Name</label>
            <input
              id='name'
              type="text"
              placeholder='Enter your name'
              className='border w-full h-[35px] border-[#e7e6e6] text-[15px] px-[20px]'
              onChange={(e) => setname(e.target.value)}
              value={name}
            />

            <label htmlFor="email" className='font-semibold'>Email</label>
            <input
              id='email'
              type="email"
              placeholder='Enter your email'
              className='border w-full h-[35px] border-[#e7e6e6] text-[15px] px-[20px]'
              onChange={(e) => setemail(e.target.value)}
              value={email}
            />

            <label htmlFor="password" className='font-semibold'>Password</label>
            <div className='relative w-full'>
              <input
                id='password'
                type={show ? "text" : "password"}
                placeholder='Enter your password'
                className='border w-full h-[35px] border-[#e7e6e6] text-[15px] px-[20px] pr-[40px] rounded'
                onChange={(e) => setpassword(e.target.value)}
                value={password}
              />
              {!show ? (
                <IoEyeOutline
                  className='absolute w-[20px] h-[20px] cursor-pointer right-3 top-1/2 transform -translate-y-1/2'
                  onClick={() => setshow(prev => !prev)}
                />
              ) : (
                <IoIosEye
                  className='absolute w-[20px] h-[20px] cursor-pointer right-3 top-1/2 transform -translate-y-1/2'
                  onClick={() => setshow(prev => !prev)}
                />
              )}
            </div>
          </div>

          <div className='flex md:w-[50%] w-[70%] items-center justify-between'>
            <span
              className={`px-[10px] py-[5px] border-[2px] rounded-xl cursor-pointer hover:border-black ${role === "student" ? "border-black" : "border-[#646464]"}`}
              onClick={() => setrole("student")}
            >
              Student
            </span>
            <span className={`px-[10px] py-[5px] border-[2px] rounded-xl cursor-pointer hover:border-black ${role === "educator" ? "border-black" : "border-[#646464]"}`}
              onClick={() => setrole("educator")}
            >
              Educator
            </span>
          </div>

          <button
            type="submit"
            className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]'
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color='white' /> : "Signup"}
          </button>

          <div className='w-[80%] flex items-center gap-2'>
            <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
            <div className='w-[50%] text-[15px] text-[#6f6f6f]'>Or Continue</div>
            <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
          </div>

          <div className='w-[80%] h-[40px] border border-black rounded-[5px] flex items-center justify-center gap-2 ' onClick={googlesignup}>
            <img src={Google} alt="Google Logo" className='w-[25px]' />
            <span className='text-[20px] text-gray-500'>oogle</span>
          </div>

          <div className="text-[#6f6f6f]">
            Already have an account?{" "}
            <span className='underline underline-offset-1 text-black cursor-pointer' onClick={() => navigate("/login")}>
              Login
            </span>
          </div>
        </div>

        {/* Right */}
        <div className='w-[50%] h-[100%] rounded-r-2xl bg-black md:flex items-center justify-center flex-col hidden'>
          <img src={LogoImg} alt="Logo" className='w-30 shadow-2xl' />
          <span className='text-2xl text-white text-center'>Learning Management System</span>
        </div>
      </form>
    </div>
  );
}

export default Signup;
