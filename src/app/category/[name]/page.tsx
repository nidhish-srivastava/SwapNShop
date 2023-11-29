"use client"
import PostCard from "@/components/PostCard"
import PostsWrapper from "@/components/PostsWrapper"
import { commonPropertiesSchema, fetchCategoryPosts } from "@/lib/actions/post.actions"
import { useEffect, useState } from "react"

 function Category({params} : {params : {name : string}}) {
  const [categoryPosts,setCategoryPosts] = useState<commonPropertiesSchema[]>([])
  const decodedCategory = params.name.split("-").join(" ")
  useEffect(()=>{
    const fetchCategoryItems = async() =>{
      try {
        const response = await fetchCategoryPosts(decodedCategory)
        setCategoryPosts(response)
      } catch (error) {
      }
    }
    fetchCategoryItems()
  },[])
  return (
    <>
    <PostsWrapper>
      {categoryPosts.map(e=>(
        <PostCard postObj={e}/>
      ))}
    </PostsWrapper>
    </>
  )
}

export default Category