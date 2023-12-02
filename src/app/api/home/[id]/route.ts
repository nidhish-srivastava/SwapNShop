
import { NextRequest, NextResponse } from "next/server";
import { PostModel } from "@/lib/models";


type Props = {
    params: {
        id: string
    }
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
    try {
        const id:any = request.url.split("/")
        const pageNumber = id[id.length-1]
        console.log(pageNumber);
        const allPosts = await PostModel.find().sort({createdAt : -1})
        const page = pageNumber || 1
        const pageSize = 20
        const startIndex = (page-1)*pageSize
        const endIndex = startIndex + pageSize
        const itemsToSend = allPosts.slice(startIndex,endIndex)
        const result =  {itemsToSend,totalPages : Math.ceil(allPosts.length/pageSize)}
        return NextResponse.json(result)
    } catch (error) {
        
    }
}