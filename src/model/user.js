const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
userName : {
    type : String,
    require : true
},
userPassword : {
    type : String,
    require : true
},
userEmail : {
    type : String,
    require : true
}
},{timestamps :  true });  // timestaps create two property in schema createdAt and modifiedAt

module.exports = mongoose.model("User",userSchema);