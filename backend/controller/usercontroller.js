import uploadonCloudnary from '../config/cloudinary.js';
import user from '../modle/usermodel.js'    

export const getcurrentuser = async (req, res) => {
    try {
        const myuser = await user.findById(req.userid).select("-password");

        if (!myuser) {
            return res.status(404).json({ message: `User not found  ${user}` });
        }

        return res.status(200).json(myuser);
    } catch (error) {
        return res.status(500).json({ message: `Get current user error: ${error.message}` });
    }
};

export const updateProfile = async(req , res)=>{
    try {
        const userId = req.userid
        const {des , name} = req.body
        let photourl
        if(req.file){
            photourl = await uploadonCloudnary(req.file.path)
        }
        const USER = await user.findByIdAndUpdate(userId , {name , des , photourl})
        if(!USER){
            return res.status(400).json({message:"user not found "})
        }
        return res.status(200).json(USER)
    } catch (error) {
        return res.status(500).json({message:"update profile error"})
    }
}


