"use server"

import { PostModel, UserModel } from "../models"

export async function updatePost(id : string) {
    // const response = await PostModel.updateOne({_id : id},)
}

export async function deletePost(id : string){
    await PostModel.findByIdAndDelete(id)
}

export async function myAds(username:string | null | undefined){
    try {
        const response = await PostModel.find({username})
        return JSON.parse(JSON.stringify(response))
    } catch (error) {
        
    }
}

export async function addToFavorites(userId : string,postId : string){
    try {
        const response = await UserModel.findOneAndUpdate({username : userId},{$addToSet : {favoritePosts : postId}},{new : true})
        return true
    } catch (error) {
        
    }
}

export async function checkIfAddedInFavorites(userId : string,postId : string){
    try {
        const user = await UserModel.findOne({username : userId})
        const check = user.favoritePosts.some((favpostId:string)=>favpostId==postId)
        return check
        } catch (error) {
        
    }
}

export async function fetchAllFavorites(userId : string){
  try {
    
  } catch (error) {
    
  }
}