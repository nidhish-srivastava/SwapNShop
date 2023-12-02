"use client"
import { useEffect,useState } from "react"
import { commonPropertiesSchema, fetchAllPosts } from "@/lib/actions/post.actions";
import PostCard from "@/components/PostCard";
import PostsWrapper from "@/components/PostsWrapper";
import CategoryHomePage from "@/components/CategoryHomePage";
import { useParams, usePathname } from "next/navigation";

  function Page() {
    const [posts, setPosts] = useState<commonPropertiesSchema[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

  
    useEffect(() => {
      const fetchItems = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/home/${pageNumber}`)
          const data = await response.json()
          setPosts((e)=>[...e,...data?.itemsToSend]);
          setTotalPages(data.totalPages);
        } catch (error) {
          
        }
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
  

    return (
    <>
  <CategoryHomePage/>
        <PostsWrapper>
        {posts.map((item,index) =>{
          return(
            <PostCard postObj={item} />
            ) 
        })}
        </PostsWrapper>
    </>
  );
  
}

export default Page