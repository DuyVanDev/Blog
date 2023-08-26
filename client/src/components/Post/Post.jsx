"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import useAxios from "@/untils/useAxios";
import { AuthContext } from "../../../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-regular-svg-icons'

const Post = (props) => {
  const { post } = props;
  const [comment, setComment] = useState("");
  const { authTokens } = useContext(AuthContext);
  let api = useAxios();
  const data = {
    commentText: comment,
    postId: post.postID,
    userId: authTokens.userId,
  };
  console.log(post);
  const options = {
    method: "post",
    data: data,
    url: "https://localhost:7231/api/Comment",
  };
  console.log(post);
  const handleComment = async (event) => {
    event.preventDefault();
    try {
      if (!authTokens) {
        router.push("dashboard/login");
        return;
      }
      const { data } = await api(options);
      console.log(data);
    } catch (err) {
      throw new Error(err);
    }
  };
  const date = new Date();
  return (
    <div className="blog">
      {/* {userParams && user?.postId === userParams ? (
        // <button onClick={() => handleClick(post._id)}>Edit</button>
        <Link href={"/update/asdasfjb"}>Edit</Link>
      ) : null} */}
      <div className={styles.info}>
        <Link href={`profile/?id=${post.userID}`}>
          <Image
            src={post.image}
            alt=""
            width={50}
            height={50}
            className={styles.avatar}
          />
        </Link>
        <div>{post.createdAt}</div>
      </div>

      <Link href={`blog/${post.postID}`} className={styles.container}>
        <div
          className={styles.imgContainer}
          style={{ width: "800px", height: "350px", position: "relative" }}
        >
          <Image
            src={post.image}
            alt=""
            layout="fill"
            className={styles.imgPost}
          />
          <div className={styles.detail}>
            <div className={styles.content}>
              <h1 className={styles.title}>{post.title}</h1>
              <p className={styles.desc}>{post.content}</p>
            </div>
            <div className={styles.commentIcon}>
              <p className="total">{post.commentCount}</p>
              <FontAwesomeIcon icon={faComment} size={'20em'} />
            </div>
          </div>
        </div>
      </Link>
      {/* <div className={styles.commentBox}>
        <input
          type="textarea"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write something..."
        />
        <button onClick={handleComment}>Gui</button>
      </div> */}
    </div>
  );
};

export default Post;
