const express = require("express");   // this is importing package
const app = express();   // to create application object 
const dotenv = require("dotenv");
const cors = require("cors");
const mypath = require("path");

const quotes = require("./quotes.json");
const userRouter = require("./Routers/userRoutes");
const noteRouter = require("./Routers/noteRouter");
const { default: mongoose } = require("mongoose");

dotenv.config({path:mypath.resolve('/Users/skboss/Desktop/chatApp/backend/src/','.env')});

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


//   // it converts body(string) into json body 

// app.get("/",(req,res)=>{
//     res.send("Hello Send Api.."+quotes.limit);
// });

const port = process.env.PORT || 4000;
const url = process.env.MONGO_URL;

console.log("MONGO URL = "+url + "And port "+port)
mongoose.connect(url)
.then(()=>{
    app.listen(port,()=>{
        console.log("Hello Boss! connection is success! "+port);
    });

}).catch((error)=>{
    console.log(error);
});




// app.get("/random",(req,res)=>{
//     let index = Math.floor( Math.random() * quotes.limit);
//     let newQuote = quotes[index];
//     res.status(200).json(newQuote);
//    });
   

// app.get("/quotes",(req,res)=>{
//     //res.send("Quotes");
//     // to send quotes object as json
//     res.json(quotes);
//     console.log(quotes.length);


// });


