"use client";
import PostsWrapper from "@/components/PostsWrapper";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { myAds } from "@/lib/actions/admin.actions";
import { commonPropertiesSchema } from "@/lib/actions/post.actions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { filterUsername } from "@/lib/utils";

function MyAds() {
  const { data: session } = useSession();
  const [myAdsState, setMyAdsState] = useState<commonPropertiesSchema[]>([]);
  useEffect(() => {
    const fetchMyAds = async () => {
      const response = await myAds(filterUsername(session?.user?.email));
      setMyAdsState(response);
    };
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
      <PostsWrapper>
        {myAdsState.map((item, index) => (
            <PostCard postObj={item} />
        ))}
      </PostsWrapper>
    </div>
  );
}

export default MyAds;
