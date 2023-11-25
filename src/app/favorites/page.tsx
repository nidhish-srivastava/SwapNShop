import PostsWrapper from "@/components/PostsWrapper"
import { Button } from "@/components/ui/button"
import Link from "next/link"
function Favorites() {
  return (
    <div>
      <div className="ml-4 md:ml-12 md:mt-4 mt-2 flex gap-2 ">
        <Link href={`/my-ads`}>
          <Button>My Ads</Button>
        </Link>
        <Link href={`/favorites`}>
        <Button>Favorites</Button>
        </Link>
      </div>
      <PostsWrapper>
        
      </PostsWrapper>
      
    </div>
  )
}

export default Favorites