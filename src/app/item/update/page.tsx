"use client";
import React, { useState, useEffect } from "react";
import { paramIdHandler } from "../[page]/page";
import { fetchSinglePost } from "@/lib/actions/post.actions";
import {
  commonPropertiesSchema,
  carSchema,
  propertySchema,
  bikeSchema,
} from "@/lib/actions/post.actions";

function Update({params} : {params : {page : string}}) {
  const [postObj, setPostObj] = useState<
  commonPropertiesSchema & carSchema & propertySchema & bikeSchema
  >();
  const paramId = paramIdHandler(params);
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetchSinglePost(paramId);
      setPostObj(response);
    };
    fetchPost()
  }, [])
  return<div>
    
  </div>
}

export default Update;
