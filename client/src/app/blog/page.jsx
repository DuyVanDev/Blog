"use client";
import React, { useContext } from "react";
import Post from "@/components/Post/Post";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../../context/AuthContext";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import {
  Grid,
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";

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
const Blog = () => {
  // const data = await getData();
  const theme = createTheme();

  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:5167/api/BlogPost",
    fetcher
  );

  // if (!user) {
  //   router.push("dashboard/login");
  // }

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.hero}>
        <Box>React Blog</Box>
      </Box>
      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Typography variant="h4" className={classes.blogTitle}>
          Articles
        </Typography>
        <Grid container spacing={3}>
          {!isLoading ? (
            data.map((post) => <Post post={post} key={post.blog.postID} />)
          ) : (
            <p>Empty</p>
          )}
        </Grid>
        <Box my={4} className={classes.paginationContainer}>
          <Pagination count={10} color="primary" />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Blog;
