"use client";
import Image from "next/image";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RecommendPost from "@/components/recommend/Recommend";
import dayjs from "dayjs";
import Link from "next/link";
import DrawerComp from "@/components/Drawer/DrawerComp";
import useSWR from "swr";
import PopupMenu from "@/components/PopupMenu/PopupMenu";
import { CATEGORIES, popular, posts } from "@/utils/dummyData";
import { FcGoogle } from "react-icons/fc";
import { HeartFilled } from "@ant-design/icons";
import parse, { attributesToProps } from "html-react-parser";
import WebSocketClient from 'websocket';
import useAxios from "@/utils/useAxios";
import { AuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import Markdown from "markdown-to-jsx";
import { PopularPosts, PopularWriters, PostComments } from "@/components";
import { CalculateTimeAgo } from "@/common/CalculateTimeAgo";

const BlogPost = ({ params }) => {
  const router = useRouter();
  const { authTokens } = useContext(AuthContext);
  const userId = authTokens?.userId;
  let api = useAxios();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading, mutate } = useSWR(
    `http://localhost:5167/api/BlogPost/${params.id}`,
    fetcher
  );
  const options = {
    replace: (node) => {
      if (node.name === "img") {
        return (
          <p className="flex justify-center">
            <img src={node.attribs.src} alt={node.attribs.alt} />
          </p>
        );
      }

      // Giữ nguyên các phần khác của content
      return node;
    },
  };
  
  const [ like , setLike ] = useState(false)

  const handleLike = async (event) => {
    debugger;
    event.preventDefault();
    if (!authTokens) {
      router.push("/dashboard/login");
      return;
    }

    const { data } = await api.put(
      `http://localhost:5167/api/BlogPost/like?postId=${params.id}&userId=${userId}`
      
    );
   
    mutate();
    // if (data) {
    //   setLikes(likedByUser ? likes - 1 : likes + 1);
    //   setLikedByUser(!likedByUser);
    // }
  };
  // useEffect(() => {
  //   const ws = new WebSocket('ws://localhost:5167/ws');

  //   ws.onopen = () => {
  //     console.log('WebSocket connected');
  //   };

  //   ws.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     if (data.action === "like" && data.postId === postId) {
  //       setLike(true); // Cập nhật trạng thái thích bài viết trên giao diện người dùng
  //     }
  //   };

    
  //   return () => {
  //     ws.close();
  //   };
  // }, [like]); // Thêm postId vào dependencies để kích hoạt sự kiện effect khi postId thay đổi

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // const content = (
  //   <div>
  //     <span className="flex items-center gap-4 px-4 py-3 w-full cursor-pointer hover:bg-lightgray">
  //       <FontAwesomeIcon icon={faFacebook} /> <p>Chia sẻ lên Facebook</p>
  //     </span>
  //     <span className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-lightgray">
  //       <FontAwesomeIcon icon={faTwitter} /> <p>Chia sẻ lên Twitter</p>
  //     </span>
  //     <span className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-lightgray">
  //       <FontAwesomeIcon icon={faLink} /> <p>Sao chép liên kết</p>
  //     </span>
  //   </div>
  // );
  return (
    <div className="container mt-4">
      <div className="w-full  px-0 md:px-10 py-8 2xl:px-20">
        <div className="w-full flex flex-col-reverse md:flex-row gap-2 gap-y-5 items-center">
          <div className="w-full md:w-1/2 flex flex-col gap-8">
            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white">
              {data?.title}
            </h1>

            <div className="w-full flex items-center ">
              <span className="flex-1 text-rose-600 font-semibold">
                {data?.categoryName}
              </span>

              {/* <span className="flex flex-1 items-baseline text-2xl font-medium text-slate-700 dark:text-gray-400">
                {data?.views?.length}
                <span className="text-base text-rose-600">Views</span>
              </span> */}
            </div>

            <Link href={`profile/?id=${data?.userID}`} className="flex gap-3">
              <img
                src={data?.avatar}
                alt={data?.avatar}
                className="object-cover bg-center w-12 h-12  rounded-full"
              />
              <div className="">
                <p className="text-slate-800 dark:text-white font-medium">
                  {data?.username}
                </p>
                <span className="text-slate-600">
                  {CalculateTimeAgo(data?.createdAt)}
                </span>
              </div>
            </Link>
          </div>
          <img
            src={data?.image}
            alt={data?.title}
            className="w-full md:w-1/2 h-auto md:h-[360px] 2xl:h-[460px] rounded object-contain"
          />
        </div>

        <div className="w-full flex flex-col md:flex-row gapx-10 2xl:gap-x-28 mt-10">
          {/* LEFT */}
          <div className="w-full md:w-[80%] flex flex-col text-black dark:text-gray-500 ">
            {data?.content && (
              <Markdown
                options={{ wrapper: "article" }}
                className="leading-[3rem] text-base 2xl:text-[20px]"
              >
                {data?.content}
              </Markdown>
            )}

            {/* COMMENTS SECTION */}
            <div className="cursor-pointer" onClick={handleLike}>
              {(data?.likedBy.includes(userId) == true  || like == true) ? (
                <HeartFilled className="text-red-600" />
              ) : (
                <HeartFilled />
              )}
            </div>

            <div className="w-full">
              {<PostComments postSlug={params.id} />}
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full md:w-1/4 flex flex-col gap-y-12">
            {/* POPULAR POSTS */}
            {/* <PopularPosts posts={popular?.posts} /> */}

            {/* POPULAR WRITERS */}
            {/* <PopularWriters data={popular?.writers} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
