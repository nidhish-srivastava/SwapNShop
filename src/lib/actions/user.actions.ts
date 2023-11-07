"use server"

import { connectToDB } from "../mongoose"

import { UserModel } from "../models"

export async function userExists(username:string){
    try {
        connectToDB()
        const userCheck = await UserModel.findOne({username : username})
        return userCheck
    } catch (error) {
        
    }
}

export async function createUser({username,name,dp} : {username:string,name:string,dp:string}){
   try {
    connectToDB()
    const createUser = new UserModel({username:username,name:name,dp:dp})
    return createUser.save()
   } catch (error) {
    return
   }
}
