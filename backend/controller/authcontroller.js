import user from "../modle/usermodel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import gentoken from "../config/token.js";
import sendMail from "../config/sendmail.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        let existuser = await user.findOne({ email });
        if (existuser) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Enter a valid email" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Enter a strong password (min 8 chars)" });
        }

        let hashpassword = await bcrypt.hash(password, 10);
        const USER = await user.create({
            name,
            email,
            password: hashpassword,
            role,
        });

        let token = gentoken(USER._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(201).json(USER);
    } catch (error) {
        return res.status(500).json({ message: `Signup error: ${error}` });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let USER = await user.findOne({ email });
        if (!USER) {
            return res.status(404).json({ message: "User not found" });
        }
        let ismatch = await bcrypt.compare(password, USER.password);
        if (!ismatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        let token = gentoken(USER._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json(USER);
    } catch (error) {
        return res.status(500).json({ message: `Login error: ${error}` });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout successfully" });
    } catch (error) {
        return res.status(500).json({ message: `Logout error: ${error}` });
    }
};

export const sendotp = async (req, res) => {
    try {
        const { email } = req.body;
        const User = await user.findOne({ email });
        if (!User) {
            return res.status(404).json({ message: "User not found" });
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP
        User.resetotp = otp;
        User.otpExpires = Date.now() + 5 * 60 * 1000;
        User.isotpverifed = false;

        await User.save();
        await sendMail(email, otp);

        return res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        return res.status(500).json({ message: `Send OTP error: ${error}` });
    }
};

export const verifyotp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const User = await user.findOne({ email });
        if (!User || User.resetotp !== otp || User.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        User.isotpverifed = true;
        User.resetotp = undefined;
        User.otpExpires = undefined;

        await User.save();
        return res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        return res.status(500).json({ message: `Verify OTP error: ${error}` });
    }
};

export const resetpassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const User = await user.findOne({ email });

        if (!User || !User.isotpverifed) {
            return res.status(400).json({ message: "OTP verification required" });
        }

        const hashpassword = await bcrypt.hash(password, 10);
        User.password = hashpassword;
        User.isotpverifed = false;

        await User.save();
        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        return res.status(500).json({ message: `Reset password error: ${error}` });
    }
};


export const googleauth = async (req ,res) =>{
    try {
        const {name ,email , role} = req.body
        let User = await user.findOne({email})
        if(!User){
            User = await user.create({
                name,
                email,
                role
            })
        }
          let token = gentoken(User._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json(User)

    } catch (error) {
        return res.status(500).json({message:`Google auth error ${error}`})
    }
}