"use server";

import PostModel from "../models/post.model"
import { connectToDB } from "../mongoose"

export async function createPost(title : String){
    try {
        connectToDB()
        const newPost = new PostModel({title : title})
       return newPost.save()
    } catch (error) {
        
    }
}

export async function fetchAllPosts(pageNumber:number){
    try {
        connectToDB()
        const allPosts = await PostModel.find({})
        const page = pageNumber || 1
        const pageSize = 10
        const startIndex = (page-1)*pageSize
        const endIndex = startIndex + pageSize
        const itemsToSend = allPosts.slice(startIndex,endIndex)
        console.log(itemsToSend.length);
        const result =  {itemsToSend,totalPages : Math.ceil(allPosts.length/pageSize)}
        return JSON.parse(JSON.stringify(result))
    } catch (error) {
        
    }
}