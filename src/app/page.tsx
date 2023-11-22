"use client"
import { useEffect,useState } from "react"
import { commonPropertiesSchema, fetchAllPosts } from "@/lib/actions/post.actions";

  
  function Page() {
    const [posts, setPosts] = useState<commonPropertiesSchema[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
  
    useEffect(() => {
      const fetchItems = async () => {
        const result = await fetchAllPosts(pageNumber);
        console.log(result);
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
      <main className="grid grid-cols-3 w-[90%] mx-auto">
        {posts.map((item,index) => (
          <div className="p-12 flex flex-col">
          <h2 className="text-[1.4rem]" key={index}>{item?.title}</h2>
              <div>
                <img src={item.images[0]} alt="" />
              </div>
          <h3>
            {item?.author}
          </h3>
          <h3>
            &#8377; 
           {item?.price}
          </h3>
          <h3>
          {item?.location?.district} , {item?.location?.state}
          </h3>
          <h3>
            {item.category}
          </h3>
          </div>
        ))}
      </main>
    </>
  );
  
}

export default Page