"use client";
import CustomDropdown from "@/components/CustomDropDown";
import PostCard from "@/components/PostCard";
import PostsWrapper from "@/components/PostsWrapper";
import {
  commonPropertiesSchema,
  fetchCategoryPosts,
  sortPostsHighToLow,
  sortPostsLowToHigh,
} from "@/lib/actions/post.actions";
import { useEffect, useState } from "react";

function Category({ params }: { params: { name: string } }) {
  const [categoryPosts, setCategoryPosts] = useState<commonPropertiesSchema[]>(
    []
  );
  const [countPosts, setCountPosts] = useState<number | undefined>(0);
  const decodedCategory = params.name.split("-").join(" ");

  const priceHighToLowSortHandler = async () => {
    const response = await sortPostsHighToLow(decodedCategory);
    setCategoryPosts(response);
  };
  const priceLowToHighSortHandler = async () => {
    const response = await sortPostsLowToHigh(decodedCategory);
    setCategoryPosts(response);
  };
  const fetchCategoryItemsHandler = async () => {
    try {
      const response = await fetchCategoryPosts(decodedCategory);
      setCountPosts(response?.count);
      setCategoryPosts(response?.returnResponse);
    } catch (error) {}
  };
  useEffect(() => {
    fetchCategoryItemsHandler();
  }, []);
  const sortOptions = [
    { name: "Date Published", selected: false },
    { name: "Price(Low to High)", selected: false },
    { name: "Price(High to Low)", selected: false },
  ];
  return (
    <>
      Sort By
      <div className="w-[30%]">
        <CustomDropdown
          options={sortOptions}
          datePublished={fetchCategoryItemsHandler}
          lowToHigh={priceLowToHighSortHandler}
          highToLow={priceHighToLowSortHandler}
        />
      </div>
      <h3>{countPosts} Posts</h3>
      <PostsWrapper>
        {categoryPosts.map((e) => (
          <PostCard postObj={e} />
        ))}
      </PostsWrapper>
    </>
  );
}

export default Category;
