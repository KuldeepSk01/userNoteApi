const jwt = require("jsonwebtoken");
const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const SECRATE_KEY = process.env.SECRATE_KEY;



const signUp = async (req, res) => {
    //checking existing user
    //hashed password
    //user createtion
    //token generation
    const { userName, userPass, userEmail } = req.body;
    try {
        const existingUser = await userModel.findOne({ userEmail: userEmail })  // await is used to wait for execution completed. and function must be asyn
        if (existingUser) {
            return res.status(404).json({
                message: " User All ready exist!!"

            });
        }
        const hashedPass = await bcrypt.hash(userPass, 10);
        const result = await userModel.create({    // it creates user mode into db
            userName: userName,
            userPassword: hashedPass,
            userEmail: userEmail
        });

        const token = jwt.sign({
            email: result.userEmail, id: result._id
        }, SECRATE_KEY);

        res.status(201).json({ user: result, token: token });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Something went wrong.." });
    }
}



const signIn = async (req, res) => {
    const { userName, userPass, userEmail } = req.body;
    try{
        const existUser = await userModel.findOne({ userEmail: userEmail });
        if (existUser) {
            const matchPass = await bcrypt.compare(userPass,existUser.userPassword);
            if (!matchPass) {
                return res.status(400).json({
                    message: "Invalid Credential!"
                }
                );
            }
    
            const token = jwt.sign({email: existUser.userEmail, id: existUser._id}, SECRATE_KEY);
            res.status(200).json({
                status: 200,
                message: "User Login succesfully.",
                data: existUser,
                token: token
            }
            );
        } else {
            console.log("User Not Fount");
            res.status(400).json({
                status: 404,
                message: "User Not Found!"
            }
            );
        }
    
    }catch(error){
        console.log(error);
        res.status(400).json({ 
            status:400,
            message: "Something went wrong.." });
    }

}


module.exports = { signIn, signUp };