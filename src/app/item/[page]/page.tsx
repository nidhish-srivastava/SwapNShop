"use client";
import { Button } from "@/components/ui/button";
import {
  addToFavorites,
  checkIfAddedInFavorites,
  deletePost,
  removeFromFav,
  updatePost,
} from "@/lib/actions/admin.actions";
import {
  bikeSchema,
  carSchema,
  commonPropertiesSchema,
  fetchSinglePost,
  propertySchema,
} from "@/lib/actions/post.actions";
import toast, { Toaster } from 'react-hot-toast';
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { filterUsername } from "@/lib/utils";

export const paramIdHandler = (id: Params) => {
  const arrStr = id?.page.toString().split("-")
  return arrStr[arrStr.length-1]
}

function Item({ params }: { params: { page: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  const paramId = paramIdHandler(params);
  const [isAdded, setIsAdded] = useState(false);
  const [postObj, setPostObj] = useState<
    commonPropertiesSchema & carSchema & propertySchema & bikeSchema
  >();

  const deleteHandler = async () => {
    await deletePost(paramId);
    router.push("/my-ads");
  };

  const addToFavoritesHandler = async (userId: string, postId: string) => {
    try {
      const response = await addToFavorites(userId, postId);
      if (response) {
        setIsAdded(true);
        toast.success("Added to Favorites")
      }
    } catch (error) {}
  };

  const removeFromFavHandler = async(postId : string | undefined)=>{
    try {
      const response : any = await removeFromFav(filterUsername(session?.user?.email),postId as string)
      if(response){
        setIsAdded(false)
        toast.success("Removed from Favorites")        
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetchSinglePost(paramId);
        setPostObj(response);
        try {
          if(response.username.length > 1){
            const check = await checkIfAddedInFavorites(
              filterUsername(session?.user?.email),
              response._id
              )
              if (check) {
                setIsAdded(true);
              }
            }
        } catch (error) {
          
        }
      } catch (error) {
        
      }
    };
    fetchPost();
  }, []);

    const renderExtraFields = (postObj : any)=>{
      const category = postObj?.category
      if(category=="Cars"){
        return(
          <>
          <h3>Year : {postObj.year}</h3>
          <h3>Fuel : {postObj.fuel}</h3>
          <h3>Transmission : {postObj.transmission}</h3>
          <h3>KmDriven : {postObj.kmDriven}</h3>
          </>
        )
      }
      if(category=="Bikes"){
        return(
          <>
          <h3>Brand : {postObj.brand}</h3>
          <h3>Year : {postObj.year}</h3>
          <h3>KmDriven : {postObj.kmDriven}</h3>
          </>
        )
      }
      if(category=="Mobiles"){
        return(
          <>
          <h3>Brand : {postObj.brand}</h3>
          </>
        )
      }
      if(category=="Properties"){
        return(
          <>
          <h3>Type : {postObj.type}</h3>
          <h3>Bedrooms : {postObj.bedrooms}</h3>
          <h3>Bathrooms : {postObj.bathrooms}</h3>
          <h3>Furnishing : {postObj.furnishing}</h3>
          <h3>ConstructionStatus : {postObj.constructionStatus}</h3>
          <h3>ListedBy : {postObj.listedBy}</h3>
          <h3>SuperBuiltUp Area : {postObj.superBuiltUpArea}</h3>
          <h3>Carpet Area : {postObj.carpetArea}</h3>
          <h3>Maintenance : {postObj.maintenance}</h3>
          <h3>Total Floors : {postObj.totalFloors}</h3>
          <h3>Floor No : {postObj.floorNo}</h3>
          <h3>Car Parking : {postObj.carParking}</h3>
          <h3>Facing : {postObj.facing}</h3>
          <h3>Project Name : {postObj.projectName}</h3>
          </>
        )
      }
    }

    const getFullDate = (inputDate : string)=>{
      const date = new Date(inputDate)
      const options:any = { day: 'numeric', month: 'short', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US',options)
      return formattedDate
    }

  return (
    <main>
      <Toaster/>
      <h1>{postObj?.title}</h1>
      <div>
        {postObj?.images.map((e) => (
          <div>
            <Image width={100} height={100} src={e} alt="" />
          </div>
        ))}
      </div>
      <p>{postObj?.description}</p>
      <h2>{postObj?.price}</h2>
      <h3>Posting Date : {getFullDate(postObj?.createdAt as string)}</h3>
      <h3>{postObj?.author}</h3>
      <div>
        <h3>Details</h3>
        <div>
      {renderExtraFields(postObj)}
        </div>
      </div>
      <span>
        Location : 
        {postObj?.location?.district},{postObj?.location?.state}
      </span>
      {/* Now i need to create for car,bike,property since they have their unique UI */}
      {session?.user?.name?.length ?? 0 > 1 ? (
        <>
          {filterUsername(session?.user?.email) != postObj?.username ? (
            <>
              {isAdded ? (
                <Button onClick={()=>removeFromFavHandler(postObj?._id)}>Remove from Favorites</Button>
              ) : (
                <Button
                  onClick={() =>
                    addToFavoritesHandler(
                      filterUsername(session?.user?.email) as string,
                      postObj?._id as string
                    )
                  }
                >
                  Add to Favorites
                </Button>
              )}
            </>
          ) : null}
        </>
      ) : null}
      {session?.user?.name?.length ?? 0 > 1 ? (
        // I need to add admin role feature otherwise anyone can delete it
        <>
          {postObj?.username == filterUsername(session?.user?.email) ? (
            <>
              <Link href={`${params.page}/update`}>
                <Button>Update</Button>
              </Link>
              <Button onClick={deleteHandler}>Delete</Button>
            </>
          ) : null}
        </>
      ) : null}
    </main>
  );
}

export default Item;

