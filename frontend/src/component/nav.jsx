import React, { useState } from 'react'
import logo from "../assets/logo.jpg"
import { IoPersonCircle } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverulr } from '../App';
import { useDispatch } from 'react-redux';
import { setuserdata } from '../redux/userslice';
import { toast } from 'react-toastify';
import { RxHamburgerMenu } from "react-icons/rx";
import { ImCross } from "react-icons/im";
function nav() {
    const {userdata} = useSelector(state => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [show,setshow] = useState(false)
    const [showham,setshowham] = useState(false)

    const handlelogout = async () =>{
        try {
            const res = await axios.get(serverulr + "api/auth/logout" ,{withCredentials:true});
            dispatch(setuserdata(null))
            console.log(res.data);
            toast.success("logout successfully");

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
            
        }
    }
  return (
    <div>
        <div className='w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-10 '>
            <div className='lg:w-[20%] w-[40%] lg:pl-[50px] '>
                <img src={logo} alt="" className='w-[60px] rounded-[5px] border-2 border-white ' />
            </div>

           <div className='w-[30%] lg:flex items-center justify-center gap-4 hidden'>
                {!userdata && <IoPersonCircle className='w-[50px] h-[50px] fill-black cursor-pointer' onClick={() => setshow(prev => !prev)} />}

               {userdata && <div className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer" onClick={() => setshow(prev => !prev)}>
                    {userdata?.name.slice(0,1).toUpperCase()}
                </div>}

                {userdata?.role?.toLowerCase() == "educator" && <div className='px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white bg-[black] text-black rounded-[10px] text-[18px] font-light  cursor-pointer'>Dashboard</div>}

                {!userdata ?<span className='px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#000000d5]' onClick={() => navigate('/login')}>Login</span> : <span className="px-[20px] py-[10px] bg-white text-black rounded-[10px] shadow-sm shadow-black text-[18px] cursor-pointer" onClick={handlelogout}>Logout</span>}

                {show && <div className="absolute top-[110%] right-[15px] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-[white] px-[15px] py-[10px] border-[2px] border-black hover:border-white hover:text-white cursor-pointer hover:bg-black">
                    <span className="bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600" onClick={() =>navigate("/profile")}>My Profile</span>
                    <span className="bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600">My Courses</span>
                </div>}
            </div>
                <RxHamburgerMenu className='w-[40px] h-[40px] lg:hidden fill-black cursor-pointer' onClick={() => setshowham(prev => !prev)}/>

                <div className={`fixed left-0 fill-white top-0 w-[100vw] h-[100vh] bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 lg:hidden ${showham ? "translate-x-[0] transistion duration-600  " : "translate-x-[-100%] transistion duration-600  " }`}>
                    <ImCross className='w-[35px] h-[35px] fill-white absolute top-5 right-[4%]'  onClick={() => setshowham(prev => !prev)}/>

                {!userdata && <IoPersonCircle className='w-[50px] h-[50px] fill-black cursor-pointer'  />}
               {userdata && <div className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer" >
                    {userdata?.name.slice(0,1).toUpperCase()}
                </div>}
                <div className='w-[200px] h-[65px] flex items-center justify-center border-2 lg:border-white border-black lg:text-white bg-[black] text-white rounded-[10px] text-[18px] font-light  cursor-pointer' onClick={() =>navigate("/profile")}>My Profile</div>

                <div className='w-[200px] h-[65px] flex items-center justify-center border-2 lg:border-white border-black lg:text-white bg-[black] text-white rounded-[10px] text-[18px] font-light  cursor-pointer'>My Courses</div>

                {userdata?.role?.toLowerCase() == "educator" && <div className='w-[200px]  h-[65px] items-center justify-center flex  border-2 lg:border-white border-black lg:text-white bg-[black] text-white rounded-[10px] text-[18px] font-light  cursor-pointer'>Dashboard</div>}

                {!userdata ?<span className='w-[200px]  h-[65px] items-center justify-center flex  border-2 lg:border-white border-black lg:text-white bg-[black] text-white rounded-[10px] text-[18px] font-light  cursor-pointer' onClick={() => navigate('/login')}>Login</span> : <span className='w-[200px]  h-[65px] items-center justify-center flex  border-2 lg:border-white border-black lg:text-white bg-[black] text-white rounded-[10px] text-[18px] font-light  cursor-pointer'
                 onClick={handlelogout}>Logout</span>}

                </div>
        </div>
    </div>
  )
}

export default nav