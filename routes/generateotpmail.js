
const express = require("express")
const nodemailer = require("nodemailer")
const cookieparser = require("cookie-parser")
const {redis} = require("../service/redis")
// const {UserModel} = require("../models/user.model")

function generate(){
    return Math.floor(1000 + Math.random() * 9000)
}
let OTP = generate()

  const mail =((req,res,next)=>{

 
            const transporter = nodemailer.createTransport({
                // host: 'smtp.ethereal.email',
                // port: 587,
                service:"gmail",
                auth: {
                    user: 'manoharmeena245@gmail.com',
                  pass: 'wwqvftbyxzotbchw'
                }
            })
             
            transporter.sendMail({
                to:req.body.email,
                from:"manoharmeena245@gmail.com",
                subject:"One-Time_Password Verification !",
                text: `OTP Vefification ${OTP}`
            }).then(()=>{
                console.log("mail sent successfully")
                res.json(OTP)
                // res.cookie("OTP",OTP)
             
            //    redis.set("otp", OTP, "ex", 900000);
                console.log(OTP)
                next()
            }).catch((err)=>{
                console.log("Error sending mail")
                res.send("OTP Not Generated!")
                console.log(err)
            })
        })

        module.exports= {
            mail
        }