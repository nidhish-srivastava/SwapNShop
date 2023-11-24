"use server"

import { PostModel } from "../models"

export async function updatePost(id : string) {
    // const response = await PostModel.updateOne({_id : id},)
}

export async function deletePost(id : string){
    await PostModel.findByIdAndDelete(id)
}

export async function myAds(username:string | null | undefined){
    const response = await PostModel.find({username})
    return JSON.parse(JSON.stringify(response))
}

export async function addToFavorites(){

}

export async function fetchFavorites(){

}