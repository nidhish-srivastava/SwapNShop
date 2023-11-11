import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    description : {type:String,required:true},
    title : {type:String,required:true},
    price : {type : Number,required : true},
    images : [{type : String}]
},
{
    timestamps : true
}
)

const PostModel = mongoose.models.Post || mongoose.model("Post",PostSchema)

export default PostModel