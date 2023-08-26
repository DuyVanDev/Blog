"use client"
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Button from "@/components/Button/Button";
import useSWR from "swr";
const About = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `http://localhost:5167/api/BlogPost`,
    fetcher
  );
  console.log(data)
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src="http://res.cloudinary.com/dqpjoki72/image/upload/v1689490200/products/vbsbbmojkaxslsjogz8q.png"
          fill={true}
          alt=""
          className={styles.img}
        />
        <div className={styles.imgText}>
        <h1 style={styles.imgTitle}>Digital Storytellers</h1>
        <h2 style={styles.imgDesc}>
          Lorem ipsum dolor sit amet consectetur.
        </h2>
      </div>
      </div>

      
      <div className={styles.textContainer}>
        <div className={styles.item}>
          <h1 className={styles.title}>Who Are We?</h1>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            itaque eveniet expedita aspernatur consequuntur veniam doloribus ab
            voluptates officiis. Autem impedit voluptate nihil, facere minus,
            <br />
            <br />
            amet consectetur rem quia eligendi animi accusantium quasi? Harum
            placeat dicta nostrum vel, in, ullam laboriosam saepe recusandae aut
            fugiat vitae ea dignissimos sequi incidunt.
          </p>
        </div>
        <div className={styles.item}>
          <h1 className={styles.title}>What We Do ?</h1>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            itaque eveniet expedita aspernatur consequuntur veniam doloribus ab
            voluptates officiis. Autem impedit voluptate nihil, facere minus,
            <br />
            <br />
            amet consectetur rem quia eligendi animi accusantium quasi? Harum
            placeat dicta nostrum vel, in, ullam laboriosam saepe recusandae aut
            fugiat vitae ea dignissimos sequi incidunt.
          </p>
          <Button url="/contact" text="Contact" />
        </div>
      </div>
    </div>
  );
};

export default About;
