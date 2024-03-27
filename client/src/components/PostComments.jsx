"use client";
import React, { useContext, useState } from "react";
import { Toaster } from "sonner";
import { Button } from ".";
import useStore from "@/store";
import { COMMENTS } from "@/utils/dummyData";
import Link from "next/link";
import { AuthContext } from "../../context/AuthContext";
import useSWR from "swr";
import dayjs from "dayjs";
import useAxios from "@/utils/useAxios";
const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};
const PostComments = ({ postSlug }) => {
  let api = useAxios();

  const { data, mutate, isLoading } = useSWR(
    `http://localhost:5167/api/Comment/?postId=${postSlug}`,
    fetcher
  );
  const { user, authTokens } = useContext(AuthContext);
  const userId = authTokens?.userId;
  const [comment, setComment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const options = {
      method: "post",
      data: {
        postID: postSlug,
        userID: userId,
        commentText: comment,
      },

      url: "http://localhost:5167/api/Comment",
    };

    if (event.key === "Enter") {
      const { data } = await api(options);
    }
    const { data } = await api(options);
    if (data) {
      setComment("");
    }
    mutate();
  };

  return (
    <div className="w-full py-10">
      <p className="text-lg text-slate-700 dark:text-slate-500 mb-6">
        Bình luận
      </p>

      {authTokens ? (
        <form onSubmit={handleSubmit} className="flex flex-col mb-6">
          <textarea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            required={true}
            placeholder="Hãy viết gì đó ..."
            className="bg-transparent w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-600  focus:ring-blue-600 rounded"
          ></textarea>

          <div className="w-full flex justify-end mt-2">
            <Button
              type={"submit"}
              label="Gửi"
              styles="bg-blue-600 text-white py-2 px-5 rounded"
            />
          </div>
        </form>
      ) : (
        <Link href="/dashboard/register" className="flex flex-col py-10">
          <Button
            label="Sign in to comment"
            styles="flex items-center justify-center bg-white dark:bg-transparent text-black dark:text-gray-500 px-4 py-1.5 rounded-full border"
          />
        </Link>
      )}

     

      <div className="w-full h-full flex flex-col gap-10 2xl:gap-y-14 px-2">
        {isLoading ? (
          "loading"
        ) : data?.length === 0 ? (
          <span className="text-base text-slate-600">
            No Comment, be the first to comment
          </span>
        ) : (
          data?.map((item, index) => (
            <div key={index} className="w-full flex gap-4 items-start">
              <img
                src={item?.avatar}
                alt={item?.user.username}
                className="w-10 h-10 rounded-full"
              />
              <div className="w-full -mt-2">
                <div className="w-full flex items-center gap-2">
                  <p className="text-slate-700 dark:text-gray-400 font-medium">
                    {item?.user?.username}
                  </p>
                  <span className="text-slate-700 text-xs italic">
                    {dayjs(item.comment.createdAt).format("DD/MM/YYYY ")}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <span>{item.comment.commentText}</span>

                  {/* {user?.user?._id === el?.user?._id && (
                    <span
                      className='text-base text-red-600 cursor-pointer'
                      onClick={() => handleDeleteComment(el?._id)}
                    >
                      Delete
                    </span>
                  )} */}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Toaster richColors />
    </div>
  );
};

export default PostComments;
