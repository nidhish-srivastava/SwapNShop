"use client"
import PostsWrapper from "@/components/PostsWrapper"
import { Button } from "@/components/ui/button"
import { fetchAllFavorites } from "@/lib/actions/admin.actions"
import { commonPropertiesSchema } from "@/lib/actions/post.actions"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react";
import { filterUsername } from "@/lib/utils"
import PostCard from "@/components/PostCard"


function Favorites() {
  const [favPosts,setFavPosts] = useState<commonPropertiesSchema[]>([])
  const { data: session } = useSession();
  useEffect(()=>{
    const fetchAllFavoritesHandler = async()=>{
      const response = await fetchAllFavorites(filterUsername(session?.user?.email))
      setFavPosts(response)
    }
    fetchAllFavoritesHandler()
  },[])
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
        {favPosts.map(e=>(
          <PostCard postObj={e}/>
        ))}
      </PostsWrapper>
      
    </div>
  )
}

export default Favorites