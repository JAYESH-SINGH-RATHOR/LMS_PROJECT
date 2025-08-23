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


