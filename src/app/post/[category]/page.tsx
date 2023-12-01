"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, {  useEffect, useState } from "react";
import Image from "next/image";
import Cars from "@/components/adForm/Cars";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DropDown from "@/components/adForm/DropDown";
import Bikes from "@/components/adForm/Bikes";
import Properties from "@/components/adForm/Properties";
import { Roboto } from "next/font/google";
import { Label } from "@/components/ui/label";
const roboto = Roboto({ weight: "500", subsets: ["latin"] });
import { states } from "../../../lib/statesdistricts.json";
import { Button } from "@/components/ui/button";
import {
  bikeCreatePost,
  bikeSchema,
  carCreatePost,
  carSchema,
  commonPropertiesSchema,
  createPost,
  mobileCreatePost,
  propertyCreatePost,
  propertySchema,
} from "@/lib/actions/post.actions";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";
import { filterUsername } from "@/lib/utils";
const uploadImage =
  "https://res.cloudinary.com/dvlz73wcr/image/upload/v1700581072/upload_zypu8w.jpg";

function page() {
  const params = useParams();
  const { data: session } = useSession();
  // const defaultImg = { img: uploadImage, uploaded: false };
  const [picLoading, setPicLoading] = useState(false);
  const [picLoading2, setPicLoading2] = useState(false);
  const [picLoading3, setPicLoading3] = useState(false);
  const [picLoading4, setPicLoading4] = useState(false);
  const [picLoading5, setPicLoading5] = useState(false);

  const [userImg, setUserImg] = useState(uploadImage);
  const [userImg2, setUserImg2] = useState(uploadImage);
  const [userImg3, setUserImg3] = useState(uploadImage);
  const [userImg4, setUserImg4] = useState(uploadImage);
  const [userImg5, setUserImg5] = useState(uploadImage);
  const [showDistrict, setShowDistrict] = useState(false);
  let category = params.category;
  const decodedCategory = decodeURIComponent(category as string);
  const [formData, setFormData] = useState<commonPropertiesSchema>({
    title: "",
    description: "",
    price: 0,
    state: "",
    district: "",
    author: session?.user?.name,
    username : filterUsername(session?.user?.email),
    images: [userImg,userImg2,userImg3,userImg4,userImg5],
    category : decodedCategory
  });
  const [carsFormData, setCarsFormData] = useState<carSchema>({
    year: 0,
    fuel: "",
    transmission: "",
    kmDriven: 0,
  });
  const [bikesFormData, setBikesFormData] = useState<bikeSchema>({
    brand: "",
    year: 0,
    kmDriven: 0,
  });
  const [mobileFormData, setMobileFormData] = useState<{ brand: string }>({
    brand: "",
  });
  const [propertiesFormData, setPropertiesFormData] = useState<propertySchema>({
    type: "",
    bedrooms: "" || 0,
    bathrooms: "" || 0,
    furnishing: "",
    constructionStatus: "",
    listedBy: "",
    superBuiltUpArea: 0,
    carpetArea: 0,
    maintenance: 0,
    totalFloors: 0,
    floorNo: 0,
    carParking: 0 || "",
    facing: "",
    projectName: "",
  });

  const categoryTypeRender = () => {
    switch (decodedCategory) {
      case "Cars":
        return (
          <Cars carsFormData={carsFormData} setCarsFormData={setCarsFormData} />
        );
      case "Bikes":
        return (
          <Bikes
            bikesFormData={bikesFormData}
            setBikesFormData={setBikesFormData}
          />
        );
      case "Mobiles":
        return (
          <DropDown
            label="Mobile"
            value={mobileFormData.brand}
            setMobileBrandValue={setMobileFormData}
          />
        );
      case "Properties":
        return (
          <Properties
            propertiesFormData={propertiesFormData}
            setPropertiesFormData={setPropertiesFormData}
          />
        );
    }
  };

  const imageUpload = (setUserImg: any,setPicLoading : any) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    
    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file == undefined) {
    
      }
      
      if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
        // const reader = new FileReader();
        // reader.onload = () => {
          //   setUserImg(reader.result as string);
          // };
          // reader.readAsDataURL(file);
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "chat-app");
          data.append("cloud_name", "dvlz73wcr");
          setPicLoading(true);
        fetch("https://api.cloudinary.com/v1_1/dvlz73wcr/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setUserImg(
              data.url,
          );
            // console.log(data);
            setPicLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setPicLoading(false);
          });
      } else {
      
        setPicLoading(false);
      }
    };
    // simulate a click
    fileInput.click();
  };

  const changeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const selectLocation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setShowDistrict(true);
  };


  const submitPostHandler = async () => {
    switch (decodedCategory) {
      case "Cars":
          try {
          await carCreatePost(carsFormData, formData);
        } catch (error) {
          throw error
        }
          break;
        case "Bikes":
          try {
            await bikeCreatePost(bikesFormData, formData);
            
          } catch (error) {
            
          }
          break;
        case "Mobiles":
          try {
            await mobileCreatePost(mobileFormData, formData);
            
          } catch (error) {
            
          }
          break;
        case "Properties":
          try {
            await propertyCreatePost(propertiesFormData, formData);
            
          } catch (error) {
            
          }
          break;
        case "Electronic and Appliances":
          try {
            await createPost(formData);
          } catch (error) {
            
          }
          break;
        case "Furniture":
          try {
            await createPost(formData);
            
          } catch (error) {
            
          }
          break;
        case "Pets":
          try {
            await createPost(formData);
            
          } catch (error) {
            
          }
          break;
        case "Books,Sports and Hobbies":
          try {
            await createPost(formData);
            
          } catch (error) {
            
          }
          break;
        case "Fashion":
          try {
            await createPost(formData);
          } catch (error) {
            
          }
          break;
      }
  };

  useEffect(()=>{
    setFormData((prev)=>({...prev,images : [userImg,userImg2,userImg3,userImg4,userImg5]}))
  },[userImg,userImg2,userImg3,userImg4,userImg5])

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
            {
              picLoading ? <Loading/>
             : <div className="" onClick={() => imageUpload(setUserImg,setPicLoading)}>
              {
               <Image
                  src={userImg}
                  width={100}
                  height={100}
                  alt="Picture"
                />
              }
            </div>
            }
            {
              picLoading2 ? <Loading/> : 
            <div onClick={() => imageUpload(setUserImg2,setPicLoading2)}>
              {
               <Image
                  src={userImg2}
                  width={100}
                  height={100}
                  alt="Picture"
                />
              }
            </div>
            }
            {
              picLoading3 ? <Loading/> : 
            <div onClick={() => imageUpload(setUserImg3,setPicLoading3)}>
              {
               <Image
                  src={userImg3}
                  width={100}
                  height={100}
                  alt="Picture"
                />
              }
            </div>
            }
            {
              picLoading4 ? <Loading/> : 
            <div onClick={() => imageUpload(setUserImg4,setPicLoading4)}>
              {
               <Image
                  src={userImg4}
                  width={100}
                  height={100}
                  alt="Picture"
                />
              }
            </div>
            }
            {
              picLoading5 ? <Loading/> : 
            <div onClick={() => imageUpload(setUserImg5,setPicLoading5)}>
              {
               <Image
                  src={userImg5}
                  width={100}
                  height={100}
                  alt="Picture"
                />
              }
            </div>
            }
          </div>
        </div>
        <hr />
        <div className="px-2 pb-6">
          <h2 className={`post-form-heading p-4 ${roboto.className}`}>
            CONFIRM LOCATION
          </h2>
          <div className="my-4 px-2">
            <Label className="block py-1 text-[.9rem]" htmlFor="state">
              State*
            </Label>
            <select
              name="state"
              className="select"
              onChange={selectLocation}
              value={formData.state}
              required={true}
            >
              {states.map((e, i) => (
                <option value={e.state}>{e.state}</option>
              ))}
            </select>
          </div>
          <div className="px-2">
            {showDistrict && (
              <>
                <Label className="block py-1  text-[.9rem]" id="city">
                  City*
                </Label>
                <select
                  className="select"
                  name="district"
                  value={formData.district}
                  onChange={selectLocation}
                  required={true}
                >
                  {states
                    .find((e) => e.state == formData.state)
                    ?.districts.map((districtName) => (
                      <option value={districtName}>{districtName}</option>
                    ))}
                </select>
              </>
            )}
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
