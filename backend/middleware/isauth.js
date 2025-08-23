import jwt from "jsonwebtoken";

const isauth = async(req,res,next) =>{
    try {
        let {token} = req.cookies
    if(!token){
        return res.status(400).json({message:`user have no token ${token}`})
    }
    let verifytoken = await jwt.verify(token , process.env.JWT_SECERATE);
    if(!verifytoken){
        return res.status(400).json({message:`user have not valid token ${token}`})
    }
    req.userid = verifytoken.userid
    next()
    } catch (error) {
                return res.status(500).json({message:`isauth error ${error}`})        

    }
}


export default isauth