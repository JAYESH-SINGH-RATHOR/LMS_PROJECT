import jwt from "jsonwebtoken"

const gentoken = (userid) => {
    try {
        const token =  jwt.sign({ userid }, process.env.JWT_SECERATE, { expiresIn: "7d" });
        return token;
    } catch (error) {
        console.log(error);
    }
};

export default gentoken