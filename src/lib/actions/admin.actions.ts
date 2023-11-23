"use server"

import { PostModel } from "../models"

// export async function updatePost(id : string) {
//     const response = await PostModel.updateOne()
// }

export async function deletePost(id : string){
    await PostModel.findByIdAndDelete(id)
}

export async function myAds(author:string | null | undefined){
    const response = await PostModel.find({author : author})
    return JSON.parse(JSON.stringify(response))
}
