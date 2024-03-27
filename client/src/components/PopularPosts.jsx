"use client";
import { CATEGORIES } from "@/utils/dummyData";
import Link from "next/link";
import React, { useState } from "react";
import { API } from "@/common/api";
import useSWR from "swr";
import { ConvertTime } from "@/common/ConvertTime";

const PopularPosts = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading, mutate } = useSWR(
    `${API}/BlogPost/popularPost`,
    fetcher
  );
  console.log(data);

  const Card = ({ post }) => {
    // let catColor = "";
    // CATEGORIES.map((cat) => {
    //   if (cat.label === post?.cat) {
    //     catColor = cat?.color;
    //   }
    //   return null;
    // });

    return (
      <div className="flex gap-2 items-center">
        <img
          src={post?.image}
          alt="Image"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="w-full flex flex-col gap-1">
          <span
            className={`bg-${post?.color}-600  w-fit rounded-full px-2 py-0.5 text-white text-[12px] 2xl:text-sm`}
          >
            {console.log(post?.color)}
            {post?.categoryName}
          </span>
          <Link href={`/blog/${post?.postID}`} className="">
            {post?.title}
          </Link>
          <div className="flex gap-2 text-sm">
            <span className="font-medium">{post?.user?.name}</span>
            <span className="text-gray-500">
              {ConvertTime(post?.createdAt)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <p className="text-xl font-bold -mb-3 ">Popular Articles</p>
      {data?.map((post) => (
        <Card post={post} key={post?.postID} />
      ))}
    </div>
  );
};

export default PopularPosts;
