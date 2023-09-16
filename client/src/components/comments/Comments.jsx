"use client";

import Link from "next/link";
import styles from "./comments.module.css";
import Image from "next/image";
import useSWR from "swr";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useAxios from "@/untils/useAxios";

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

const Comments = ({ postSlug }) => {
  const { authTokens } = useContext(AuthContext);
  const userId = authTokens.userId;
  let api = useAxios();

  const { data, mutate, isLoading } = useSWR(
    `http://localhost:5167/api/Comment/?postId=${postSlug}`,
    fetcher
  );
  console.log(data);

  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    const options = {
      method: "post",
      data: {
        postID: postSlug,
        userID: userId,
        commentText: desc,
      },

      url: "http://localhost:5167/api/Comment",
    };

    const { data } = await api(options);

    console.log(data);
    mutate();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {authTokens ? (
        <div className={styles.write}>
          <textarea
            placeholder="write a comment..."
            className={styles.input}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className={styles.button} onClick={handleSubmit}>
            Send
          </button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      <div className={styles.comments}>
        {isLoading
          ? "loading"
          : data?.map((item) => (
              <div className={styles.comment} key={item.comment.commentID}>
                <div className={styles.user}>
                  {item?.user?.avatar && (
                    <Image
                      src={item.user.avatar}
                      alt=""
                      width={50}
                      height={50}
                      className={styles.image}
                    />
                  )}
                  <div className={styles.userInfo}>
                    <span className={styles.username}>{item.user.username}</span>
                    <span className={styles.date}>{item.comment.createdAt}</span>
                  </div>
                </div>
                <p className={styles.desc}>{item.comment.commentText}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Comments;
