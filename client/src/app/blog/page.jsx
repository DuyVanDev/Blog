"use client";
import React, { useContext } from "react";
import Post from "@/components/Post/Post";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { styled } from "@mui/material/styles";



const Root = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.up("md")]: {
    padding: "0 200px",
    marginTop : "30px"
    
  },
  [theme.breakpoints.up("lg")]: {
    padding: "0 200px",
    marginTop : "30px"
  },
}));

const Blog = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:5167/api/BlogPost",
    fetcher
  );
  
  return (
    <Root>
      <Container maxWidth="lg">
        <Box maxWidth="lg" minHeight={"80vh"}>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent : "center", alignItems : "center", width : "100%" }}>
              <CircularProgress />
            </Box>
          ) : (
            data.map((post) => <Post post={post} key={post.postID} />)
          )}
        </Box>
        {/* <Box my={4}>
          <Pagination count={10} color="primary" />
        </Box> */}
      </Container>
    </Root>

    // <ThemeProvider theme={theme}>
    //   {/* <Box className={classes.hero}>
    //     <Box>Welcome to Website</Box>
    //   </Box> */}

    // </ThemeProvider>
  );
};

export default Blog;
