"use client";
import React, { useContext, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAxios from "@/untils/useAxios";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import styles from "./page.module.css";
import Editor from "@/Editor";

const Dashboard = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [cat, setCat] = useState(null);
  let { authTokens, logoutUser, user } = useContext(AuthContext);

  let api = useAxios();

  const handleChange = (e) => {
    setCat(e.target.value);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  const submitForm = async (e) => {
    e.preventDefault();
    // const data = {
    //   title,
    //   content,
    //   userID: user.data.userId,
    //   categoryID: parseInt(cat),
    // };
    // console.log(data)
    try {
      if (!authTokens) {
        router.push("dashboard/login");
        return;
      }

      var form = new FormData();
      form.append("image", image);
      form.append("userId", authTokens.userId);
      form.append("title", title);
      form.append("content", content);
      form.append("categoryId", cat);

      const options = {
        method: "post",
        data: form,

        url:  "http://localhost:5167/api/BlogPost",
      };

      const { data } = await api(options);


      // const { data } = await api.post("https://localhost:7231/api/BlogPost", {
      //   // title,
      //   // content,
      //   image,
      //   userID : authTokens.userId,
      //   // categoryID : cat
      // }
      // );
      // console.log(data);
      // if (data.success === true) {
      //   setTitle("");
      //   setContent("");
      //   setImage("");
      // }
    } catch (error) {
      console.log(error);
    }
    // console.log(title, content, image, cat, user.data.userId)
  };

  return (
    <div>
      <form action="" className={styles.formPost}>
        <div className={styles.textInput}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Try typing something in here!"
          />
          <label for="input1">Name</label>
        </div>
        {/* <input
          type="text"
          placeholder="title"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        /> */}
        <div className={styles.editorContainer}>
        <Editor value={content} onChange={setContent} />
        </div>

        <input
          onChange={handleImage}
          type="file"
          id="formupload"
          name="image"
          className="form-control"
        />
        <Image
          className="img-fluid"
          src={image}
          alt=""
          width={300}
          height={300}
        />
        <label>Theme </label>
        <select onChange={handleChange}>
          <option value="N/A">Selected</option>
          <option value="64e98e157529e41e695baba3">Art</option>
          <option value="2">Technology</option>
        </select>

        <button type="button" onClick={submitForm}>
          Save
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
