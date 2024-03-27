import { CalculateTimeAgo } from "@/common/CalculateTimeAgo";
import Markdown from "markdown-to-jsx";
import Link from "next/link";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const Card = ({ post, index }) => {
  return (
    <div
      key={post?.postID}
      className={`w-full flex flex-col gap-8 items-center rounded 
     md:flex-row
        `}
      //  ${index / 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}
    >
      <Link href={`/blog/${post?.postID}`} className="w-full h-auto md:h-64 md:w-2/4 ">
        <img
          src={post?.image}
          alt={post?.title}
          className="object-cover w-full h-full rounded"
        />
      </Link>

      <div className="w-full md:w-2/4 flex flex-col gap-3">
        <div className="flex gap-2">
          <span className="text-sm text-gray-600">
            {CalculateTimeAgo(post?.createdAt)}
          </span>
          <span className={`text-sm text-${post?.color}-600 font-semibold`}>
            {post?.categoryName}
          </span>
        </div>

        <h6 className="text-xl 2xl:text-3xl font-semibold ">{post?.title}</h6>

        <div className="flex-1 overflow-hidden text-gray-600  text-sm text-justify">
          <Markdown options={{ wrapper: "article" }}>
            {post?.content?.slice(0, 250) + "..."}
          </Markdown>
        </div>

        <Link
          href={`/`}
          className="flex items-center gap-2 "
        >
          <span className="underline">Read More</span> <AiOutlineArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default Card;
