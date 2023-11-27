import {  commonPropertiesSchema} from "@/lib/actions/post.actions"
import Image from "next/image"
import Link from "next/link";
type Props = {
    postObj: commonPropertiesSchema
  };

function PostCard({postObj} : Props) {
  let modifiedTitle = postObj.title.split(" ").join("-")
  modifiedTitle = modifiedTitle.replace(/[0-9]+%\s?/g, '');
  return (
    <Link href={`/item/${modifiedTitle}-${postObj._id}`} key={postObj?._id}>
    <div className="customsm:items-center flex flex-col border">
      <h2 className="text-[1.4rem] font-bold">
      &#8377;
     {postObj?.price}
        </h2> 
        <div>
          <Image src={postObj.images[0]} alt="" width={200} height={200} />
        </div>
    <h3 className="text-[1.2rem]">{postObj?.title}</h3>
    <h3>
    {postObj?.location?.district} , {postObj?.location?.state}
    </h3>
    </div>
    </Link>
  )
}

export default PostCard