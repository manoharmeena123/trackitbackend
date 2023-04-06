const express = require("express")
const bcrypt = require("bcrypt")
const { UserModel } = require("../models/user.model")
const jwt = require("jsonwebtoken")
const userRouter = express.Router()
const cookieparser = require("cookie-parser")
userRouter.use(cookieparser())
const { mail } = require("./generateotpmail")

//Register===================================================================>



userRouter.post("/otp", mail, async (req, res) => {
    //   OTP will be send from this endpoint
});

userRouter.post("/register", async (req, res) => {
    const { email, password, otp } = req.body
    const user = await UserModel.find({ "email": email });

    if (user.length >= 1) {
        res.send("Already exist,Please login")
    } else {
        try {
            bcrypt.hash(password, 5, async (err, hash) => {
                const user = new UserModel({ email, password: hash, otp })
                await user.save()
                res.send({ "msg": "User Signup Successfully", "response": "ok" })
            })
        } catch (error) {
            res.send("Error in Signup")
        }
    }
});






//Login====================================================================>

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.findOne({ email })

        if (user) {
            const hashed_pass = user.password
            bcrypt.compare(password, hashed_pass, (err, result) => {
                if (result) {

                    const token = jwt.sign({ "userId": user._id }, 'masai', { expiresIn: "1h" })
                    const refreshtoken = jwt.sign({ "userId": user._id }, 'kasai', { expiresIn: "7d" })
                    res.cookie("token", token, { httpOnly: true, maxAge: 1000000 }).cookie("refreshtoken", refreshtoken, { httpOnly: true, maxAge: 1000000 })
                    res.send({ "msg": "Login Successfully", "token": token, "refreshtoken": refreshtoken })

                } else {
                    res.send({ "msg": "Login Failed" })
                }
            })
        } else {
            res.send({ "msg": "Result Not Correct" })
        }
    } catch (error) {

        console.log(error)
        res.send({ "msg": "Login failed Error in try" })
    }
})



module.exports = {
    userRouter
}

