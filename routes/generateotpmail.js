const nodemailer = require("nodemailer")
const { UserModel } = require("../models/user.model")


function generate() {
    return Math.floor(1000 + Math.random() * 9000)
}

const mail = async (req, res, next) => {
    try {

        const users = await UserModel.find({ email: req.body.email });
        res.send(users)
        if (users.length >= 1) {
            return res.status(401).send({ "msg": "User already present" });
        }

        const OTP = generate();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'manoharmeena245@gmail.com',
                pass: 'wwqvftbyxzotbchw'
            }
        });


        await transporter.sendMail({
            to: req.body.email,
            from: "manoharmeena245@gmail.com",
            subject: "One-Time_Password Verification !",
            text: `OTP Vefification ${OTP}`
        });

        // res.status(200).send(OTP);
        next();
    } catch (error) {
        res.send("OTP Not Generated!");
    }
};


module.exports = {
    mail
}
