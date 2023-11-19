"use server";
import { connectToDB } from "../mongoose"
import { BikeModel, CarModel, MobileModel, PostModel, PropertyModel } from "../models"


export type commonPropertiesSchema = {
    description : string
    title : string
    price : number
    images : string[]
    author : string | null | undefined
    state : string
    district : string
}

export type carSchema = {
    year : number
    fuel : string
    transmission:string
    kmDriven : number
}

export type bikeSchema = {
    brand:string
    year:number
    kmDriven:number
}

export type propertySchema = {
    type : string
    bedrooms : string | number
    bathrooms : string | number
    furnishing : string
    constructionStatus : string
    listedBy : string
    superBuiltUpArea : number
    carpetArea : number
    maintenance : number
    totalFloors : number
    floorNo : number
    carParking : number | string
    facing : string
    projectName : string
}

export async function carCreatePost({year,fuel,transmission,kmDriven}:carSchema,{description,price,title,images,state,district,author}:commonPropertiesSchema){
    try {
        connectToDB()
        const newCarPost = new CarModel({
            year:year,fuel:fuel,transmission:transmission,kmDriven:kmDriven,
        title:title,description:description,price:price,location : {district : district,state:state},author:author
        })
        return newCarPost.save()
    } catch (error) {
        
    }
}

export async function bikeCreatePost({brand,year,kmDriven}:bikeSchema,{title,description,price,state,district,author}:commonPropertiesSchema){
    try {
        connectToDB()
        const newBikePost = new BikeModel({
        title:title,description:description,price:price,location : {district : district,state:state},author:author,
            brand:brand,year:year,kmDriven:kmDriven
        })
        return newBikePost.save()
    } catch (error) {
        
    }
}


export async function mobileCreatePost({brand}:{brand : string},{title,description,price,author,state,district}:commonPropertiesSchema){
  try {
    connectToDB()
    const newMobilePost = new MobileModel({
        title:title,description:description,price:price,location : {district : district,state:state},author:author,
        brand:brand
    })
    return newMobilePost.save()
  } catch (error) {
    
  }
}

export async function propertyCreatePost({type,bedrooms,bathrooms,furnishing,constructionStatus,listedBy,superBuiltUpArea,carpetArea,maintenance,totalFloors,floorNo,carParking,facing,projectName}:propertySchema,{title,description,price,author,state,district}:commonPropertiesSchema){
    try {
        connectToDB()
        const newPropertyPost = new PropertyModel({
            title:title,description:description,price:price,location : {district : district,state:state},author:author,
            type,bedrooms,bathrooms,furnishing,constructionStatus,listedBy,superBuiltUpArea,carpetArea,maintenance,totalFloors,floorNo,carParking,facing,projectName
        })
        return newPropertyPost.save()
    } catch (error) {
        
    }
}

export async function createPost({description,title,price,images,state,district,author} : commonPropertiesSchema){
    try {
        connectToDB()
        const newPost = new PostModel({
            title:title,description:description,price:price,location : {district : district,state:state},author:author,
        })
        return newPost.save()
    } catch (error) {
        
    }
}

// export async function fetchAllPosts(pageNumber:number){
//     try {
//         connectToDB()
//         const allPosts = await PostModel.find({})
//         const page = pageNumber || 1
//         const pageSize = 10
//         const startIndex = (page-1)*pageSize
//         const endIndex = startIndex + pageSize
//         const itemsToSend = allPosts.slice(startIndex,endIndex)
//         console.log(itemsToSend.length);
//         const result =  {itemsToSend,totalPages : Math.ceil(allPosts.length/pageSize)}
//         return JSON.parse(JSON.stringify(result))
//     } catch (error) {
        
//     }
// }