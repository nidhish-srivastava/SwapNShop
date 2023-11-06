import mongoose from 'mongoose'

const blockSchema = new mongoose.Schema({
    id: String,
    type: String,
    data: mongoose.Schema.Types.Mixed // You can use Mixed type for unstructured data
  });

const PostSchema = new mongoose.Schema({
    title : {type : String,required : true},
    // images : {type : String},
    // author : {type : mongoose.Schema.Types.ObjectId,ref : "User"}
    author : {type : String,required : true},
    blocks : [blockSchema]
    // publised : {type : Boolean}
},
{
    timestamps : true
}
)

const PostModel = mongoose.models.Post || mongoose.model("Post",PostSchema)

export default PostModel