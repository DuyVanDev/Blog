"use client";
import Image from "next/image";
import React from "react";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import useSWR from "swr";
import Comments from "@/components/comments/Comments";

const BlogPost = ({ params }) => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `http://localhost:5167/api/BlogPost/${params.id}`,
    fetcher
  );
  console.log(data)
  return (
    <div>
      {!isLoading ? (
        <div className={styles.container}>
          <div className={styles.info}>
            <h1 className={styles.title}>{data.title}</h1>
            <div
              style={{ width: "100%", height: "500px", position: "relative" }}
            >
              <Image src={data.image} layout="fill" alt="Image" />
            </div>
            <p className={styles.content}>{data.content}</p>

            <div className={styles.comment}>
            <Comments postSlug={params.id}/>
          </div>
          </div>
          <div className={styles.right}>
            <h1 className={styles.title}>{data.title}</h1>
            <div className="lists">
              <div>
                <div
                  className="imgContainer"
                  style={{
                    width: "100%",
                    height: "200px",
                    position: "relative",
                  }}
                >
                  <Image src={data.image} layout="fill" alt="Image" />
                </div>
                <div className="title">{data.title}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
