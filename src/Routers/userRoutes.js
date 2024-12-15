const express = require("express");
const dotenv = require("dotenv");
const mypath = require("path");

dotenv.config({path:mypath.resolve('/Users/skboss/Desktop/chatApp/backend/src/','.env')});

const { signUp, signIn } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/signup",signUp);
userRouter.post("/signin",signIn);

module.exports = userRouter;
