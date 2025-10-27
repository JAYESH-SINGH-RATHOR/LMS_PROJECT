import uploadOnCloudinary from '../config/cloudinary.js';
import user from '../modle/usermodel.js'    

export const getcurrentuser = () => {
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

export const updateProfile = async(req , res)=>{
    try {
        const userId = req.userid
        const {des , name} = req.body
        let photourl
        if(req.file){
            photourl = await uploadOnCloudinary(req.file.path)
        }
        const USER = await user.findByIdAndUpdate(userId , {name , des , photourl})
        if(!USER){
            return res.status(400).json({message:"user not found "})
        }
        return res.status(200).json(USER)
    } catch (error) {
        return res.status(500).json({message:"update profile error"} , error)
    }
}


