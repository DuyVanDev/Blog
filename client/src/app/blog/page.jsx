"use client";
import React, { useContext } from "react";
import styles from "./page.module.css";
import Post from "@/components/Post/Post";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../../context/AuthContext";

// const getData = async () => {
//   const res = await fetch(`http://localhost:9000/api/post`, {
//     cache: "no-cache",
//   });
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// };

const Blog = () => {
  // const data = await getData();
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:5167/api/BlogPost",
    fetcher
  );

  if (!user) {
    router.push("/login");
  }

  return (
    <div className={styles.mainContainer}>
      {!isLoading ? (
        data.map((post) => <Post post={post} key={post.postId} />)
      ) : (
        <div>Empty</div>
      )}
    </div>
  );
};

export default Blog;
