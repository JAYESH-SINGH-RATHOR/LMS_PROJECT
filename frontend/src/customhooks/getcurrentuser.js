import React from 'react'
import { useEffect } from 'react'
import { serverulr } from '../App'
import axios from 'axios'
import {useDispatch} from "react-redux"
import { setuserdata } from '../redux/userslice'

// export const getcurrentuser = () => {
//     const dispatch = useDispatch()
//     useEffect(() =>{
//         const fetchuser = async () => {
//            try {
//             const result = await axios.get(serverulr + "/api/myuser/getcurrentuser" , {withCredentials:true})
//             dispatch(setuserdata(result.data))
//            } catch(error) {
//             console.log(error);
//             dispatch(setuserdata(null))

//            }          
//         }
//         fetchuser();
//     },[])  
// }

export const getcurrentuser = async (req, res) => {
    try {
        const myuser = await user.findById(req.userid).select("-password");

        if (!myuser) {
            return res.status(404).json({ message: `User not found with id ${req.userid}` });
        }

        return res.status(200).json(myuser);
    } catch (error) {
        return res.status(500).json({ message: `Get current user error: ${error.message}` });
    }
};

// export default {getcurrentuser};