// import { PostModel } from "@/lib/models";
// import { NextRequest, NextResponse } from "next/server";
// import { connectToDB } from "@/lib/mongoose";

// export async function GET(request : NextRequest){
//     try {
//         connectToDB()
//         const allPosts = await PostModel.find().sort({createdAt : -1})
//         const page = pageNumber || 1
//         const pageSize = 20
//         const startIndex = (page-1)*pageSize
//         const endIndex = startIndex + pageSize
//         const itemsToSend = allPosts.slice(startIndex,endIndex)
//         // console.log(itemsToSend.length);
//         const result =  {itemsToSend,totalPages : Math.ceil(allPosts.length/pageSize)}
//         return plainObjConverter(result)
//     } catch (error) {
        
//     }
// }