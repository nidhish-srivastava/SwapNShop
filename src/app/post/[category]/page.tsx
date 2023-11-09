"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image";
import { base64 } from "@/lib/base64";

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
  // console.log(params.category);
  const categoryTypeRender = () =>{
    if(category=="Fashion"){
      return <h3>Fashion</h3>      
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
      <h3>Selected Category : {params.category}</h3>
      <Link href={`/post`}>
        <span>Change</span>
      </Link>
      {
        categoryTypeRender()
      }
      <hr />
      <label htmlFor="Ad title">Ad Title*</label>
      <textarea className="border"  name="" id="Ad title" cols={30} rows={10}/>
      <label htmlFor="Description">description*</label>
      <textarea className="border" name="" id="Description" cols={30} rows={10}/>
      <hr />
      <label htmlFor="price">price*</label>
      <div>
      &#8377;
      <input type="text" id="price" className="border" />
      </div>
      <hr />
      <label htmlFor="photos">Upload upto 5 photos</label>
      <button onClick={()=>console.log(imagesArray)
      }>Check</button>
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
