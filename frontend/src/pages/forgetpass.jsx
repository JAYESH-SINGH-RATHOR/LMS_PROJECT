import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { serverulr } from '../App';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { set } from 'mongoose';

function forgetpass() {
    const [step,setstep] = useState(1);
    const navigate = useNavigate()
    const [email ,setemail] = useState("")
    const [otp , setotp] = useState('')
        const [newpassword , setnewpassword] = useState('')
        const [conpassword , setconpassword] = useState('')
        const[loading , setloading] = useState(false)

    // for step 1
    const sendotp = async() =>{
        setloading(true)
        try {
            const result = await axios.post(serverulr + "api/auth/sendotp" , {email} , {withCredentials:true , timeout: 5000})
            console.log(result.data)
            setloading(false)
            setstep(2)
            toast.success(result.data.message);
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            setloading(false)
        }
    }

    // step 2
       const verifyotp = async () => {
    setloading(true);
    try {
        const result = await axios.post(serverulr + "/api/auth/verifyotp", { email, otp }, { withCredentials: true });
        console.log(result.data);
        setloading(false);
        setstep(3);
        toast.success(result.data.message);
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong");
        setloading(false);
    }
};

        // step 3

        const resetpassword = async() =>{
            setloading(true)
            if(newpassword != conpassword){
                return toast.error("password is not matched")
            }
            try {
                const result = await axios.post(serverulr + "/api/auth/resetpassword" ,{email , password:newpassword} , {withCredentials:true})
                console.log(result.data)
                setloading(false)
                navigate('/login')
                toast.success(result.data.message);
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.message)
            }
        }

  return (
    <div className='min-h-screen flex items-center justify-center bg-grey-100 px-4'>
        {/* step 1 */}
         {step == 1 && <div className=" bg-white shadow-md rounded-xl p-8 max-w-md w-full">
           <h2 className='text-2xl font-bold mb-6 text-center text-grey-800'>Forget Your Passowrd</h2>
           <form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
            <div>
                <label htmlFor="email" className='block text-sm font-medium text-grey-700'>Enter Your Email</label>
                <input type="text" id='email' className='mt-1 w-full px-4 py-2 border border-grey-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]' placeholder='you@example.com' required  onChange={(e) =>setemail(e.target.value)} value={email}/>
                </div>
                <button className="w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md-font-medium cursor-pointer" disabled={loading} onClick={sendotp}>{loading ?<ClipLoader size ={30} color ='white' /> :"Send Otp"}</button>
           </form>
           <div className="text-sm text-center mt-4" onClick={() =>navigate("/login")}>
            Back To Login
           </div>
         </div>}

        {/* step 2 */}
         {step == 2 && <div className=" bg-white shadow-md rounded-xl p-8 max-w-md w-full">
           <h2 className='text-2xl font-bold mb-6 text-center text-grey-800'>Enter Your Otp</h2>
           <form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
            <div>
                <label htmlFor="otp" className='block text-sm font-medium text-grey-700'>Please enter your four digit code</label>
                <input type="text" id='otp' className='mt-1 w-full px-4 py-2 border border-grey-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]' placeholder='X X X X' required onChange={(e) =>setotp(e.target.value)} value={otp}/>
                </div>
                <button className="w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md-font-medium cursor-pointer" disabled={loading} onClick={verifyotp}>{loading ? <ClipLoader size={30} color='white'/>:"Verify Otp"}</button>
           </form>
           <div className="text-sm text-center mt-4" onClick={() =>navigate("/login")}>
            Back To Login
           </div>
         </div>}


        {/* step 3 */}
         {step == 3 && <div className=" bg-white shadow-md rounded-xl p-8 max-w-md w-full">
           <h2 className='text-2xl font-bold mb-6 text-center text-grey-800'>Reset Your Passowrd</h2>
           <p className="text-sm text-grey-500 text-center mb-6">Enter a new password</p>
           <form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
            <div>
                <label htmlFor="password" className='block text-sm font-medium text-grey-700'>New Password</label>
                <input type="text" id='password' className='mt-1 w-full px-4 py-2 border border-grey-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]' placeholder='Enter new password' required onChange={(e) =>setnewpassword(e.target.value)} value={newpassword} />
                </div>

                 <div>
                <label htmlFor="conpassword" className='block text-sm font-medium text-grey-700'>Confirm Password</label>
                <input type="text" id='conpassword' className='mt-1 w-full px-4 py-2 border border-grey-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]' placeholder='Conform Password' required onChange={(e) =>setconpassword(e.target.value)} value={conpassword}  />
                </div>
                <button className="w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md-font-medium cursor-pointer" disabled={loading} onClick={resetpassword}>{loading ? <ClipLoader size={30} color='white'/> :"Reset Password"}</button>
           </form>
           <div className="text-sm text-center mt-4" onClick={() =>navigate("/login")}>
            Back To Login
           </div>
         </div>}
    </div>
  )
}

export default forgetpass