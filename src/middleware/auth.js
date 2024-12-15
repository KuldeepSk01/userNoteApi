
const SECRATE_KEY = process.env.SECRATE_KEY;

const jwt = require("jsonwebtoken");
const auth = (req,res,next)=>{
    try{
        let token = req.headers.authorization;
        if(token){
            token  = token.split(" ")[1];
            let user = jwt.verify(token,SECRATE_KEY);
            req.userId = user.id;
    
        }else{
            res.status(401).json({
                status  : 401,
                message : "Unauthorization !"
            });
        }

        next();

    }catch(error){
        console.log(error);
        res.status(401).json({
            status  : 401,
            message : "Unauthorization Error!"
        });
    }
   
}


module.exports = auth;