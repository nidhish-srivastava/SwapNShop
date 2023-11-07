// import { NextResponse } from "next/server";
import {PostModel} from "@/lib/models/index";

export async function GET(req:Request){
  // console.log(req);
    // const {href} = new URL(req.url)
    // const pageNumber = searchParams.get("pageNumber")
    // console.log(href);

    // const allPosts = await PostModel.find({})
    // const page:number = pageNumber || 1
    // const pageSize = 10
    // const startIndex = (page-1)*pageSize
    // const endIndex = startIndex + pageSize
    // const itemsToSend = allPosts.slice(startIndex,endIndex)
    // console.log(itemsToSend.length);
    // const result =  {itemsToSend,totalPages : Math.ceil(allPosts.length/pageSize)}
    // return JSON.parse(JSON.stringify(result))
}


export async function POST(req:Request){
  try {
    // const {title,blocks,author} = await req.json()
    // const post = await PostModel.create({
    //   title : title,
    //   blocks : blocks.blocks,
    //   author : author
    // })
    // return new Response(JSON.stringify(post))
  } catch (error) {
    
  }
}