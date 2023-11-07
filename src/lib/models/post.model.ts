import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
},
{
    timestamps : true
}
)

const PostModel = mongoose.models.Post || mongoose.model("Post",PostSchema)

export default PostModel