
const express = require("express")
const nodemailer = require("nodemailer")
const cookieparser = require("cookie-parser")
const {redis} = require("../service/redis")
// const {UserModel} = require("../models/user.model")

function generate(){
    return Math.floor(1000 + Math.random() * 9000)
}
let OTP = generate()

  const mail = async (req, res, next) => {
    try {
        const OTP = generate();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'manoharmeena245@gmail.com',
                pass: 'wwqvftbyxzotbchw'
            }
        });
        
        const users = await UserModel.find({ email: req.body.email });
        if (users.length >= 1) {
            return res.status(401).send({ "msg": "User already present" });
        }
        
        await transporter.sendMail({
            to: req.body.email,
            from: "manoharmeena245@gmail.com",
            subject: "One-Time_Password Verification !",
            text: `OTP Vefification ${OTP}`
        });

        res.json(OTP);
        next();
    } catch (error) {
        res.send("OTP Not Generated!");
    }
};
        module.exports= {
            mail
        }
