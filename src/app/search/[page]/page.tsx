"use client"

import { paramIdHandler } from "@/app/item/[page]/page"
import PostCard from "@/components/PostCard"
import PostsWrapper from "@/components/PostsWrapper"
import { commonPropertiesSchema, searchBasedOnLocation } from "@/lib/actions/post.actions"
import { useEffect, useState } from "react"

function Search({params} : {params : {page : string}}) {
  const [resultState,setResultState] = useState<commonPropertiesSchema[]>([])
    useEffect(()=>{
        const searchBasedOnLocationsHandler = async()=>{
            try {
                const response = await searchBasedOnLocation(params.page)
                setResultState(response)
            } catch (error) {
                
            }
        }
        searchBasedOnLocationsHandler()
    },[params.page])
  return (
    <>
    <PostsWrapper>
      {resultState.map(e=>(
        <PostCard postObj={e}/>
      ))}
    </PostsWrapper>
    </>
  )
}

export default Search