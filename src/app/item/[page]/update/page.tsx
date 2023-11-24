"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { paramIdHandler } from "../page";
import { fetchSinglePost } from "@/lib/actions/post.actions";
import {
  commonPropertiesSchema,
  carSchema,
  propertySchema,
  bikeSchema,
} from "@/lib/actions/post.actions";

function Update() {
  const id = useParams();
  const [postObj, setPostObj] = useState<
    commonPropertiesSchema & carSchema & propertySchema & bikeSchema
  >();
  const paramId = paramIdHandler(id);
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetchSinglePost(paramId);
      setPostObj(response);
    };
    fetchPost();
  }, []);
  return <div></div>;
}

export default Update;
