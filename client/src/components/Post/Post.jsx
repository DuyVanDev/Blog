"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import Image from "next/image";
import useAxios from "@/untils/useAxios";
import { AuthContext } from "../../../context/AuthContext";
import {
  Box,
  Grid,
  Typography,
} from "@mui/material";
import {  createTheme } from "@mui/material/styles";
// import {MoreVertIcon} from '@mui/icons-material';
import dayjs from "dayjs";

const Post = (props) => {
  const theme = createTheme();

  const { post } = props;
  const { authTokens } = useContext(AuthContext);
  let api = useAxios();

  const ConvertTime = (time) => {
    const par = dayjs(time).format("DD/MM/YYYY ");
    return par;
  };
  // const data = {
  //   commentText: comment,
  //   postId: post.postID,
  //   userId: authTokens.userId,
  // };
  // console.log(authTokens);
  // const options = {
  //   method: "post",
  //   data: data,
  //   url: "https://localhost:7231/api/Comment",
  // };

  const handleComment = async (event) => {
    event.preventDefault();
    try {
      if (!authTokens) {
        router.push("dashboard/login");
        return;
      }
      const { data } = await api(options);
    } catch (err) {
      throw new Error(err);
    }
  };
  const date = new Date();
  return (
    <Link href={`blog/${post.postID}`} target="_blank">
    <Grid container spacing={2} mb={6}  >
      <Grid item xs={12} md={4} >
        <Box
          sx={{
            position: "relative",
            height: "150px",
            width: "100%",
            minWidth: "250px",
          }}
        >
          <Image
            src={post.image}
            alt=""
            fill
            priority
            style={{ objectFit: "cover", backgroundPosition: "center"}}
          />
        </Box>
      </Grid>

      <Grid item xs={12} md={8} >
        <Typography variant="subtitle" component="h3" mb={1} >
          {post.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            marginBottom: "8px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography xs={12}
            color="textSecondary"
            fontWeight={"bold"}
            fontSize={11}
            variant="subtitle"
            component="p"
          >
            @{post.username}
          </Typography>
          <div>
            <Typography
              xs={12}
              color="textSecondary"
              fontSize={9}
              fontWeight={600}
              variant="subtitle"
              component="p"
            >
              {ConvertTime(post.createdAt)}
            </Typography>
          </div>
        </Box>
        <Typography
          color="textPrimary"
          fontSize={13}
          variant="string"
          component="p"
        >
          <div style={{ lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: post.content.slice(0,300)+" ..." }} />
        </Typography>
      </Grid>
      
    </Grid>
    </Link>
    
  );
};

export default Post;
