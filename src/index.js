const express = require("express");   // this is importing package
const app = express();   // to create application object 
const path = require('path');
const dotenv = require("dotenv")
dotenv.config({path:path.resolve('/Users/skboss/Desktop/chatApp/backend/src/','security.env')});
const cors = require("cors");

const quotes = require("./quotes.json");
const userRouter = require("./Routers/userRoutes");
const noteRouter = require("./Routers/noteRouter");
const { default: mongoose } = require("mongoose");


app.use(express.json()); 
app.use(cors());

app.get("/",(req,res)=>{
console.log("Note api is running...on the llive server");
res.send("Note api is running...on the llive server");
})


//how to define middleware 
app.use((req,res,next)=>{
    console.log("HTTP Methods =: "+req.method +" URL =: "+req.url);
    next()
});


app.use("/users",userRouter);
app.use("/notes",noteRouter);

const port = process.env.PORT || 6000;
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(port,()=>{
        console.log("Hello Boss! connection is success! "+port);
    });

}).catch((error)=>{
    console.log(error);
});





