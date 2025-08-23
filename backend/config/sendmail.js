import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: true, // true for port 465, false for 587
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD, // Use App Password for Gmail
  },
});

const sendMail = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: to,
      subject: "Reset your password",
      html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`,
    });
    console.log(` Email sent to ${to}`);
  } catch (error) {
    console.error(" Error sending email:", error);
  }
};

export default sendMail;