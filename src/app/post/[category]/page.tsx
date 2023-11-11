"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { base64 } from "@/lib/base64";
import Cars from "@/components/postForm/Cars";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DropDown from "@/components/postForm/DropDown";
import Bikes from "@/components/postForm/Bikes";
import Properties from "@/components/postForm/Properties";
import { Roboto } from "next/font/google";
import { Label } from "@/components/ui/label";
const roboto = Roboto({ weight: "500", subsets: ["latin"] });

type images = {
  picture: string;
  selected: boolean;
};

const images = [
  { picture: base64, selected: false },
  { picture: base64, selected: false },
  { picture: base64, selected: false },
  { picture: base64, selected: false },
  { picture: base64, selected: false },
];

function page() {
  const params = useParams();
  const { toast } = useToast();
  const [imagesArray, setImagesArray] = useState(images);
  const [userImg, setUserImg] = useState(base64);
  const [userImg2, setUserImg2] = useState(base64);
  const [userImg3, setUserImg3] = useState(base64);
  const [userImg4, setUserImg4] = useState(base64);
  const [userImg5, setUserImg5] = useState(base64);
  // const [pictureLoading,setPictureLoading] = useState(false)
  let category = params.category;
  const decodedCategory = decodeURIComponent(category as string);

  const categoryTypeRender = () => {
    switch (decodedCategory) {
      case "Cars":
        return <Cars />;
      case "Bikes":
        return <Bikes />;
      case "Mobiles":
        return <DropDown label="Mobile" />;
      case "Properties":
        return <Properties />;
    }
  };
  const imageUpload = (setUserImg: any) => {
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
  };

  return (
    <>
      <header className="text-left px-8 py-4 bg-slate-100">
        <Link href={`/post`}>
          <ArrowLeft size={24} className="absolute mr-4" strokeWidth={2} />
        </Link>
        <h1 className={`text-[1.4rem] text-center font-semibold`}>
          Post Your AD
        </h1>
      </header>
      <main className="sm:w-3/5 mx-auto">
        <div className="py-4">
          <h2 className={`post-form-heading px-4 p-2 ${roboto.className}`}>
            SELECTED CATEGORY{" "}
          </h2>
          <div className="flex px-4 items-center customsm:justify-between gap-4">
            <span className="opacity-80 ">{decodedCategory}</span>
            <Link
              href={`/post`}
              className="text-[14px] opacity-1 font-semibold underline "
            >
              <span>Change</span>
            </Link>
          </div>
        </div>
        <hr />
        <div className="p-4 flex flex-col gap-4">
          <h2 className={`post-form-heading ${roboto.className}`}>
            INCLUDE SOME DETAILS{" "}
          </h2>
          {categoryTypeRender()}
          <Label htmlFor="Ad title">Ad Title*</Label>
          <Input
            className="h-[3rem] resize-none"
            name=""
            id="Ad title"
          />
          <Label htmlFor="Description">Description*</Label>
          <Textarea
            className="h-[3rem] resize-none "
            name=""
            id="Description"
          />
          <hr />
          <h2 className={`post-form-heading  ${roboto.className}`}>
            SET A PRICE
          </h2>
          <Label htmlFor="price">Price*</Label>
          <div className="border border-black flex">
            <span className="p-2">
            &#8377;
            </span>
            <Input type="number" min={0} id="price" className="border-none" />
          </div>
        </div>
        <hr />
        <h2 className={`post-form-heading p-4 ${roboto.className}`}>Upload upto 5 photos</h2>
        <div className="grid grid-cols-3 max-w-[90%] mx-auto place-items-center">
          <div className="" onClick={() => imageUpload(setUserImg)}>
            <Image
              src={userImg}
              width={100}
              height={100}
              alt="Picture"
            />
          </div>
          <div onClick={() => imageUpload(setUserImg2)}>
            <Image
              src={userImg2}
              width={100}
              height={100}
              alt="Picture"
            />
          </div>
          <div onClick={() => imageUpload(setUserImg3)}>
            <Image
              src={userImg3}
              width={100}
              height={100}
              alt="Picture"
            />
          </div>
          <div onClick={() => imageUpload(setUserImg4)}>
            <Image
              src={userImg4}
              width={100}
              height={100}
              alt="Picture"
            />
          </div>
          <div onClick={() => imageUpload(setUserImg5)}>
            <Image
              src={userImg5}
              width={100}
              height={100}
              alt="Picture"
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
      </main>
    </>
  );
}

export default page;
