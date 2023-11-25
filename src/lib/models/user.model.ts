import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username : {type : String,required : true,unique:true},
    name : {type:String,required : true},
    dp : {type : String,required : true},
    favoritePosts : [{type : mongoose.Schema.Types.ObjectId,ref : 'Post'}]
},

{
    timestamps : true
})


const UserModel = mongoose.models.User || mongoose.model('User',UserSchema)

export default UserModel