"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";
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
import { states } from "../../../lib/statesdistricts.json";
import { Button } from "@/components/ui/button";
import {
  bikeCreatePost,
  carCreatePost,
  createPost,
  mobileCreatePost,
  propertyCreatePost,
} from "@/lib/actions/post.actions";
import uploadImage from "../../../upload.jpg";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const [stateIndex, setStateIndex] = useState(0);
  const [imagesArray, setImagesArray] = useState(images);
  const [userImg, setUserImg] = useState(uploadImage);
  const [userImg2, setUserImg2] = useState(uploadImage);
  const [userImg3, setUserImg3] = useState(uploadImage);
  const [userImg4, setUserImg4] = useState(uploadImage);
  const [userImg5, setUserImg5] = useState(uploadImage);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    author: session?.user?.name,
    images: [],
  });
  const [propertyFormData, setPropertyFormData] = useState({});
  const [carsFormData, setCarsFormData] = useState({
    year: 0,
    fuel: "",
    transmission: "",
    kmDriven: 0,
  });
  const [bikesFormData, setBikesFormData] = useState({
    brand: "",
    year: 0,
    kmDriven: 0,
  });
  const [mobileFormData, setMobileFormData] = useState({
    brand: "",
  });

  // const [pictureLoading,setPictureLoading] = useState(false)
  let category = params.category;
  const decodedCategory = decodeURIComponent(category as string);

  const categoryTypeRender = () => {
    switch (decodedCategory) {
      case "Cars":
        return (
          <Cars carsFormData={carsFormData} setCarsFormData={setCarsFormData} />
        )
      case "Bikes":
        return (
          <Bikes bikesFormData = {bikesFormData} setBikesFormData={setBikesFormData} />
        )
      case "Mobiles":
        return <DropDown label="Mobile" value={mobileFormData.brand} setMobileBrandValue={setMobileFormData}  />;
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

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitPostHandler = async () => {
    switch (decodedCategory) {
      case "Cars":
        await carCreatePost(carsFormData, formData);
        break;
      case "Bikes":
        await bikeCreatePost(bikesFormData, formData);
        break;
      case "Mobiles":
        await mobileCreatePost(mobileFormData, formData);
        break;
      case "Properties":
        // await propertyCreatePost({type:"aa"},
        // {description:"asda",price:11,title:"asda",images:[]}
        // )
        break;
      case "Electronic and Appliances":
        await createPost(formData);
        break;
      case "Furniture":
        await createPost(formData);
        break;
      case "Pets":
        await createPost(formData);
        break;
      case "Books,Sports and Hobbies":
        await createPost(formData);
        break;
      case "Fashion":
        await createPost(formData);
        break;
    }
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
      <main className="sm:w-3/5 mx-auto pb-8">
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
            name="title"
            onChange={changeHandler}
            value={formData.title}
            id="Ad title"
          />
          <Label htmlFor="Description">Description*</Label>
          <Textarea
            className="h-[3rem] resize-none "
            name="description"
            id="Description"
            onChange={changeHandler}
            value={formData.description}
          />
          <hr />
          <h2 className={`post-form-heading  ${roboto.className}`}>
            SET A PRICE
          </h2>
          <Label htmlFor="price">Price*</Label>
          <div className="border border-black flex">
            <span className="p-2">&#8377;</span>
            <Input
              type="number"
              name="price"
              onChange={changeHandler}
              value={formData.price}
              min={0}
              id="price"
              className="border-none"
            />
          </div>
        </div>
        <hr />
        <div>
          <h2 className={`post-form-heading p-4 ${roboto.className}`}>
            UPLOAD upto 5 photos
          </h2>
          <div className="grid grid-cols-3 max-w-[90%] mx-auto place-items-center">
            <div className="" onClick={() => imageUpload(setUserImg)}>
              <Image src={userImg} width={100} height={100} alt="Picture" />
            </div>
            <div onClick={() => imageUpload(setUserImg2)}>
              <Image src={userImg2} width={100} height={100} alt="Picture" />
            </div>
            <div onClick={() => imageUpload(setUserImg3)}>
              <Image src={userImg3} width={100} height={100} alt="Picture" />
            </div>
            <div onClick={() => imageUpload(setUserImg4)}>
              <Image src={userImg4} width={100} height={100} alt="Picture" />
            </div>
            <div onClick={() => imageUpload(setUserImg5)}>
              <Image src={userImg5} width={100} height={100} alt="Picture" />
            </div>
          </div>
        </div>
        <hr />
        <div className="px-2 pb-6">
          <h2 className={`post-form-heading p-4 ${roboto.className}`}>
            CONFIRM LOCATION
          </h2>
          <div className="my-4">
            <Label className="block py-1 px-4 text-[.9rem]" id="state">
              State*
            </Label>
            <select
              id="state"
              className="select"
              onChange={(e) => setStateIndex(+e.target.value)}
              value={stateIndex}
            >
              {states.map((e, i) => (
                <option value={i}>{e.state}</option>
              ))}
            </select>
          </div>
          <div>
            <Label className="block py-1 px-4 text-[.9rem]" id="city">
              City*
            </Label>
            <select className="select">
              {states[stateIndex]?.districts.map((e) => (
                <option>{e}</option>
              ))}
            </select>
          </div>
        </div>
        <Button
          onClick={submitPostHandler}
          className=" block mx-auto bg-blue-500 text-white text-xl"
        >
          Post
        </Button>
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
      </main>
    </>
  );
}

export default page;
