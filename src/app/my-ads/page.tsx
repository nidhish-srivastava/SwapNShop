"use client";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { myAds } from "@/lib/actions/admin.actions";
import { commonPropertiesSchema } from "@/lib/actions/post.actions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function MyAds() {
  const { data: session } = useSession();
  const [myAdsState, setMyAdsState] = useState<commonPropertiesSchema[]>([]);
  useEffect(() => {
    const fetchMyAds = async () => {
      const response = await myAds(session?.user?.email?.split("@")[0]);
      setMyAdsState(response);
    }
    fetchMyAds();
  }, []);
  return (
    <div>
      <div className="ml-4 md:ml-12 md:mt-4 mt-2 flex gap-2 ">
        <Link href={`/my-ads`}>
          <Button>My Ads</Button>
        </Link>
        <Link href={`/favorites`}>
        <Button>Favorites</Button>
        </Link>
      </div>
      <main className="flex mt-2 flex-col md:grid gap-2 md:grid-cols-3 w-[90%] mx-auto">
        {myAdsState.map((item, index) => (
          <Link href={`/item/${item?.title}-${item?._id}`} key={item._id}>
            <PostCard postObj={item} />
          </Link>
        ))}
      </main>
    </div>
  );
}

export default MyAds;
