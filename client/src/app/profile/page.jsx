"use client";
import React, { useContext, useState } from "react";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import MyPost from "@/components/MyPost/MyPost";
import Link from "next/link";
import { Pagination } from "antd";
import { Card, PopularPosts, PopularWriters } from "@/components";
import { popular } from "@/utils/dummyData";

export const metadata = {
  title: "T-BLOG",
  description: "T-BLOG tin tức cực shock",
};
const Profile = () => {
  const searchParams = useSearchParams();
  const userParams = searchParams.get("id");

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `http://localhost:5167/api/BlogPost/post/?userId=${userParams}`,
    fetcher
  );


  return (
    <div className='px-0 2xl:px-20 '>
      <div className='w-full md:h-60 flex flex-col gap-5 items-center md:flex-row bg-black dark:bg-gradient-to-r from-[#020b19] via-[#071b3e] to-[#020b19]  mt-5 mb-10 rounded-md p-5 md:px-20'>
        {/* <img
          src={writer?.image || NoProfile}
          alt='Writer'
          className='w-48 h-48 rounded-full border-4 border-slate-400 object-cover'
        /> */}
        <div className='w-full h-full flex flex-col gap-y-5 md:gap-y-8  items-center justify-center'>
          {/* <h2 className='text-white text-4xl 2xl:text-5xl font-bold'>
            {writer?.name}
          </h2>

          <div className='flex gap-10'>
            <div className='flex flex-col items-center'>
              <p className='text-gray-300 text-2xl font-semibold'>
                {formatNumber(writer?.followers?.length ?? 0)}
              </p>
              <span className='text-gray-500'>Followers</span>
            </div>

            <div className='flex flex-col items-center'>
              <p className='text-gray-300 text-2xl font-semibold'>
                {formatNumber(posts?.length ?? 0)}
              </p>
              <span className='text-gray-500'>Posts</span>
            </div>
          </div> */}

          {/* {user?.token && (
            <div>
              {!followerIds?.includes(user?.user?._id) ? (
                <Button
                  label='Follow'
                  onClick={() => {}}
                  styles='text-slate-800 text-semibold md:-mt-4 px-6 py-1 rounded-full bg-white'
                />
              ) : (
                <div className='flex items-center justify-center gap-2 text-white text-semibold md:-mt-4 px-6 py-1 rounded-full border'>
                  <span>Following</span>
                  <FaUserCheck />
                </div>
              )}
            </div>
          )} */}
        </div>
      </div>

      <div className='w-full flex flex-col md:flex-row gap-10 2xl:gap-20'>
        {/* LEFT */}
        <div className='w-full md:w-2/3 flex flex-col gap-y-28 md:gap-y-14'>
          {data?.length === 0 ? (
            <div className='w-full h-full py-8 flex  justify-center'>
              <span className='text-lg text-slate-500'>No Post Available</span>
            </div>
          ) : (
            <>
              {data?.map((post, index) => (
                <MyPost key={post.postID} post={post} />
              ))}

              <div className='w-full flex items-cemter justify-center'>
                <Pagination
                  // totalPages={numOfPages}
                  // onPageChange={handlePageChange}
                />
              </div>
            </>
          )}
        </div>

        
      </div>
    </div>
    // <Root>
    //   <Container maxWidth="lg">
    //     <Link href={"/write"}><Button variant="outlined">Viết bài</Button></Link>
    //     <Box maxWidth="lg" minHeight={"80vh"}>
    //       {isLoading ? (
    //         <Box
    //           sx={{
    //             display: "flex",
    //             justifyContent: "center",
    //             alignItems: "center",
    //             width: "100%",
    //           }}
    //         >
    //           <CircularProgress />
    //         </Box>
    //       ) : (
    //         data?.map((post) => (
    //           <MyPost post={post} userParams={userParams} key={post.postID} />
    //         ))
    //       )}
    //     </Box>
    //   </Container>
    // </Root>
  );
};

export default Profile;
