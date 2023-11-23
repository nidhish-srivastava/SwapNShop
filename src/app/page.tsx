"use client"
import { useEffect,useState } from "react"
import { commonPropertiesSchema, fetchAllPosts } from "@/lib/actions/post.actions";
import Link from "next/link";
import Image from "next/image";
import PostCard from "@/components/PostCard";

  
  function Page() {
    const [posts, setPosts] = useState<commonPropertiesSchema[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
  
    useEffect(() => {
      const fetchItems = async () => {
        const result = await fetchAllPosts(pageNumber);
        // console.log(result);
        setPosts((e)=>[...e,...result?.itemsToSend]);
        setTotalPages(result.totalPages);
      };
  
      fetchItems();
    }, [pageNumber]);
    
    const onLoadMore = async () => {
      if (pageNumber < totalPages) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    }
    
    const scrollEVentCallback = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
  
      if (scrollPosition >= documentHeight - 10) {
        onLoadMore();
      }
    }

    useEffect(() => {
      window.addEventListener("scroll",scrollEVentCallback);
  
      return () => {
        window.removeEventListener("scroll",scrollEVentCallback);
      };
    }, [onLoadMore]);
  
  
  // useEffect(() => {
    //   if (typeof window !== 'undefined' && window.navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         // Handle successful position retrieval
  //         const { latitude, longitude } = position.coords;
  //         console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  //       },
  //       (error) => {
  //         // Handle error
  //         console.error(`Error getting location: ${error.message}`);
  //       }
  //     );
  //   }
  // }, []); 

    return (
    <>
      <main className="flex mt-2 flex-col md:grid gap-2 md:grid-cols-3 w-[90%] mx-auto">
        {posts.map((item,index) => (
          <Link href={`/item/${item?.title}-${item?._id}`} key={index}>
            <PostCard postObj={item} />
          </Link>
        ))}
      </main>
    </>
  );
  
}

export default Page