import {  commonPropertiesSchema} from "@/lib/actions/post.actions"
import Image from "next/image"

type Props = {
    postObj: commonPropertiesSchema
  };

function PostCard({postObj} : Props) {
  return (
    <div className="customsm:items-center flex flex-col border">
    <h2 className="text-[1.4rem]">{postObj?.title}</h2>
        <div>
          <Image src={postObj.images[0]} alt="" width={200} height={200} />
        </div>
    <h3>
      {postObj?.author}
    </h3>
    <h3>
      &#8377; 
     {postObj?.price}
    </h3>
    <h3>
    {postObj?.location?.district} , {postObj?.location?.state}
    </h3>
    <h3>
      {postObj.category}
    </h3>
    </div>
  )
}

export default PostCard