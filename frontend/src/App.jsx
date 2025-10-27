import React from 'react'
import { Navigate, Route , Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';
import Profile from './pages/profile.jsx';
import Forget from './pages/forgetpass.jsx';
import { ToastContainer } from 'react-toastify';
import {getcurrentuser} from './customhooks/getcurrentuser.js'
import { useSelector } from 'react-redux';
 export const serverulr = "http://localhost:8000/";

function App() {
  getcurrentuser();
  const {userdata} = useSelector(state =>state.user)
  return (
    <>
    <ToastContainer />
      <Routes>
        <Route path='/' element ={<Home/>}/>
        <Route path='/signup' element ={!userdata ? <Signup/> : <Navigate to = {"/"}/>}/>
        <Route path='/login' element ={<Login/>}/>
        <Route path='/profile' element ={userdata ? <Profile/> : <Navigate to ={"/signup"}/>}/>
        {/* <Route path='/forget' element ={userdata ? <Forget/> : <Navigate to ={"/forget"}/>}/> */}
        <Route path='/forget' element={<Forget />} />
      </Routes>
    </>
  )
}

export default App