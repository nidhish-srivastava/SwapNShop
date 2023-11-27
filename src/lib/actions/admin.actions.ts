"use server"

import { PostModel, UserModel } from "../models"

export async function updatePost(id : string) {
    // const response = await PostModel.updateOne({_id : id},)
}

export async function deletePost(id : string){
    try {
        await PostModel.findByIdAndDelete(id)
        
    } catch (error) {
        
    }
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

export async function checkIfAddedInFavorites(userId : string | null | undefined,postId : string){
    try {
        const user = await UserModel.findOne({username : userId})
        const check = user.favoritePosts
        .some((favpostId:string)=>favpostId==postId)
        return check
        } catch (error) {
        
    }
}

export async function fetchAllFavorites(username : string | undefined){
  try {
    const response = await UserModel.findOne({username : username})
    const favPostsIdsArray = response.favoritePosts
    const fetchPosts = await PostModel.find({_id : {$in : favPostsIdsArray}})
    return JSON.parse(JSON.stringify(fetchPosts))
  } catch (error) {
    
  }
}

export async function removeFromFav(username:string | undefined,postId : string) {
    try {
    const response = await UserModel.updateOne({username : username},{$pull : {favoritePosts : postId}})
    if(response.modifiedCount > 0){
        return true
    }
    } catch (error) {
        
    }
}