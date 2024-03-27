"use client";
import Link from "next/link";
import styles from "./comments.module.css";
import Image from "next/image";
import useSWR from "swr";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useAxios from "@/utils/useAxios";
import dayjs from "dayjs";

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

const Comments = ({ postId }) => {
  const { authTokens } = useContext(AuthContext);
  const userId = authTokens?.userId;
  let api = useAxios();

  const { data, mutate, isLoading } = useSWR(
    `http://localhost:5167/api/Comment/?postId=${postId}`,
    fetcher
  );

  const [comment, setComment] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const options = {
      method: "post",
      data: {
        postID: postId,
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
    // <div className={styles.container}>
    //   {authTokens ? (
    //     <form onSubmit={handleSubmit}>
    //       <div className={styles.write}>
    //         <input
    //           placeholder="Viết bình luận..."
    //           className={styles.input}
    //           value={comment}
    //           onChange={(e) => setComment(e.target.value)}
    //         />
    //         <button className={styles.button} type="submit">
    //           Gửi
    //         </button>
    //       </div>
    //     </form>
    //   ) : (
    //     <Link href="/dashboard/login">Login to write a comment</Link>
    //   )}
      <div className={styles.comments}>
        {isLoading
          ? "loading"
          : data?.map((item) => (
              <div className={styles.comment} key={item.comment.commentID}>
                <div className={styles.user}>
                  <ListItemAvatar>
                    <Avatar alt={item.user.username} src={data.avatar} />
                  </ListItemAvatar>
                  <div className={styles.userInfo}>
                    <span className={styles.username}>
                      {item.user.username}
                    </span>
                    <span className={styles.date}>
                      {dayjs(item.comment.createdAt).format("DD/MM/YYYY ")}
                    </span>
                  </div>
                </div>
                <p className={styles.desc}>{item.comment.commentText}</p>
              </div>
            ))}
      </div>
    // </div>
  );
};

export default Comments;
