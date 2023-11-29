"use client"
import PostCard from "@/components/PostCard"
import PostsWrapper from "@/components/PostsWrapper"
import { commonPropertiesSchema, fetchCategoryPosts, sortPostsHighToLow, sortPostsLowToHigh } from "@/lib/actions/post.actions"
import { useEffect, useState } from "react"

 function Category({params} : {params : {name : string}}) {
  const [categoryPosts,setCategoryPosts] = useState<commonPropertiesSchema[]>([])
  const [countPosts,setCountPosts] = useState<number | undefined>(0)
  const decodedCategory = params.name.split("-").join(" ")
  const [show,setShow] = useState(false)

  const priceHighToLowSortHandler = async()=>{
    const response = await sortPostsHighToLow(decodedCategory)
    setCategoryPosts(response)
  }
  const priceLowToHighSortHandler = async()=>{
    const response = await sortPostsLowToHigh(decodedCategory)
    setCategoryPosts(response)
  }
  useEffect(()=>{
    const fetchCategoryItems = async() =>{
      try {
        const response = await fetchCategoryPosts(decodedCategory)
        setCountPosts(response?.count)
        setCategoryPosts(response?.returnResponse)
      } catch (error) {
      }
    }
    fetchCategoryItems()
  },[])
  return (
    <>
    Sort By 
    <div className="flex flex-col cursor-pointer">
      <span>Date Published</span>
      <span onClick={priceLowToHighSortHandler}>Price(low to high)</span>
      <span onClick={priceHighToLowSortHandler}>Price(high to low)</span>
      <span>Relevance</span>
      <span>Distance</span>
    </div>
    <h3>
    {countPosts} Posts
    </h3>
    <PostsWrapper>
      {categoryPosts.map(e=>(
        <PostCard postObj={e}/>
      ))}
    </PostsWrapper>
    </>
  )
}

export default Category