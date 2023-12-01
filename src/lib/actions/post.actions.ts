"use server";
import { connectToDB } from "../mongoose"
import { BikeModel, CarModel, MobileModel, PostModel, PropertyModel } from "../models"


export type commonPropertiesSchema = {
    description : string
    title : string
    price : number
    username : string | null | undefined
    images : string[]
    author : string | null | undefined
    state : string
    location ?: {district:string,state:string} 
    district : string
    category : string
    _id?:string
    createdAt ?: string
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


const updateImages = (images : string[]) => {
    const updatedImages = images.filter(e=>{
        return e.includes("upload_zypu8w") ? "" : e
    })
    return updatedImages
}

export async function carCreatePost({year,fuel,transmission,kmDriven}:carSchema,{description,price,title,images,state,district,author,category,username}:commonPropertiesSchema){
    try {
        connectToDB()
        const newCarPost = new CarModel({
            year:year,
            // fuel:fuel,transmission:transmission,
            kmDriven:kmDriven,
        title,description,price,location : {district : district,state:state},author,images : updateImages(images),category,username
        })
        return newCarPost.save()
    } catch (error) {
        
    }
}

export async function bikeCreatePost({brand,year,kmDriven}:bikeSchema,{title,description,price,state,district,author,images,category,username}:commonPropertiesSchema){
    try {
        connectToDB()
        const newBikePost = new BikeModel({
        title,description,price,location : {district : district,state:state},author,images: updateImages(images),category,username,
            brand,year,kmDriven
        })
        return newBikePost.save()
    } catch (error) {
        
    }
}


export async function mobileCreatePost({brand}:{brand : string},{title,description,price,author,state,district,images,category,username}:commonPropertiesSchema){
  try {
    connectToDB()
    const newMobilePost = new MobileModel({
        title,description,price,location : {district : district,state:state},author,images: updateImages(images),category,username,
        brand
    })
    return newMobilePost.save()
  } catch (error) {
    
  }
}

export async function propertyCreatePost({type,bedrooms,bathrooms,furnishing,constructionStatus,listedBy,superBuiltUpArea,carpetArea,maintenance,totalFloors,floorNo,carParking,facing,projectName}:propertySchema,{title,images,description,price,author,state,district,category,username}:commonPropertiesSchema){
    try {
        connectToDB()
        const newPropertyPost = new PropertyModel({
            title,description,price,location : {district : district,state:state},author,images: updateImages(images),category,username,
            type,bedrooms,bathrooms,furnishing,constructionStatus,listedBy,superBuiltUpArea,carpetArea,maintenance,totalFloors,floorNo,carParking,facing,projectName
        })
        return newPropertyPost.save()
    } catch (error) {
        
    }
}


export async function createPost({description,title,price,images,state,district,author,category,username} : commonPropertiesSchema){
    try {
        connectToDB()
        const newPost = new PostModel({
            title,description,price,location : {district : district,state:state},author,images: updateImages(images),category,username
        })
        try {
            return newPost.save()
        } catch (error) {
            
        }
    } catch (error) {
        
    }
}

const plainObjConverter = (obj:any) =>{
    return JSON.parse(JSON.stringify(obj))
}

export async function fetchAllPosts(pageNumber:number){
    try {
        connectToDB()
        const allPosts = await PostModel.find().sort({createdAt : -1})
        const page = pageNumber || 1
        const pageSize = 20
        const startIndex = (page-1)*pageSize
        const endIndex = startIndex + pageSize
        const itemsToSend = allPosts.slice(startIndex,endIndex)
        // console.log(itemsToSend.length);
        const result =  {itemsToSend,totalPages : Math.ceil(allPosts.length/pageSize)}
        return plainObjConverter(result)
    } catch (error) {
        
    }
}

export async function fetchSinglePost(id:string){
    try {
        connectToDB()
        const response = await PostModel.findById(id)
        return plainObjConverter(response)
    } catch (error) {
        
    }
}

export async function fetchCategoryPosts(category:string){
    try {
        connectToDB()
        const response = await PostModel.find({category : category}).sort({createdAt : -1})
        const count = await PostModel.find({category : category}).count()
        const returnResponse = plainObjConverter(response)
        return {returnResponse,count}
    } catch (error) {
        
    }
}

export async function sortPostsHighToLow(category:string){
    try {
        connectToDB()
        const response = await PostModel.find({category : category}).sort({price : -1})
        return plainObjConverter(response)
    } catch (error) {
        
    }
}
export async function sortPostsLowToHigh(category:string){
    try {
        connectToDB()
        const response = await PostModel.find({category : category}).sort({price : 1})
        return plainObjConverter(response)
    } catch (error) {
        
    }
}

const cleanInput = (input: string) => {
    return new RegExp(
      input
        ?.trim()
        .replace(/\s{2,}/g, " ")
        .replace(/,(?!\s)/g, ", ")
        .toString()
        .toLowerCase(),
      "i"
    );
  };

export async function searchBasedOnLocation(location:string){
    try {
        connectToDB()
        const decodeLocation = location.split("-").join(" ")
        const filteredLocation = cleanInput(decodeLocation)
        // NOw we need to remove the spaces
        const response = await PostModel.find({
            $or : [
                {
                    'location.district' : filteredLocation,
                },
                {
                    'location.state' : filteredLocation
                }
            ]
            // 'location.state' : location
        }).sort({createdAt : -1})
        return plainObjConverter(response)
    } catch (error) {
        
    }
}