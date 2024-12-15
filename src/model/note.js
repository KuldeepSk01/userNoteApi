const mongoose = require("mongoose");
const noteSchema = mongoose.Schema({
title : {
    type : String,
    require : true
},
description : {
    type : String,
    require : true
},
userId : {
    type : mongoose.Schema.Types.ObjectId,  //it is a way to call schema property then define which schema used this property.
    ref : "User",
    require : true
},

},{timestamps :  true });  // timestaps create two property in schema createdAt and modifiedAt

module.exports = mongoose.model("Note",noteSchema);