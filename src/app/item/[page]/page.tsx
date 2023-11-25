"use client";
import { Button } from "@/components/ui/button";
import { deletePost, updatePost } from "@/lib/actions/admin.actions";
import {
  bikeSchema,
  carSchema,
  commonPropertiesSchema,
  fetchSinglePost,
  propertySchema,
} from "@/lib/actions/post.actions";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const paramIdHandler = (id:Params) => id?.page.toString().split("-")[1];

function Item({params} : {params : {page : string}}) {
  const id = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const paramId = paramIdHandler(id)
  const [postObj, setPostObj] = useState<
    commonPropertiesSchema & carSchema & propertySchema & bikeSchema
  >();

  const deleteHandler = async () => {
    await deletePost(paramId);
    router.push("/my-ads");
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetchSinglePost(paramId);
      setPostObj(response);
    };
    fetchPost();
  }, []);
  return (
    <main>
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
        // I need to add admin role feature otherwise anyone can delete it
        <>
        <Link href={`${params.page}/update`}>
          <Button>Update</Button>
        </Link>
          <Button onClick={deleteHandler}>Delete</Button>
        </>
      ) : null}
    </main>
  );
}

export default Item;
