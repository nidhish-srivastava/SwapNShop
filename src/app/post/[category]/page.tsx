"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image";
import { base64 } from "@/lib/base64";
import Cars from "@/components/postForm/Cars";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import Brand from "@/components/postForm/Brand";
import Bikes from "@/components/postForm/Bikes";
import Properties from "@/components/postForm/Properties";

type images = {
  picture : string
  selected : boolean
}

const images = [
  {picture : base64,selected : false},
  {picture : base64,selected : false},
  {picture : base64,selected : false},
  {picture : base64,selected : false},
  {picture : base64,selected : false}
]

function page() {
  const params = useParams();
  const { toast } = useToast()
  const [imagesArray,setImagesArray] = useState(images)
  const [userImg,setUserImg] = useState(base64)
  const [userImg2,setUserImg2] = useState(base64)
  const [userImg3,setUserImg3] = useState(base64)
  const [userImg4,setUserImg4] = useState(base64)
  const [userImg5,setUserImg5] = useState(base64)
  // const [pictureLoading,setPictureLoading] = useState(false)
  let category = params.category
  const decodedCategory = decodeURIComponent(category as string);

  const categoryTypeRender = () =>{
    switch(decodedCategory){
      case "Cars" : 
      return(
        <Cars/>
      )
      case "Bikes" : 
      return(
        <Bikes/>
      )
      case "Mobiles" : 
      return(
      <Brand/>
      )
      case "Properties" : 
      return(
        <Properties/>
      )
    }
  }
  const imageUpload = (setUserImg:any) =>{
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setUserImg(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    // simulate a click
    fileInput.click();
  }
  
  
  return (
    <div>
      <h2>Post Your AD</h2>
      <h3>Selected Category : {decodedCategory}</h3>
      <Link href={`/post`}>
        <span>Change</span>
      </Link>
      <br />
      {
        categoryTypeRender()
      }
      <hr />
      <label htmlFor="Ad title">Ad Title*</label>
      <Textarea className="h-[3rem] resize-none w-[20%]"  name="" id="Ad title"/>
      <label htmlFor="Description">description*</label>
      <Textarea className="h-[3rem] resize-none w-[20%]" name="" id="Description"/>
      <hr />
      <label htmlFor="price">price*</label>
      <div>
      &#8377;
      <Input type="number" min={0} id="price" className="border" />
      </div>
      <hr />
      <label htmlFor="photos">Upload upto 5 photos</label>
      <div className=" grid grid-cols-3">
        <div onClick={()=>imageUpload(setUserImg)}>
        <Image
        src={userImg}
        width={100}
        height={100}
        alt="Picture of the author"
        />
        </div>
        <div onClick={()=>imageUpload(setUserImg2)}>
        <Image
        src={userImg2}
        width={100}
        height={100}
        alt="Picture of the author"
        />
         </div>
        <div onClick={()=>imageUpload(setUserImg3)}>
        <Image
        src={userImg3}
        width={100}
        height={100}
        alt="Picture of the author"
        />
        </div>
        <div onClick={()=>imageUpload(setUserImg4)}>
        <Image
        src={userImg4}
        width={100}
        height={100}
        alt="Picture of the author"
        />
        </div>
        <div onClick={()=>imageUpload(setUserImg5)}>
        <Image
        src={userImg5}
        width={100}
        height={100}
        alt="Picture of the author"
        />
        </div> 
      {/* {imagesArray.map((imgObj,index)=>(
        <div key={Math.random().toString()} onClick={()=>imageUpload(index)}>
        <Image
        src={imgObj.picture}
        width={100}
        height={100}
        alt="Picture of the author"
        />
        </div>
      ))} */}
    </div>
      </div>
  );
}

export default page;
