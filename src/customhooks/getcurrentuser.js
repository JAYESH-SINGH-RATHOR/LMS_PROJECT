
import React from 'react'
import { useEffect } from 'react'
import { serverulr } from '../App'
import axios from 'axios'
import {useDispatch} from "react-redux"
import { setuserdata } from '../../frontend/src/redux/userslice'

const getcurrentuser = () => {
    const dispatch = useDispatch()
    useEffect(() =>{
        const fetchuser = async () => {
           try {
            const result = await axios.get(serverulr + "/api/myuser/getcurrentuser" , {withCredentials:true})
            dispatch(setuserdata(result.data))
           } catch(error) {
            console.log(error);
            dispatch(setuserdata(null))

           }          
        }
        fetchuser();
    },[])  
}

export default getcurrentuser