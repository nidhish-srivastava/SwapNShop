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

export const paramIdHandler = (id: Params) => id?.page.toString().split("-")[1];

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
      <h3>{postObj?.author}</h3>
      <span>
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
