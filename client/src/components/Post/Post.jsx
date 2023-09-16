"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import useAxios from "@/untils/useAxios";
import { AuthContext } from "../../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import makeStyles from "@mui/styles/makeStyles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80')`,
    height: "500px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
    // [theme.breakpoints.down("sm")]: {
    //   height: 300,
    //   fontSize: "3em",
    // },
  },
  blogsContainer: {
    // paddingTop: theme.spacing(3),
  },
  blogTitle: {
    fontWeight: 800,
    // paddingBottom: theme.spacing(3),
  },
  card: {
    maxWidth: "100%",
  },
  media: {
    height: 240,
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between",
  },
  author: {
    display: "flex",
  },
  paginationContainer: {
    color: "white",
    display: "flex",
    justifyContent: "center",
  },
}));

const Post = (props) => {
  const theme = createTheme();

  const classes = useStyles();
  const { post } = props;
  const [comment, setComment] = useState("");
  const { authTokens } = useContext(AuthContext);
  let api = useAxios();
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
    <Grid item xs={12} sm={6} md={4}>
      <Link href={`blog/${post.blog.postID}`}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={post.blog.image}
              title={post.blog.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              {post.blog.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <div dangerouslySetInnerHTML={{ __html: post.blog.content }} />
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.cardActions}>
            <Box className={classes.author}>
              <Avatar src="https://images.unsplash.com/photo-1584999734482-0361aecad844?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80" />
              <Box ml={2}>
                <Typography variant="subtitle2" component="p">
                  {post.user.username}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  component="p"
                >
                  {post.blog.createdAt}
                </Typography>
              </Box>
            </Box>
            <Box>
              <BookmarkBorderIcon />
            </Box>
          </CardActions>
        </Card>
      </Link>
    </Grid>
  );
};

export default Post;
