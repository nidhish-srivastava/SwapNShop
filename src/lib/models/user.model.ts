import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username : {type : String,required : true},
    name : {type:String,required : true},
    dp : {type : String,required : true},
    bio : {type : String,required : true,default : ""}
},

{
    timestamps : true
})


const UserModel = mongoose.models.User || mongoose.model('User',UserSchema)

export default UserModel