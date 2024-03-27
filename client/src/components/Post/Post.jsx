"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import Image from "next/image";
import useAxios from "@/utils/useAxios";
import { AuthContext } from "../../../context/AuthContext";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import dayjs from "dayjs";
import PopupMenu from "../PopupMenu/PopupMenu";
import {
  EmailShareButton,
  FacebookShareButton,
  GabShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";
import { CalculateTimeAgo } from "@/common/CalculateTimeAgo";
import { ConvertTime } from "@/common/ConvertTime";

const Post = (props) => {
  const theme = createTheme();
 

  const { post } = props;
  const { authTokens } = useContext(AuthContext);


  const content = (
    <div>
      <span className="flex items-center gap-4 px-4 py-3 w-full cursor-pointer hover:bg-lightgray">
        <FontAwesomeIcon icon={faFacebook} /> <p>Chia sẻ lên Facebook</p>
      </span>
      <span className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-lightgray">
        <FontAwesomeIcon icon={faTwitter} /> <p>Chia sẻ lên Twitter</p>
      </span>
      <span className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-lightgray">
        <FontAwesomeIcon icon={faLink} /> <p>Sao chép liên kết</p>
      </span>
    </div>
  );
  const date = new Date();
  return (
    <></>
    // <div
    //   key={post.postID}
    //   className="border-[1px] border-gray-200 p-4 rounded-lg cursor-pointer"
    // >
    //   <div className="flex items-center justify-between mb-2">
    //     <Link href={`profile/?id=${post.userID}`}>
    //       <div className="flex items-center  gap-2">
    //         <Avatar size="large" icon={<UserOutlined />} />
    //         <span>{post.username}</span>
    //       </div>
    //     </Link>

    //     <div className="flex items-center gap-2">
    //       {/* setting */}
    //       <FontAwesomeIcon className="cursor-pointer" icon={faBookmark} />
    //       <PopupMenu content={content}>
    //         <FontAwesomeIcon className="cursor-pointer" icon={faEllipsis} />
    //       </PopupMenu>
    //     </div>
    //   </div>
    //   <Link
    //     href={{
    //       pathname: `blog/${post.postID}`,
    //     }}
    //     className="flex items-center justify-between"
    //   >
    //     <div className="flex flex-col gap-2">
    //       {/* title */}
    //       <div>
    //         <h3 className="font-bold text-xl ">{post.title}</h3>

    //         {/* desc */}
    //         <p>
    //           <div
    //             style={{ lineHeight: 1.6 }}
    //             dangerouslySetInnerHTML={{
    //               __html: post.content.slice(0, 100) + " ...",
    //             }}
    //           />
    //         </p>
    //       </div>

    //       <div className="flex items-center gap-2">
    //         {/* subject */}

    //         <button className="bg-lightgray px-4 py-2 rounded-full">
    //           <p className="text-md font-medium">{post.categoryName}</p>
    //         </button>

    //         {/* date */}
    //         <p>{CalculateTimeAgo(post.createdAt)}</p>
    //       </div>
    //     </div>
    //     <div className="w-[200px] h-[100px]">
    //       <img src={post.image} alt="" className="w-full h-full object-cover" />
    //     </div>
    //   </Link>
    // </div>
  );
};

export default Post;
