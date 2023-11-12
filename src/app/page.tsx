"use client"
import { useEffect } from "react"
// import { fetchAllPosts } from "@/lib/actions/post.actions";

// export default function Home() {
//   const [posts, setPosts] = useState([]);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);

//   useEffect(() => {
//     const fetchItems = async () => {
//       const result = await fetchAllPosts(pageNumber);
//       // setPosts((e)=>[...e,...result?.itemsToSend]);
//       setTotalPages(result.totalPages);
//     };

//     fetchItems();
//   }, [pageNumber]);
  
//   const onLoadMore = async () => {
//     if (pageNumber < totalPages) {
//       setPageNumber((prevPageNumber) => prevPageNumber + 1);
//     }
//   }
  
//   const scrollEVentCallback = () => {
//     const scrollPosition = window.scrollY + window.innerHeight;
//     const documentHeight = document.documentElement.scrollHeight;

//     if (scrollPosition >= documentHeight - 10) {
//       onLoadMore();
//     }
//   }

//   useEffect(() => {
//     window.addEventListener("scroll",scrollEVentCallback);

//     return () => {
//       window.removeEventListener("scroll",scrollEVentCallback);
//     };
//   }, [onLoadMore]);


//   return (
//     <div>
//       {/* <ul>
//         {posts.map((item,index) => (
//           <p style={{marginBottom : "14rem"}} key={index}>{index+1} . {item.title}</p>
//         ))}
//       </ul> */}
//     </div>
//   );
// };


function Page() {

  useEffect(() => {
    if (typeof window !== 'undefined' && window.navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Handle successful position retrieval
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        (error) => {
          // Handle error
          console.error(`Error getting location: ${error.message}`);
        }
      );
    }
  }, []); 
  
  return (
    <div></div>
  )
}

export default Page